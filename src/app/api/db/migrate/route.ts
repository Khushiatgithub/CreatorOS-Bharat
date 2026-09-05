import { NextResponse } from 'next/server';
import { runDatabaseMigrations } from '@/lib/db-migrate';

export async function GET() {
  const result = await runDatabaseMigrations();
  return NextResponse.json(result);
}

export async function POST() {
  const result = await runDatabaseMigrations();
  return NextResponse.json(result);
}
