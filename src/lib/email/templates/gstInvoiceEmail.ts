import { renderBaseEmailLayout } from './baseLayout';

export interface GSTInvoiceEmailData {
  buyerName: string;
  buyerEmail: string;
  buyerGst?: string;
  buyerState?: string;
  creatorName?: string;
  creatorGst?: string;
  creatorState?: string;
  invoiceNumber: string;
  invoiceDate?: string;
  itemTitle: string;
  sacCode?: string;
  taxableAmount: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  totalAmount: number;
  isInterState?: boolean;
  invoiceUrl?: string;
}

export function buildGSTInvoiceEmail(data: GSTInvoiceEmailData): { subject: string; html: string; text: string } {
  const {
    buyerName,
    buyerGst,
    buyerState = 'Maharashtra (27)',
    creatorName = 'Aarav Sharma (CreatorOS)',
    creatorGst = '29ABCDE1234F1Z5',
    creatorState = 'Karnataka (29)',
    invoiceNumber,
    invoiceDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    itemTitle,
    sacCode = '998439 (Online Information and Database Access Services)',
    taxableAmount,
    cgst = 0,
    sgst = 0,
    igst = 0,
    totalAmount,
    isInterState = false,
  } = data;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creatoros.in';
  const firstName = buyerName.split(' ')[0] || 'Customer';
  const invoiceUrl = data.invoiceUrl || `${appUrl}/dashboard/gst-invoices?number=${invoiceNumber}`;

  const subject = `🧾 Tax Invoice ${invoiceNumber}: ${itemTitle} | CreatorOS Bharat`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px; color: #F1F5F9;">
      Hello <strong>${firstName}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; color: #94A3B8; line-height: 1.6;">
      Please find below your official <strong>GST Tax Invoice</strong> for your recent transaction on CreatorOS Bharat in accordance with the Central Goods and Services Tax Act, 2017.
    </p>

    <!-- GST Tax Invoice Box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1E293B; border: 1px solid #334155; border-radius: 12px; margin: 20px 0; overflow: hidden;">
      <!-- Invoice Header -->
      <tr>
        <td colspan="2" style="background-color: #0F172A; padding: 14px 18px; border-bottom: 1px solid #334155;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left">
                <span style="font-size: 14px; font-weight: 800; color: #FFFFFF;">TAX INVOICE</span><br/>
                <span style="font-size: 12px; color: #F59E0B; font-weight: 700;">${invoiceNumber}</span>
              </td>
              <td align="right">
                <span style="font-size: 11px; color: #94A3B8;">Date of Issue:</span><br/>
                <span style="font-size: 12px; color: #FFFFFF; font-weight: 600;">${invoiceDate}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- B2B Entity Details -->
      <tr>
        <td style="padding: 14px 18px; vertical-align: top; width: 50%; border-bottom: 1px solid #334155; border-right: 1px solid #334155;">
          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Supplier (Creator)</span><br/>
          <strong style="color: #FFFFFF; font-size: 13px;">${creatorName}</strong><br/>
          <span style="font-size: 11px; color: #94A3B8;">GSTIN: ${creatorGst}</span><br/>
          <span style="font-size: 11px; color: #94A3B8;">State: ${creatorState}</span>
        </td>
        <td style="padding: 14px 18px; vertical-align: top; width: 50%; border-bottom: 1px solid #334155;">
          <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase;">Recipient (Buyer)</span><br/>
          <strong style="color: #FFFFFF; font-size: 13px;">${buyerName}</strong><br/>
          <span style="font-size: 11px; color: #94A3B8;">GSTIN: ${buyerGst || 'Unregistered / B2C'}</span><br/>
          <span style="font-size: 11px; color: #94A3B8;">State of Supply: ${buyerState}</span>
        </td>
      </tr>

      <!-- Line Item Details -->
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">Service / Description</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 12px; font-weight: 600; border-bottom: 1px solid #334155;">${itemTitle}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">SAC Code</td>
        <td style="padding: 12px 18px; color: #CBD5E1; font-size: 12px; font-family: monospace; border-bottom: 1px solid #334155;">${sacCode}</td>
      </tr>
      <tr>
        <td style="padding: 12px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">Taxable Value</td>
        <td style="padding: 12px 18px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #334155;">₹${taxableAmount.toLocaleString('en-IN')}</td>
      </tr>

      ${isInterState ? `
      <tr>
        <td style="padding: 10px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">IGST (18%)</td>
        <td style="padding: 10px 18px; color: #FFFFFF; font-size: 12px; border-bottom: 1px solid #334155;">₹${igst.toLocaleString('en-IN')}</td>
      </tr>
      ` : `
      <tr>
        <td style="padding: 10px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">CGST (9%)</td>
        <td style="padding: 10px 18px; color: #FFFFFF; font-size: 12px; border-bottom: 1px solid #334155;">₹${cgst.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding: 10px 18px; color: #94A3B8; font-size: 12px; border-bottom: 1px solid #334155;">SGST (9%)</td>
        <td style="padding: 10px 18px; color: #FFFFFF; font-size: 12px; border-bottom: 1px solid #334155;">₹${sgst.toLocaleString('en-IN')}</td>
      </tr>
      `}

      <!-- Total -->
      <tr>
        <td style="padding: 14px 18px; color: #F1F5F9; font-size: 14px; font-weight: 700; background-color: #0F172A;">Total Invoice Value</td>
        <td style="padding: 14px 18px; color: #10B981; font-size: 16px; font-weight: 800; background-color: #0F172A;">₹${totalAmount.toLocaleString('en-IN')}</td>
      </tr>
    </table>

    <div style="background-color: #0B132B; border: 1px solid #1E293B; border-radius: 8px; padding: 14px; margin: 20px 0; font-size: 11px; color: #94A3B8; line-height: 1.5;">
      📌 <strong>GST Compliance Notice:</strong> This is a digitally generated tax invoice and does not require a physical signature. If you are an Indian registered enterprise, you can utilize this invoice to claim Input Tax Credit (ITC) under GSTR-2B.
    </div>
  `;

  const html = renderBaseEmailLayout({
    previewText: `Official GST Tax Invoice ${invoiceNumber} for ₹${totalAmount.toLocaleString('en-IN')} (${itemTitle}).`,
    badge: 'GST Tax Invoice Attached',
    badgeColor: 'blue',
    title: `Tax Invoice ${invoiceNumber}`,
    subtitle: `Generated for ${itemTitle} on ${invoiceDate}`,
    contentHtml,
    ctaText: 'View / Download PDF Invoice',
    ctaUrl: invoiceUrl,
    secondaryCtaText: 'View Invoices Archive',
    secondaryCtaUrl: `${appUrl}/dashboard/gst-invoices`,
    appUrl
  });

  const text = `
Hello ${firstName},

Your GST Tax Invoice is available:

Invoice Number: ${invoiceNumber}
Date: ${invoiceDate}
Service: ${itemTitle} (SAC: ${sacCode})
Supplier: ${creatorName} (GSTIN: ${creatorGst})
Recipient: ${buyerName} (GSTIN: ${buyerGst || 'B2C'})

Taxable Amount: ₹${taxableAmount.toLocaleString('en-IN')}
${isInterState ? `IGST (18%): ₹${igst.toLocaleString('en-IN')}` : `CGST (9%): ₹${cgst.toLocaleString('en-IN')}\nSGST (9%): ₹${sgst.toLocaleString('en-IN')}`}
Total Amount: ₹${totalAmount.toLocaleString('en-IN')}

View & Download PDF: ${invoiceUrl}
  `.trim();

  return { subject, html, text };
}
