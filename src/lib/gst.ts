import { GSTInvoiceData, Order } from '@/types';

export const INDIAN_STATES: { [key: string]: string } = {
  'Andhra Pradesh': '37',
  'Arunachal Pradesh': '12',
  'Assam': '18',
  'Bihar': '10',
  'Chhattisgarh': '22',
  'Goa': '30',
  'Gujarat': '24',
  'Haryana': '06',
  'Himachal Pradesh': '02',
  'Jharkhand': '20',
  'Karnataka': '29',
  'Kerala': '32',
  'Madhya Pradesh': '23',
  'Maharashtra': '27',
  'Manipur': '14',
  'Meghalaya': '17',
  'Mizoram': '15',
  'Nagaland': '13',
  'Odisha': '21',
  'Punjab': '03',
  'Rajasthan': '08',
  'Sikkim': '11',
  'Tamil Nadu': '33',
  'Telangana': '36',
  'Tripura': '16',
  'Uttar Pradesh': '09',
  'Uttarakhand': '05',
  'West Bengal': '19',
  'Delhi': '07',
  'Chandigarh': '04',
  'Jammu and Kashmir': '01',
  'Ladakh': '38',
};

export const SAC_CODES = {
  DIGITAL_PRODUCT: {
    code: '998431',
    description: 'Online text and digital content / E-books / Templates'
  },
  COURSE: {
    code: '999293',
    description: 'Commercial training, coaching & online interactive education'
  },
  BOOKING: {
    code: '998313',
    description: 'Consulting, 1:1 professional mentoring and advisory services'
  },
  MEMBERSHIP: {
    code: '998439',
    description: 'Online membership and subscription content'
  },
  TIP: {
    code: '999799',
    description: 'Voluntary creator contribution / appreciation tip'
  }
};

export function calculateGST(
  taxableAmount: number,
  creatorState: string,
  buyerState: string,
  gstRate: number = 18
) {
  const isInterState = creatorState.trim().toLowerCase() !== buyerState.trim().toLowerCase();
  
  if (isInterState) {
    const igst = (taxableAmount * gstRate) / 100;
    return {
      isInterState: true,
      cgst: 0,
      sgst: 0,
      igst: Number(igst.toFixed(2)),
      totalGst: Number(igst.toFixed(2)),
      totalAmount: Number((taxableAmount + igst).toFixed(2))
    };
  } else {
    const halfRate = gstRate / 2;
    const cgst = (taxableAmount * halfRate) / 100;
    const sgst = (taxableAmount * halfRate) / 100;
    return {
      isInterState: false,
      cgst: Number(cgst.toFixed(2)),
      sgst: Number(sgst.toFixed(2)),
      igst: 0,
      totalGst: Number((cgst + sgst).toFixed(2)),
      totalAmount: Number((taxableAmount + cgst + sgst).toFixed(2))
    };
  }
}

export function buildInvoiceData(order: Order, creator: {
  name: string;
  businessName?: string;
  state: string;
  gstNumber?: string;
  address?: string;
}): GSTInvoiceData {
  const isInterState = (creator.state || 'Karnataka').toLowerCase() !== (order.buyerState || 'Delhi').toLowerCase();
  const stateCode = INDIAN_STATES[creator.state] || '29';
  const buyerStateCode = INDIAN_STATES[order.buyerState] || '07';

  return {
    invoiceNumber: order.invoiceNumber || `INV-${new Date().getFullYear()}-${order.orderNumber.slice(-5)}`,
    invoiceDate: new Date(order.date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    placeOfSupply: `${order.buyerState} (${buyerStateCode})`,
    sacCode: order.sacCode || '998431',
    creator: {
      name: creator.name,
      businessName: creator.businessName || `${creator.name} Creator Services`,
      address: creator.address || `Creator Hub, Bengaluru Tech Corridor, ${creator.state} - 560103`,
      state: creator.state || 'Karnataka',
      stateCode: stateCode,
      gstin: creator.gstNumber || '29ABCDE1234F1Z5',
      pan: 'ABCDE1234F'
    },
    buyer: {
      name: order.buyerName,
      email: order.buyerEmail,
      phone: order.buyerPhone,
      state: order.buyerState,
      stateCode: buyerStateCode,
      gstin: order.buyerGst
    },
    items: [
      {
        description: order.itemTitle,
        sacCode: order.sacCode || '998431',
        quantity: 1,
        unitPrice: order.amount,
        taxableValue: order.amount
      }
    ],
    isInterState,
    taxableTotal: order.amount,
    cgstRate: isInterState ? 0 : order.gstRate / 2,
    cgstAmount: order.cgst,
    sgstRate: isInterState ? 0 : order.gstRate / 2,
    sgstAmount: order.sgst,
    igstRate: isInterState ? order.gstRate : 0,
    igstAmount: order.igst,
    totalInvoiceValue: order.totalAmount,
    paymentDetails: {
      mode: order.paymentMethod,
      transactionId: order.upiRefId || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      paidDate: new Date(order.date).toLocaleString('en-IN')
    }
  };
}
