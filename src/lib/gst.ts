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
  'Puducherry': '34',
  'Goa, Daman and Diu': '25'
};

export const STATE_CODE_TO_NAME: { [key: string]: string } = Object.entries(INDIAN_STATES).reduce(
  (acc, [name, code]) => ({ ...acc, [code]: name }),
  {}
);

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

/**
 * Validates Indian Goods & Services Tax Identification Number (GSTIN)
 * Format: 2 digits (State Code) + 10 chars (PAN) + 1 digit (Entity) + 'Z' + 1 char (Checksum)
 */
export function validateGSTIN(gstin: string): { isValid: boolean; message: string; stateName?: string; stateCode?: string } {
  if (!gstin || !gstin.trim()) {
    return { isValid: false, message: 'GSTIN is empty' };
  }

  const cleaned = gstin.trim().toUpperCase();
  
  if (cleaned.length !== 15) {
    return { 
      isValid: false, 
      message: `GSTIN must be exactly 15 characters (currently ${cleaned.length})` 
    };
  }

  // Regex for 15-character Indian GSTIN
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstinRegex.test(cleaned)) {
    return { 
      isValid: false, 
      message: 'Invalid GSTIN structure (Expected: 2-digit state + 10-char PAN + 1-digit entity + Z + Checksum)' 
    };
  }

  const stateCode = cleaned.substring(0, 2);
  const stateName = STATE_CODE_TO_NAME[stateCode];

  if (!stateName) {
    return { 
      isValid: false, 
      message: `Invalid state code '${stateCode}' in GSTIN` 
    };
  }

  return {
    isValid: true,
    message: `Valid Indian GSTIN (${stateName})`,
    stateName,
    stateCode
  };
}

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

  const status = order.paymentStatus || (order.status === 'completed' ? 'Paid' : 'Pending');

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
      paidDate: status === 'Paid' ? new Date(order.date).toLocaleString('en-IN') : 'Pending Payment'
    },
    status,
    dueDate: order.dueDate || new Date(Date.now() + 86400000 * 7).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    notes: order.notes || 'Goods/Services once sold are subject to terms of service. Computer generated GST tax invoice.',
    reverseCharge: 'No'
  };
}
