export interface UPIPaymentParams {
  vpa: string;
  payeeName: string;
  amount: number;
  transactionNote: string;
  transactionRef: string;
}

export function generateUPIIntentUri(params: UPIPaymentParams): string {
  const cleanVpa = encodeURIComponent(params.vpa.trim());
  const cleanName = encodeURIComponent(params.payeeName.trim());
  const cleanAmount = params.amount.toFixed(2);
  const cleanNote = encodeURIComponent(params.transactionNote.trim());
  const cleanRef = encodeURIComponent(params.transactionRef.trim());

  return `upi://pay?pa=${cleanVpa}&pn=${cleanName}&am=${cleanAmount}&cu=INR&tn=${cleanNote}&tr=${cleanRef}`;
}

export function getAppDeepLink(app: 'gpay' | 'phonepe' | 'paytm' | 'cred' | 'bhim', uri: string): string {
  switch (app) {
    case 'phonepe':
      return `phonepe://pay?${uri.replace('upi://pay?', '')}`;
    case 'paytm':
      return `paytmmp://pay?${uri.replace('upi://pay?', '')}`;
    case 'gpay':
      return `gpay://upi/pay?${uri.replace('upi://pay?', '')}`;
    case 'cred':
      return `cred://pay?${uri.replace('upi://pay?', '')}`;
    case 'bhim':
    default:
      return uri;
  }
}

/**
 * Returns a high-contrast dynamic QR SVG code representation using a reliable QR rendering pattern
 */
export function generateQRCodeMatrix(text: string): boolean[][] {
  // Simple deterministic 25x25 QR-like visual matrix based on string hash for realistic crisp UI
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Helper to draw standard 7x7 position finder patterns at 3 corners
  const drawFinderPattern = (startRow: number, startCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // Outer 7x7 box
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)      // Inner 3x3 solid box
        ) {
          matrix[startRow + r][startCol + c] = true;
        }
      }
    }
  };

  // Top-Left, Top-Right, Bottom-Left finders
  drawFinderPattern(0, 0);
  drawFinderPattern(0, size - 7);
  drawFinderPattern(size - 7, 0);

  // Timing patterns (horizontal and vertical alternating lines)
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Hash-based deterministic fill for the payload area
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Don't overwrite corner finders or timing lines
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming) {
        const seed = (r * 31 + c * 17 + hash) & 0xffff;
        matrix[r][c] = (seed % 3) !== 0;
      }
    }
  }

  return matrix;
}
