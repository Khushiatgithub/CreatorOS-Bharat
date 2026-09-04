import { NextRequest, NextResponse } from 'next/server';
import { InvoiceModel } from '@/lib/db-models';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || undefined;
    const invoiceNumber = searchParams.get('number');

    if (invoiceNumber) {
      const invoice = await InvoiceModel.getByNumber(invoiceNumber);
      if (!invoice) {
        return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, invoice });
    }

    const invoices = await InvoiceModel.getAll(userId);
    return NextResponse.json({ success: true, count: invoices.length, invoices });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
