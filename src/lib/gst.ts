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
  'Dadra and Nagar Haveli and Daman and Diu': '26',
  'Andaman and Nicobar Islands': '35',
  'Lakshadweep': '31'
};

export const GST_STATE_CODE_MAP: { [code: string]: string } = Object.entries(INDIAN_STATES).reduce(
  (acc, [state, code]) => {
    acc[code] = state;
    return acc;
  },
  {} as { [code: string]: string }
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
  },
  MANAGEMENT: {
    code: '998311',
    description: 'Management consulting and brand marketing services'
  }
};

/**
 * Validates 15-character Indian GSTIN
 * Format: 2 digits (state) + 10 chars PAN + 1 entity num + 'Z' + 1 check char
 */
export function validateGSTIN(gstin: string): {
  isValid: boolean;
  stateCode?: string;
  stateName?: string;
  pan?: string;
  message: string;
} {
  if (!gstin) {
    return { isValid: false, message: 'GSTIN is empty' };
  }

  const cleanGstin = gstin.trim().toUpperCase();

  if (cleanGstin.length !== 15) {
    return {
      isValid: false,
      message: `GSTIN must be exactly 15 characters (currently ${cleanGstin.length})`
    };
  }

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstinRegex.test(cleanGstin)) {
    return {
      isValid: false,
      message: 'Invalid GSTIN format. Expected format: 29ABCDE1234F1Z5'
    };
  }

  const stateCode = cleanGstin.substring(0, 2);
  const stateName = GST_STATE_CODE_MAP[stateCode] || 'Unknown State';
  const pan = cleanGstin.substring(2, 12);

  return {
    isValid: true,
    stateCode,
    stateName,
    pan,
    message: `Valid GSTIN (${stateName})`
  };
}

/**
 * Calculates Indian GST components based on intra-state vs inter-state
 */
export function calculateGST(
  taxableAmount: number,
  creatorState: string,
  buyerState: string,
  gstRate: number = 18
) {
  const normCreator = (creatorState || 'Karnataka').trim().toLowerCase();
  const normBuyer = (buyerState || 'Karnataka').trim().toLowerCase();
  const isInterState = normCreator !== normBuyer;
  
  if (isInterState) {
    const igst = (taxableAmount * gstRate) / 100;
    return {
      isInterState: true,
      cgstRate: 0,
      sgstRate: 0,
      igstRate: gstRate,
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
      cgstRate: halfRate,
      sgstRate: halfRate,
      igstRate: 0,
      cgst: Number(cgst.toFixed(2)),
      sgst: Number(sgst.toFixed(2)),
      igst: 0,
      totalGst: Number((cgst + sgst).toFixed(2)),
      totalAmount: Number((taxableAmount + cgst + sgst).toFixed(2))
    };
  }
}

/**
 * Converts numbers into Indian Currency Words (Lakhs & Crores format)
 */
export function numberToIndianWords(amount: number): string {
  if (amount === 0) return 'Rupees Zero Only';

  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertTwoDigits(n: number): string {
    if (n < 20) return ones[n];
    return `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim();
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred > 0) res += `${ones[hundred]} Hundred `;
    if (rest > 0) res += convertTwoDigits(rest);
    return res.trim();
  }

  const integerPart = Math.floor(amount);
  const decimalPart = Math.round((amount - integerPart) * 100);

  let num = integerPart;
  let words = '';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const remainder = num;

  if (crore > 0) words += `${convertTwoDigits(crore)} Crore `;
  if (lakh > 0) words += `${convertTwoDigits(lakh)} Lakh `;
  if (thousand > 0) words += `${convertTwoDigits(thousand)} Thousand `;
  if (remainder > 0) words += `${convertThreeDigits(remainder)} `;

  words = words.trim();
  let result = words ? `INR ${words} Rupees` : 'INR Zero Rupees';

  if (decimalPart > 0) {
    result += ` and ${convertTwoDigits(decimalPart)} Paise`;
  }

  return `${result} Only`;
}

export function buildInvoiceData(
  order: Order,
  creator: {
    name: string;
    businessName?: string;
    state: string;
    gstNumber?: string;
    address?: string;
  }
): GSTInvoiceData {
  const isInterState = (creator.state || 'Karnataka').toLowerCase() !== (order.buyerState || 'Delhi').toLowerCase();
  const stateCode = INDIAN_STATES[creator.state] || '29';
  const buyerStateCode = INDIAN_STATES[order.buyerState] || '07';

  const invoiceStatus = (order.paymentStatus || (order.status === 'completed' ? 'Paid' : 'Pending')) as 'Paid' | 'Pending' | 'Overdue';

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
      pan: (creator.gstNumber && creator.gstNumber.length >= 12) ? creator.gstNumber.substring(2, 12) : 'ABCDE1234F'
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
    amountInWords: numberToIndianWords(order.totalAmount),
    dueDate: order.dueDate || new Date(new Date(order.date).getTime() + 14 * 86400000).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    notes: order.notes || 'Thank you for your business. For electronic delivery support, reach out via WhatsApp.',
    terms: 'Supply of online services and digital content. Subject to jurisdiction of Bengaluru, Karnataka.',
    paymentDetails: {
      mode: order.paymentMethod || 'UPI',
      transactionId: order.upiRefId || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      paidDate: new Date(order.date).toLocaleString('en-IN'),
      status: invoiceStatus
    }
  };
}
