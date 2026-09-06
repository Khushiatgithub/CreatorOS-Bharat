import { NextRequest, NextResponse } from 'next/server';
import { ProductModel } from '@/lib/db-models';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await ProductModel.getById(params.id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    if (body.price !== undefined) {
      await ProductModel.updatePrice(params.id, Number(body.price));
    }
    const updated = await ProductModel.getById(params.id);
    return NextResponse.json({ success: true, product: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await ProductModel.delete(params.id);
    return NextResponse.json({ success, message: 'Product deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


