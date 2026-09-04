import { Pool, QueryResult, QueryResultRow } from 'pg';

let pool: Pool | null = null;

export function getDatabasePool(): Pool | null {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    return null;
  }

  try {
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.warn('PostgreSQL client error:', err);
    });

    return pool;
  } catch (err) {
    console.warn('Failed to initialize PostgreSQL pool:', err);
    return null;
  }
}

/**
 * Execute parameterized query on PostgreSQL
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T> | null> {
  const db = getDatabasePool();
  if (!db) {
    return null;
  }

  const start = Date.now();
  try {
    const res = await db.query<T>(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text: text.substring(0, 60), duration, rows: res.rowCount });
    }
    return res;
  } catch (err) {
    console.error('PostgreSQL query error:', { text, error: err });
    return null;
  }
}
