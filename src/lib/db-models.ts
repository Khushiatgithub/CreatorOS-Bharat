import { query } from './db';
import { encryptToken, decryptToken } from './token-security';
import { 
  Creator, 
  DigitalProduct, 
  Course, 
  BookingService, 
  BookingAppointment, 
  Order, 
  GSTInvoiceData, 
  BrandCollabBrief, 
  BrandProposal,
  SubscriptionPlan,
  Subscription,
  SubscriptionPayment,
  GoogleCalendarIntegration,
  DayAvailability,
  CalendarMeeting
} from '@/types';
import { 
  INITIAL_CREATORS, 
  INITIAL_PRODUCTS, 
  INITIAL_COURSES, 
  INITIAL_BOOKINGS, 
  INITIAL_ORDERS, 
  INITIAL_BRAND_BRIEFS,
  INITIAL_SUBSCRIPTION_PLANS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_SUBSCRIPTION_PAYMENTS
} from './mock-data';

// ============================================================================
// 1. USER MODEL (Creators)
// ============================================================================
export const UserModel = {
  async getAll(): Promise<Creator[]> {
    const res = await query('SELECT * FROM users ORDER BY created_at ASC');
    if (res && res.rows.length > 0) {
      return res.rows.map(row => {
        const bank = typeof row.bank_account === 'string' ? JSON.parse(row.bank_account) : (row.bank_account || {});
        const socials = typeof row.social_links === 'string' ? JSON.parse(row.social_links) : (row.social_links || {});

        return {
          id: row.id,
          username: row.username,
          name: row.name,
          tagline: row.tagline || row.bio || 'Indian Creator & Mentor',
          bio: row.bio || '',
          avatarUrl: row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          bannerUrl: row.banner_url || undefined,
          verified: row.verified !== undefined ? Boolean(row.verified) : true,
          category: row.category || 'Tech & Software',
          location: row.location || `${row.state || 'Karnataka'}, India`,
          socials: socials,
          themeId: row.theme_id || 'theme-bharat-royal',
          state: row.state || 'Karnataka',
          gstNumber: row.gst_number || undefined,
          upiId: row.upi_id || 'creator@okaxis',
          upiName: row.upi_name || row.name || 'CreatorOS Bharat',
          bankAccount: {
            accountNumberMasked: '•••• •••• ' + (bank.accountNumber?.slice(-4) || '7890'),
            ifsc: bank.ifsc || 'HDFC0001234',
            bankName: bank.bankName || 'HDFC Bank'
          }
        };
      });
    }
    return INITIAL_CREATORS;
  },

  async getById(id: string): Promise<Creator | null> {
    const res = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      const bank = typeof row.bank_account === 'string' ? JSON.parse(row.bank_account) : (row.bank_account || {});
      const socials = typeof row.social_links === 'string' ? JSON.parse(row.social_links) : (row.social_links || {});

      return {
        id: row.id,
        username: row.username,
        name: row.name,
        tagline: row.tagline || row.bio || 'Indian Creator & Mentor',
        bio: row.bio || '',
        avatarUrl: row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bannerUrl: row.banner_url || undefined,
        verified: row.verified !== undefined ? Boolean(row.verified) : true,
        category: row.category || 'Tech & Software',
        location: row.location || `${row.state || 'Karnataka'}, India`,
        socials: socials,
        themeId: row.theme_id || 'theme-bharat-royal',
        state: row.state || 'Karnataka',
        gstNumber: row.gst_number || undefined,
        upiId: row.upi_id || 'creator@okaxis',
        upiName: row.upi_name || row.name || 'CreatorOS Bharat',
        bankAccount: {
          accountNumberMasked: '•••• •••• ' + (bank.accountNumber?.slice(-4) || '7890'),
          ifsc: bank.ifsc || 'HDFC0001234',
          bankName: bank.bankName || 'HDFC Bank'
        }
      };
    }
    return INITIAL_CREATORS.find(c => c.id === id) || null;
  },

  async getByUsername(username: string): Promise<Creator | null> {
    const res = await query('SELECT * FROM users WHERE username = $1', [username]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      const bank = typeof row.bank_account === 'string' ? JSON.parse(row.bank_account) : (row.bank_account || {});
      const socials = typeof row.social_links === 'string' ? JSON.parse(row.social_links) : (row.social_links || {});

      return {
        id: row.id,
        username: row.username,
        name: row.name,
        tagline: row.tagline || row.bio || 'Indian Creator & Mentor',
        bio: row.bio || '',
        avatarUrl: row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bannerUrl: row.banner_url || undefined,
        verified: row.verified !== undefined ? Boolean(row.verified) : true,
        category: row.category || 'Tech & Software',
        location: row.location || `${row.state || 'Karnataka'}, India`,
        socials: socials,
        themeId: row.theme_id || 'theme-bharat-royal',
        state: row.state || 'Karnataka',
        gstNumber: row.gst_number || undefined,
        upiId: row.upi_id || 'creator@okaxis',
        upiName: row.upi_name || row.name || 'CreatorOS Bharat',
        bankAccount: {
          accountNumberMasked: '•••• •••• ' + (bank.accountNumber?.slice(-4) || '7890'),
          ifsc: bank.ifsc || 'HDFC0001234',
          bankName: bank.bankName || 'HDFC Bank'
        }
      };
    }
    return INITIAL_CREATORS.find(c => c.username === username) || null;
  },

  async update(id: string, data: Partial<Creator>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (data.name !== undefined) { fields.push(`name = $${idx++}`); values.push(data.name); }
    if (data.bio !== undefined) { fields.push(`bio = $${idx++}`); values.push(data.bio); }
    if (data.avatarUrl !== undefined) { fields.push(`avatar_url = $${idx++}`); values.push(data.avatarUrl); }
    if (data.themeId !== undefined) { fields.push(`theme_id = $${idx++}`); values.push(data.themeId); }
    if (data.state !== undefined) { fields.push(`state = $${idx++}`); values.push(data.state); }
    if (data.gstNumber !== undefined) { fields.push(`gst_number = $${idx++}`); values.push(data.gstNumber); }
    if (data.upiId !== undefined) { fields.push(`upi_id = $${idx++}`); values.push(data.upiId); }
    if (data.upiName !== undefined) { fields.push(`upi_name = $${idx++}`); values.push(data.upiName); }
    if (data.bankAccount !== undefined) { fields.push(`bank_account = $${idx++}`); values.push(JSON.stringify(data.bankAccount)); }
    if (data.socials !== undefined) { fields.push(`social_links = $${idx++}`); values.push(JSON.stringify(data.socials)); }

    if (fields.length === 0) return true;

    values.push(id);
    const sql = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx}`;
    const res = await query(sql, values);
    return !!res;
  }
};

// ============================================================================
// 2. PRODUCT MODEL (Digital Products & Assets)
// ============================================================================
export const ProductModel = {
  async getAll(userId?: string): Promise<DigitalProduct[]> {
    const sql = userId 
      ? 'SELECT * FROM products WHERE user_id = $1 AND is_active = TRUE ORDER BY created_at DESC'
      : 'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC';
    const params = userId ? [userId] : undefined;

    const res = await query(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows.map(row => ({
        id: row.id,
        creatorId: row.user_id,
        title: row.title,
        subtitle: row.subtitle || '',
        description: row.description || '',
        coverImage: row.cover_image,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : Number(row.price) * 2,
        category: row.category,
        fileType: row.file_type || 'PDF',
        downloadUrl: row.download_url,
        features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
        salesCount: row.sales_count || 0,
        rating: Number(row.rating || 5.0),
        reviewsCount: row.reviews_count || 0,
      }));
    }
    return userId ? INITIAL_PRODUCTS.filter(p => !p.creatorId || p.creatorId === userId) : INITIAL_PRODUCTS;
  },

  async getById(id: string): Promise<DigitalProduct | null> {
    const res = await query('SELECT * FROM products WHERE id = $1', [id]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        creatorId: row.user_id,
        title: row.title,
        subtitle: row.subtitle || '',
        description: row.description || '',
        coverImage: row.cover_image,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : Number(row.price) * 2,
        category: row.category,
        fileType: row.file_type || 'PDF',
        downloadUrl: row.download_url,
        features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
        salesCount: row.sales_count || 0,
        rating: Number(row.rating || 5.0),
        reviewsCount: row.reviews_count || 0,
      };
    }
    return INITIAL_PRODUCTS.find(p => p.id === id) || null;
  },

  async create(prod: Partial<DigitalProduct> & { creatorId: string; title: string; price: number; coverImage: string; downloadUrl: string }): Promise<DigitalProduct> {
    const id = prod.id || `prod_${Date.now()}`;
    const sql = `
      INSERT INTO products (id, user_id, title, subtitle, description, cover_image, price, original_price, category, file_type, download_url, features, sales_count, rating, reviews_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;
    const origPrice = prod.originalPrice || prod.price * 2;
    const params = [
      id,
      prod.creatorId,
      prod.title,
      prod.subtitle || '',
      prod.description || '',
      prod.coverImage,
      prod.price,
      origPrice,
      prod.category || 'General',
      prod.fileType || 'PDF',
      prod.downloadUrl,
      JSON.stringify(prod.features || []),
      0,
      5.0,
      1
    ];

    await query(sql, params);
    return {
      id,
      creatorId: prod.creatorId,
      title: prod.title,
      subtitle: prod.subtitle || '',
      description: prod.description || '',
      coverImage: prod.coverImage,
      price: prod.price,
      originalPrice: origPrice,
      category: prod.category || 'General',
      fileType: prod.fileType || 'PDF',
      downloadUrl: prod.downloadUrl,
      features: prod.features || [],
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 1
    };
  },

  async delete(id: string): Promise<boolean> {
    const res = await query('UPDATE products SET is_active = FALSE WHERE id = $1', [id]);
    return !!res;
  }
};

// ============================================================================
// 3. ORDER MODEL (Transactions & Checkouts)
// ============================================================================
export const OrderModel = {
  async getAll(userId?: string): Promise<Order[]> {
    const sql = userId
      ? 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC'
      : 'SELECT * FROM orders ORDER BY created_at DESC';
    const params = userId ? [userId] : undefined;

    const res = await query(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows.map(row => ({
        id: row.id,
        orderNumber: row.order_number,
        date: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        creatorId: row.user_id,
        buyerName: row.buyer_name,
        buyerEmail: row.buyer_email,
        buyerPhone: row.buyer_phone,
        buyerState: row.buyer_state,
        buyerGst: row.buyer_gst,
        itemType: row.item_type,
        itemId: row.item_id,
        itemTitle: row.item_title,
        amount: Number(row.amount),
        gstRate: Number(row.gst_rate || 18),
        cgst: Number(row.cgst || 0),
        sgst: Number(row.sgst || 0),
        igst: Number(row.igst || 0),
        totalAmount: Number(row.total_amount),
        isInterState: row.is_inter_state,
        paymentMethod: row.payment_method,
        paymentApp: row.payment_app,
        paymentGateway: row.payment_gateway,
        razorpayOrderId: row.razorpay_order_id,
        razorpayPaymentId: row.razorpay_payment_id,
        upiRefId: row.upi_ref_id,
        invoiceNumber: row.invoice_number,
        sacCode: row.sac_code || '998431',
        status: row.status,
        paymentStatus: row.payment_status,
        bookingDate: row.booking_date,
        bookingTimeSlot: row.booking_time_slot,
        downloadUrl: row.download_url,
        deliverySentWhatsapp: row.delivery_sent_whatsapp,
        deliverySentEmail: row.delivery_sent_email,
      }));
    }
    return userId ? INITIAL_ORDERS.filter(o => o.creatorId === userId) : INITIAL_ORDERS;
  },

  async getById(id: string): Promise<Order | null> {
    const res = await query('SELECT * FROM orders WHERE id = $1', [id]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        orderNumber: row.order_number,
        date: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        creatorId: row.user_id,
        buyerName: row.buyer_name,
        buyerEmail: row.buyer_email,
        buyerPhone: row.buyer_phone,
        buyerState: row.buyer_state,
        buyerGst: row.buyer_gst,
        itemType: row.item_type,
        itemId: row.item_id,
        itemTitle: row.item_title,
        amount: Number(row.amount),
        gstRate: Number(row.gst_rate || 18),
        cgst: Number(row.cgst || 0),
        sgst: Number(row.sgst || 0),
        igst: Number(row.igst || 0),
        totalAmount: Number(row.total_amount),
        isInterState: row.is_inter_state,
        paymentMethod: row.payment_method,
        paymentApp: row.payment_app,
        paymentGateway: row.payment_gateway,
        razorpayOrderId: row.razorpay_order_id,
        razorpayPaymentId: row.razorpay_payment_id,
        upiRefId: row.upi_ref_id,
        invoiceNumber: row.invoice_number,
        sacCode: row.sac_code || '998431',
        status: row.status,
        paymentStatus: row.payment_status,
        bookingDate: row.booking_date,
        bookingTimeSlot: row.booking_time_slot,
        downloadUrl: row.download_url,
        deliverySentWhatsapp: row.delivery_sent_whatsapp,
        deliverySentEmail: row.delivery_sent_email,
      };
    }
    return INITIAL_ORDERS.find(o => o.id === id) || null;
  },

  async create(order: Order): Promise<Order> {
    const sql = `
      INSERT INTO orders (
        id, order_number, user_id, buyer_name, buyer_email, buyer_phone, buyer_state, buyer_gst,
        item_type, item_id, item_title, amount, gst_rate, cgst, sgst, igst, total_amount, is_inter_state,
        payment_method, payment_app, payment_gateway, razorpay_order_id, razorpay_payment_id, upi_ref_id,
        invoice_number, sac_code, status, payment_status, booking_date, booking_time_slot, download_url,
        delivery_sent_whatsapp, delivery_sent_email
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
        $19, $20, $21, $22, $23, $24,
        $25, $26, $27, $28, $29, $30, $31,
        $32, $33
      ) RETURNING *
    `;

    const params = [
      order.id,
      order.orderNumber,
      order.creatorId,
      order.buyerName,
      order.buyerEmail,
      order.buyerPhone,
      order.buyerState,
      order.buyerGst || null,
      order.itemType,
      order.itemId,
      order.itemTitle,
      order.amount,
      order.gstRate,
      order.cgst,
      order.sgst,
      order.igst,
      order.totalAmount,
      order.isInterState || false,
      order.paymentMethod,
      order.paymentApp || null,
      order.paymentGateway || 'Razorpay',
      order.razorpayOrderId || null,
      order.razorpayPaymentId || null,
      order.upiRefId || null,
      order.invoiceNumber,
      order.sacCode,
      order.status,
      order.paymentStatus || 'Paid',
      order.bookingDate || null,
      order.bookingTimeSlot || null,
      order.downloadUrl || null,
      order.deliverySentWhatsapp,
      order.deliverySentEmail
    ];

    await query(sql, params);
    return order;
  }
};

// ============================================================================
// 4. INVOICE MODEL (GST Tax Invoices)
// ============================================================================
export const InvoiceModel = {
  async getAll(userId?: string) {
    const sql = userId
      ? 'SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC'
      : 'SELECT * FROM invoices ORDER BY created_at DESC';
    const params = userId ? [userId] : undefined;

    const res = await query(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows;
    }
    return INITIAL_ORDERS.map(o => ({
      id: `inv_${o.id}`,
      invoice_number: o.invoiceNumber,
      order_id: o.id,
      user_id: o.creatorId,
      buyer_name: o.buyerName,
      buyer_email: o.buyerEmail,
      buyer_phone: o.buyerPhone,
      buyer_state: o.buyerState,
      taxable_amount: o.amount,
      cgst: o.cgst,
      sgst: o.sgst,
      igst: o.igst,
      total_amount: o.totalAmount,
      sac_code: o.sacCode,
      payment_status: o.paymentStatus || 'Paid',
      payment_method: o.paymentMethod,
      created_at: o.date
    }));
  },

  async getByNumber(invoiceNum: string) {
    const res = await query('SELECT * FROM invoices WHERE invoice_number = $1', [invoiceNum]);
    if (res && res.rows.length > 0) return res.rows[0];
    return null;
  }
};

// ============================================================================
// 5. BOOKING MODEL (Services & Appointments)
// ============================================================================
export const BookingModel = {
  async getServices(userId?: string): Promise<BookingService[]> {
    const sql = userId
      ? 'SELECT * FROM bookings WHERE user_id = $1 AND is_active = TRUE ORDER BY created_at DESC'
      : 'SELECT * FROM bookings WHERE is_active = TRUE ORDER BY created_at DESC';
    const params = userId ? [userId] : undefined;

    const res = await query(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows.map(row => ({
        id: row.id,
        creatorId: row.user_id,
        title: row.title,
        description: row.description,
        coverImage: row.cover_image,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : undefined,
        durationMinutes: row.duration_minutes,
        sessionType: row.session_type,
        platform: row.platform,
        availableDays: typeof row.available_days === 'string' ? JSON.parse(row.available_days) : row.available_days,
        timeSlots: typeof row.time_slots === 'string' ? JSON.parse(row.time_slots) : row.time_slots,
        bufferMinutes: row.buffer_minutes,
        bookingsCompleted: row.bookings_completed,
        rating: Number(row.rating),
      }));
    }
    return userId ? INITIAL_BOOKINGS.filter(b => b.creatorId === userId) : INITIAL_BOOKINGS;
  },

  async getAppointments(userId?: string): Promise<BookingAppointment[]> {
    const sql = userId
      ? 'SELECT * FROM appointments WHERE user_id = $1 ORDER BY created_at DESC'
      : 'SELECT * FROM appointments ORDER BY created_at DESC';
    const params = userId ? [userId] : undefined;

    const res = await query(sql, params);
    if (res && res.rows.length > 0) {
      return res.rows.map(row => ({
        id: row.id,
        serviceId: row.booking_id,
        creatorId: row.user_id,
        serviceTitle: row.service_title,
        buyerName: row.buyer_name,
        buyerEmail: row.buyer_email,
        buyerPhone: row.buyer_phone,
        date: row.date,
        timeSlot: row.time_slot,
        meetUrl: row.meet_url,
        status: row.status,
        amountPaid: Number(row.amount_paid),
        orderId: row.order_id,
        createdAt: row.created_at,
      }));
    }
    return [];
  }
};

// ============================================================================
// 6. CAMPAIGN MODEL (Marketplace Briefs & Proposals)
// ============================================================================
export const CampaignModel = {
  async getBriefs(): Promise<BrandCollabBrief[]> {
    const res = await query('SELECT * FROM campaigns WHERE status = $1 ORDER BY created_at DESC', ['Open']);
    if (res && res.rows.length > 0) {
      return res.rows.map(row => {
        const reqs = typeof row.requirements === 'string' ? JSON.parse(row.requirements) : (row.requirements || []);
        const delivs = typeof row.deliverables === 'string' ? JSON.parse(row.deliverables) : (row.deliverables || []);

        return {
          id: row.id,
          brandName: row.brand_name,
          brandLogo: row.brand_logo,
          industry: row.category || 'Consumer Tech',
          category: row.category || 'Consumer Tech',
          matchScore: row.creator_match_score || 95,
          title: row.campaign_title,
          description: reqs.length > 0 ? reqs.join('. ') : 'High-impact branded creator integration.',
          budgetMin: Number(row.budget_min || 50000),
          budgetMax: Number(row.budget_max || 100000),
          targetNiches: ['Tech', 'Career', 'Productivity', 'Lifestyle'],
          deliverables: delivs,
          deadline: row.deadline || '25 Oct 2026',
          applicantsCount: 14,
          verifiedBrand: true,
          status: 'open' as const,
        };
      });
    }
    return INITIAL_BRAND_BRIEFS;
  },

  async createProposal(proposal: BrandProposal): Promise<BrandProposal> {
    const sql = `
      INSERT INTO campaign_proposals (id, campaign_id, user_id, proposed_fee, message, deliverables, estimated_turnaround_days, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const params = [
      proposal.id,
      proposal.briefId,
      proposal.creatorId,
      proposal.proposedAmount,
      proposal.pitch,
      JSON.stringify(proposal.deliverablesProposed || []),
      proposal.timelineDays || 7,
      proposal.status || 'submitted'
    ];

    await query(sql, params);
    return proposal;
  }
};

// ============================================================================
// 7. ANALYTICS MODEL (Traffic Attribution & GMV)
// ============================================================================
export const AnalyticsModel = {
  async getSummary(userId: string = 'creator_aarav') {
    const res = await query('SELECT * FROM analytics WHERE user_id = $1 ORDER BY date DESC LIMIT 1', [userId]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      return {
        totalGmv: Number(row.total_gmv),
        totalOrders: row.total_orders,
        storefrontVisits: row.storefront_visits,
        conversionRate: Number(row.conversion_rate),
        trafficSources: typeof row.traffic_sources === 'string' ? JSON.parse(row.traffic_sources) : row.traffic_sources,
        topCities: typeof row.top_cities === 'string' ? JSON.parse(row.top_cities) : row.top_cities,
        deviceSplit: typeof row.device_split === 'string' ? JSON.parse(row.device_split) : row.device_split
      };
    }
    return {
      totalGmv: 258000,
      totalOrders: 4280,
      storefrontVisits: 34200,
      conversionRate: 12.5,
      trafficSources: [
        { name: 'Instagram Bio Link', visitors: 14200, percentage: 48, gmv: 124000 },
        { name: 'YouTube Video Descriptions', visitors: 9400, percentage: 32, gmv: 82500 },
        { name: 'LinkedIn Posts & Featured', visitors: 3500, percentage: 12, gmv: 31000 },
        { name: 'WhatsApp & Telegram Groups', visitors: 2400, percentage: 8, gmv: 20500 },
      ],
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'],
      deviceSplit: { mobile: 84, desktop: 16 }
    };
  }
};

// ============================================================================
// 10. SUBSCRIPTION PLANS MODEL (PostgreSQL: subscription_plans)
// ============================================================================
export const SubscriptionPlanModel = {
  async getAll(creatorId: string = 'creator_aarav'): Promise<SubscriptionPlan[]> {
    const res = await query(
      `SELECT * FROM subscription_plans 
       WHERE creator_id = $1 OR creator_id IS NULL OR $1 = 'all'
       ORDER BY created_at ASC`,
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      return res.rows.map((row) => {
        const benefits = typeof row.benefits === 'string' ? JSON.parse(row.benefits) : row.benefits || [];
        const price = Number(row.price) || 0;
        const cycle = (row.billing_cycle || 'monthly') as 'monthly' | 'yearly';
        const monthlyPrice = cycle === 'monthly' ? price : Math.round(price / 10);
        const yearlyPrice = cycle === 'yearly' ? price : Math.round(price * 10);

        return {
          id: String(row.id),
          creatorId: row.creator_id || creatorId,
          name: row.name,
          slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          tagline: row.tagline || (benefits[0] || 'Community • Courses • Live Q&A'),
          description: row.description || '',
          coverUrl: row.cover_image || row.cover_url || undefined,
          type: price === 0 ? 'free' : row.type || 'paid',
          monthlyPrice,
          yearlyPrice,
          benefits,
          isPopular: Boolean(row.is_popular),
          isActive: row.is_active !== undefined ? Boolean(row.is_active) : true,
          memberCount: Number(row.member_count) || (row.is_popular ? 128 : 22),
          razorpayPlanIdMonthly: row.razorpay_plan_id_monthly || undefined,
          razorpayPlanIdYearly: row.razorpay_plan_id_yearly || undefined,
          badgeText: row.is_popular ? 'Popular' : undefined,
          badgeColor: row.is_popular ? '#10B981' : undefined,
          createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2025-01-01',
          updatedAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2025-01-01'
        };
      });
    }

    return INITIAL_SUBSCRIPTION_PLANS.filter((p) => p.creatorId === creatorId || creatorId === 'all');
  },

  async getById(id: string): Promise<SubscriptionPlan | null> {
    const res = await query('SELECT * FROM subscription_plans WHERE id = $1', [id]);
    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      const benefits = typeof row.benefits === 'string' ? JSON.parse(row.benefits) : row.benefits || [];
      const price = Number(row.price) || 0;
      const cycle = (row.billing_cycle || 'monthly') as 'monthly' | 'yearly';
      const monthlyPrice = cycle === 'monthly' ? price : Math.round(price / 10);
      const yearlyPrice = cycle === 'yearly' ? price : Math.round(price * 10);

      return {
        id: String(row.id),
        creatorId: row.creator_id,
        name: row.name,
        slug: row.slug || row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline: row.tagline || (benefits[0] || 'Community • Courses • Live Q&A'),
        description: row.description || '',
        coverUrl: row.cover_image || row.cover_url || undefined,
        type: price === 0 ? 'free' : row.type || 'paid',
        monthlyPrice,
        yearlyPrice,
        benefits,
        isPopular: Boolean(row.is_popular),
        isActive: row.is_active !== undefined ? Boolean(row.is_active) : true,
        memberCount: Number(row.member_count) || (row.is_popular ? 128 : 22),
        razorpayPlanIdMonthly: row.razorpay_plan_id_monthly || undefined,
        razorpayPlanIdYearly: row.razorpay_plan_id_yearly || undefined,
        badgeText: row.is_popular ? 'Popular' : undefined,
        badgeColor: row.is_popular ? '#10B981' : undefined,
        createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2025-01-01',
        updatedAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2025-01-01'
      };
    }
    return INITIAL_SUBSCRIPTION_PLANS.find((p) => p.id === id) || null;
  },

  async create(plan: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'> & { id?: string; price?: number; billingCycle?: string; coverImage?: string }): Promise<SubscriptionPlan> {
    const id = plan.id || `plan_${Date.now()}`;
    const now = new Date().toISOString();
    const price = plan.price !== undefined ? plan.price : (plan.monthlyPrice || 0);
    const billingCycle = plan.billingCycle || 'monthly';
    const coverImage = plan.coverImage || plan.coverUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
    const benefits = plan.benefits || [];

    const newPlan: SubscriptionPlan = {
      ...plan,
      id,
      coverUrl: coverImage,
      monthlyPrice: billingCycle === 'monthly' ? price : Math.round(price / 10),
      yearlyPrice: billingCycle === 'yearly' ? price : (plan.yearlyPrice || price * 10),
      memberCount: 0,
      createdAt: now.split('T')[0],
      updatedAt: now.split('T')[0]
    };

    await query(
      `INSERT INTO subscription_plans (
        id, creator_id, name, description, price, billing_cycle,
        cover_image, benefits, is_popular, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        id,
        plan.creatorId || 'creator_aarav',
        plan.name,
        plan.description || '',
        price,
        billingCycle,
        coverImage,
        JSON.stringify(benefits),
        plan.isPopular || false,
        now
      ]
    );

    return newPlan;
  },

  async update(id: string, updates: Partial<SubscriptionPlan> & { price?: number; billingCycle?: string; coverImage?: string }): Promise<boolean> {
    const price = updates.price !== undefined ? updates.price : updates.monthlyPrice;
    const coverImage = updates.coverImage || updates.coverUrl;
    const benefits = updates.benefits ? JSON.stringify(updates.benefits) : undefined;

    const res = await query(
      `UPDATE subscription_plans SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        billing_cycle = COALESCE($4, billing_cycle),
        cover_image = COALESCE($5, cover_image),
        benefits = COALESCE($6, benefits),
        is_popular = COALESCE($7, is_popular)
      WHERE id = $8`,
      [
        updates.name,
        updates.description,
        price,
        updates.billingCycle,
        coverImage,
        benefits,
        updates.isPopular,
        id
      ]
    );
    return !!res;
  },

  async delete(id: string): Promise<boolean> {
    const res = await query('DELETE FROM subscription_plans WHERE id = $1', [id]);
    return !!res;
  }
};

// ============================================================================
// 11. SUBSCRIPTIONS MODEL (PostgreSQL: subscriptions)
// ============================================================================
export const SubscriptionModel = {
  async getByCreator(creatorId: string = 'creator_aarav'): Promise<Subscription[]> {
    const res = await query(
      `SELECT s.id, s.user_id, s.plan_id, s.status, s.start_date, s.renewal_date,
              s.razorpay_subscription_id, p.name AS plan_name, p.price AS plan_price,
              p.billing_cycle, p.creator_id, p.benefits
       FROM subscriptions s
       LEFT JOIN subscription_plans p ON s.plan_id = p.id
       WHERE p.creator_id = $1 OR p.creator_id IS NULL OR $1 = 'all'
       ORDER BY s.start_date DESC`,
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      return res.rows.map((row) => ({
        id: String(row.id),
        creatorId: row.creator_id || creatorId,
        planId: String(row.plan_id),
        planName: row.plan_name || 'VIP Membership',
        planType: (Number(row.plan_price) === 0 ? 'free' : 'paid') as any,
        userId: String(row.user_id),
        userName: row.user_name || 'Subscriber User',
        userEmail: row.user_email || 'subscriber@example.com',
        userPhone: row.user_phone || '+91 98000 00000',
        userAvatar: row.user_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        billingCycle: (row.billing_cycle || 'monthly') as any,
        amount: Number(row.plan_price) || 0,
        status: (row.status || 'active') as any,
        razorpaySubscriptionId: row.razorpay_subscription_id || undefined,
        currentPeriodStart: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-08-01',
        currentPeriodEnd: row.renewal_date ? new Date(row.renewal_date).toISOString().split('T')[0] : '2026-09-01',
        cancelAtPeriodEnd: row.status === 'cancelled',
        createdAt: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-01-01',
        updatedAt: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-01-01'
      }));
    }

    return INITIAL_SUBSCRIPTIONS.filter((s) => s.creatorId === creatorId || creatorId === 'all');
  },

  async getById(id: string): Promise<Subscription | null> {
    const res = await query(
      `SELECT s.id, s.user_id, s.plan_id, s.status, s.start_date, s.renewal_date,
              s.razorpay_subscription_id, p.name AS plan_name, p.price AS plan_price,
              p.billing_cycle, p.creator_id
       FROM subscriptions s
       LEFT JOIN subscription_plans p ON s.plan_id = p.id
       WHERE s.id = $1`,
      [id]
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: String(row.id),
        creatorId: row.creator_id || 'creator_aarav',
        planId: String(row.plan_id),
        planName: row.plan_name || 'VIP Membership',
        planType: (Number(row.plan_price) === 0 ? 'free' : 'paid') as any,
        userId: String(row.user_id),
        userName: row.user_name || 'Subscriber User',
        userEmail: row.user_email || 'subscriber@example.com',
        userPhone: row.user_phone || '+91 98000 00000',
        userAvatar: row.user_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        billingCycle: (row.billing_cycle || 'monthly') as any,
        amount: Number(row.plan_price) || 0,
        status: (row.status || 'active') as any,
        razorpaySubscriptionId: row.razorpay_subscription_id || undefined,
        currentPeriodStart: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-08-01',
        currentPeriodEnd: row.renewal_date ? new Date(row.renewal_date).toISOString().split('T')[0] : '2026-09-01',
        cancelAtPeriodEnd: row.status === 'cancelled',
        createdAt: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-01-01',
        updatedAt: row.start_date ? new Date(row.start_date).toISOString().split('T')[0] : '2026-01-01'
      };
    }

    return INITIAL_SUBSCRIPTIONS.find((s) => s.id === id) || null;
  },

  async create(sub: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'> & { id?: string; startDate?: string; renewalDate?: string }): Promise<Subscription> {
    const id = sub.id || `sub_${Date.now()}`;
    const now = new Date();
    const startDate = sub.startDate || sub.currentPeriodStart || now.toISOString();
    const daysToAdd = sub.billingCycle === 'yearly' ? 365 : 30;
    const renewalDate = sub.renewalDate || sub.currentPeriodEnd || new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

    const newSub: Subscription = {
      ...sub,
      id,
      currentPeriodStart: startDate.split('T')[0],
      currentPeriodEnd: renewalDate.split('T')[0],
      createdAt: now.toISOString().split('T')[0],
      updatedAt: now.toISOString().split('T')[0]
    };

    await query(
      `INSERT INTO subscriptions (
        id, user_id, plan_id, status, start_date, renewal_date, razorpay_subscription_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        sub.userId || `user_${Date.now()}`,
        sub.planId,
        sub.status || 'active',
        startDate,
        renewalDate,
        sub.razorpaySubscriptionId || null
      ]
    );

    return newSub;
  },

  async cancel(id: string, immediate: boolean = false): Promise<boolean> {
    const status = immediate ? 'cancelled' : 'active';
    const res = await query(
      `UPDATE subscriptions SET status = $1 WHERE id = $2`,
      [status, id]
    );
    return !!res;
  },

  async updatePlan(id: string, newPlanId: string): Promise<boolean> {
    const res = await query(
      `UPDATE subscriptions SET plan_id = $1 WHERE id = $2`,
      [newPlanId, id]
    );
    return !!res;
  },

  async delete(id: string): Promise<boolean> {
    const res = await query('DELETE FROM subscriptions WHERE id = $1', [id]);
    return !!res;
  }
};

// ============================================================================
// 12. SUBSCRIPTION PAYMENTS MODEL (PostgreSQL: subscription_payments)
// ============================================================================
export const SubscriptionPaymentModel = {
  async getByCreator(creatorId: string = 'creator_aarav'): Promise<SubscriptionPayment[]> {
    const res = await query(
      `SELECT sp.id, sp.subscription_id, sp.amount, sp.payment_status,
              sp.payment_method, sp.transaction_id, sp.created_at,
              p.name AS plan_name, p.billing_cycle, p.creator_id, s.user_id
       FROM subscription_payments sp
       LEFT JOIN subscriptions s ON sp.subscription_id = s.id
       LEFT JOIN subscription_plans p ON s.plan_id = p.id
       WHERE p.creator_id = $1 OR p.creator_id IS NULL OR $1 = 'all'
       ORDER BY sp.created_at DESC`,
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      return res.rows.map((row) => ({
        id: String(row.id),
        subscriptionId: String(row.subscription_id),
        creatorId: row.creator_id || creatorId,
        planName: row.plan_name || 'Gold Membership',
        subscriberName: row.subscriber_name || 'Member',
        subscriberEmail: row.subscriber_email || 'subscriber@example.com',
        amount: Number(row.amount),
        currency: 'INR',
        status: (row.payment_status === 'success' ? 'paid' : (row.payment_status || 'paid')) as any,
        paymentMethod: (row.payment_method || 'UPI') as any,
        razorpayPaymentId: row.transaction_id || `pay_${Date.now()}`,
        invoiceNumber: `INV-SUB-${new Date(row.created_at || Date.now()).getFullYear()}-${String(row.id).slice(-4).toUpperCase()}`,
        billingCycle: (row.billing_cycle || 'monthly') as any,
        createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : 'Just now'
      }));
    }

    return INITIAL_SUBSCRIPTION_PAYMENTS.filter((p) => p.creatorId === creatorId || creatorId === 'all');
  },

  async create(pay: {
    id?: string;
    subscriptionId: string;
    amount: number;
    currency?: string;
    status?: any;
    paymentStatus?: 'success' | 'failed' | 'refunded';
    paymentMethod?: 'UPI' | 'Card' | 'Net Banking' | 'Razorpay Autopay';
    transactionId?: string;
    razorpayPaymentId?: string;
    razorpayInvoiceId?: string;
    invoiceNumber?: string;
    creatorId?: string;
    planName?: string;
    subscriberName?: string;
    subscriberEmail?: string;
    billingCycle?: 'monthly' | 'yearly';
    createdAt?: string;
  }): Promise<SubscriptionPayment> {
    const id = pay.id || `spay_${Date.now()}`;
    const now = pay.createdAt || new Date().toISOString();
    const txId = pay.transactionId || pay.razorpayPaymentId || `tx_${Date.now()}`;
    const paymentStatus = pay.paymentStatus || 'success';
    const paymentMethod = pay.paymentMethod || 'UPI';

    const newPay: SubscriptionPayment = {
      id,
      subscriptionId: pay.subscriptionId,
      creatorId: pay.creatorId || 'creator_aarav',
      planName: pay.planName || 'Gold Membership',
      subscriberName: pay.subscriberName || 'Subscriber',
      subscriberEmail: pay.subscriberEmail || 'subscriber@example.com',
      amount: pay.amount,
      currency: 'INR',
      status: paymentStatus === 'success' ? 'paid' : 'failed',
      paymentMethod: paymentMethod as any,
      razorpayPaymentId: txId,
      invoiceNumber: `INV-SUB-${new Date().getFullYear()}-${id.slice(-4).toUpperCase()}`,
      billingCycle: pay.billingCycle || 'monthly',
      createdAt: now.split('T')[0]
    };

    await query(
      `INSERT INTO subscription_payments (
        id, subscription_id, amount, payment_status, payment_method, transaction_id, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        pay.subscriptionId,
        pay.amount,
        paymentStatus,
        paymentMethod,
        txId,
        now
      ]
    );

    return newPay;
  }
};

// ============================================================================
// 12. INITIAL CALENDAR MOCK DATA
// ============================================================================
export const INITIAL_GOOGLE_CALENDAR: GoogleCalendarIntegration = {
  id: 'gcal_creator_aarav',
  creatorId: 'creator_aarav',
  provider: 'google_calendar',
  accountEmail: 'aarav.sharma@gmail.com',
  isConnected: true,
  syncStatus: 'synced',
  lastSyncedAt: 'Today at 02:45 PM',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01'
};

export const INITIAL_WEEKLY_AVAILABILITY: DayAvailability[] = [
  {
    day: 'Monday',
    isEnabled: true,
    timeRanges: [
      { id: 'mon_1', start: '10:00', end: '13:00' },
      { id: 'mon_2', start: '15:00', end: '19:00' }
    ]
  },
  {
    day: 'Tuesday',
    isEnabled: true,
    timeRanges: [
      { id: 'tue_1', start: '10:00', end: '13:00' },
      { id: 'tue_2', start: '15:00', end: '19:00' }
    ]
  },
  {
    day: 'Wednesday',
    isEnabled: true,
    timeRanges: [
      { id: 'wed_1', start: '10:00', end: '13:00' },
      { id: 'wed_2', start: '15:00', end: '19:00' }
    ]
  },
  {
    day: 'Thursday',
    isEnabled: true,
    timeRanges: [
      { id: 'thu_1', start: '10:00', end: '13:00' },
      { id: 'thu_2', start: '15:00', end: '19:00' }
    ]
  },
  {
    day: 'Friday',
    isEnabled: true,
    timeRanges: [
      { id: 'fri_1', start: '10:00', end: '13:00' },
      { id: 'fri_2', start: '14:30', end: '18:00' }
    ]
  },
  {
    day: 'Saturday',
    isEnabled: true,
    timeRanges: [
      { id: 'sat_1', start: '11:00', end: '16:00' }
    ]
  },
  {
    day: 'Sunday',
    isEnabled: false,
    timeRanges: []
  }
];

export const INITIAL_CALENDAR_MEETINGS: CalendarMeeting[] = [
  {
    id: 'meet_101',
    creatorId: 'creator_aarav',
    studentName: 'Priya Sundaram',
    studentEmail: 'priya.sundaram@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    studentPhone: '+91 98450 11223',
    meetingTitle: '1:1 Fullstack System Design & Resume Review',
    meetingDate: 'Tomorrow, Sep 6, 2026',
    meetingTime: '04:30 PM - 05:15 PM',
    durationMinutes: 45,
    meetingStatus: 'confirmed',
    meetingUrl: 'https://meet.google.com/xyz-bharat-osm',
    googleEventId: 'gevent_priya_101',
    topic: 'FAANG Interview Strategy & Low-Level Design (LLD)',
    createdAt: '2026-09-04'
  },
  {
    id: 'meet_102',
    creatorId: 'creator_aarav',
    studentName: 'Rohan Varma',
    studentEmail: 'rohan.varma@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    studentPhone: '+91 98110 33445',
    meetingTitle: 'Senior SDE Mock Interview & DSA Teardown',
    meetingDate: 'Mon, Sep 8, 2026',
    meetingTime: '11:00 AM - 12:00 PM',
    durationMinutes: 60,
    meetingStatus: 'upcoming',
    meetingUrl: 'https://meet.google.com/abc-creator-meet',
    googleEventId: 'gevent_rohan_102',
    topic: 'Graph Algorithms & Concurrency in Node.js',
    createdAt: '2026-09-05'
  },
  {
    id: 'meet_103',
    creatorId: 'creator_aarav',
    studentName: 'Ananya Iyer',
    studentEmail: 'ananya.iyer@gmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    studentPhone: '+91 97220 55667',
    meetingTitle: 'Creator Strategy & Bio-Storefront Launch 1:1',
    meetingDate: 'Wed, Sep 10, 2026',
    meetingTime: '06:00 PM - 06:45 PM',
    durationMinutes: 45,
    meetingStatus: 'confirmed',
    meetingUrl: 'https://meet.google.com/cre-live-iyer',
    googleEventId: 'gevent_ananya_103',
    topic: 'Packaging Cohorts & Razorpay UPI Autopay Setup',
    createdAt: '2026-09-05'
  },
  {
    id: 'meet_104',
    creatorId: 'creator_aarav',
    studentName: 'Vikramaditya Roy',
    studentEmail: 'vikram.roy@techmail.com',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    studentPhone: '+91 99001 77889',
    meetingTitle: 'Cloud Architecture & Distributed Microservices Q&A',
    meetingDate: 'Fri, Sep 12, 2026',
    meetingTime: '03:00 PM - 03:45 PM',
    durationMinutes: 45,
    meetingStatus: 'upcoming',
    meetingUrl: 'https://meet.google.com/vkm-arch-meet',
    googleEventId: 'gevent_vikram_104',
    topic: 'Kubernetes on AWS & Cost Optimization',
    createdAt: '2026-09-05'
  }
];

// ============================================================================
// 13. CALENDAR INTEGRATION MODEL (Google Calendar with OAuth)
// ============================================================================
export const CalendarIntegrationModel = {
  async getByCreator(creatorId: string = 'creator_aarav'): Promise<GoogleCalendarIntegration> {
    const res = await query(
      'SELECT * FROM calendar_integrations WHERE creator_id = $1 ORDER BY updated_at DESC LIMIT 1',
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0];
      return {
        id: row.id,
        creatorId: row.creator_id,
        provider: row.provider || 'google_calendar',
        accountEmail: row.account_email,
        isConnected: Boolean(row.is_connected),
        syncStatus: row.sync_status || 'synced',
        lastSyncedAt: row.last_synced_at ? new Date(row.last_synced_at).toLocaleString('en-IN') : 'Just now',
        accessToken: row.access_token ? decryptToken(row.access_token) : undefined,
        refreshToken: row.refresh_token ? decryptToken(row.refresh_token) : undefined,
        tokenExpiry: row.token_expiry ? new Date(row.token_expiry).toISOString() : undefined,
        scope: row.scope || undefined,
        googleCalendarId: row.google_calendar_id || 'primary',
        autoGenerateMeet: row.auto_generate_meet !== false,
        createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2025-01-01',
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString().split('T')[0] : '2025-01-01'
      };
    }

    return INITIAL_GOOGLE_CALENDAR;
  },

  async getEncryptedTokens(creatorId: string = 'creator_aarav'): Promise<{ accessToken?: string; refreshToken?: string }> {
    const res = await query(
      'SELECT access_token, refresh_token FROM calendar_integrations WHERE creator_id = $1 LIMIT 1',
      [creatorId]
    );
    if (res && res.rows.length > 0) {
      return {
        accessToken: res.rows[0].access_token || undefined,
        refreshToken: res.rows[0].refresh_token || undefined
      };
    }
    return {};
  },

  async save(integration: {
    creatorId?: string;
    accountEmail: string;
    isConnected: boolean;
    syncStatus?: 'synced' | 'syncing' | 'disconnected' | 'error';
    accessToken?: string;
    refreshToken?: string;
    tokenExpiry?: string;
    scope?: string;
    googleCalendarId?: string;
    autoGenerateMeet?: boolean;
  }): Promise<GoogleCalendarIntegration> {
    const creatorId = integration.creatorId || 'creator_aarav';
    const id = `gcal_${creatorId}`;
    const now = new Date().toISOString();
    const syncStatus = integration.isConnected ? (integration.syncStatus || 'synced') : 'disconnected';

    const encAccessToken = integration.accessToken ? encryptToken(integration.accessToken) : null;
    const encRefreshToken = integration.refreshToken ? encryptToken(integration.refreshToken) : null;

    await query(
      `INSERT INTO calendar_integrations (
        id, creator_id, provider, account_email, is_connected, sync_status, 
        last_synced_at, access_token, refresh_token, token_expiry, scope, google_calendar_id, 
        auto_generate_meet, created_at, updated_at
      ) VALUES ($1, $2, 'google_calendar', $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (id) DO UPDATE SET
        account_email = EXCLUDED.account_email,
        is_connected = EXCLUDED.is_connected,
        sync_status = EXCLUDED.sync_status,
        last_synced_at = EXCLUDED.last_synced_at,
        access_token = COALESCE(EXCLUDED.access_token, calendar_integrations.access_token),
        refresh_token = COALESCE(EXCLUDED.refresh_token, calendar_integrations.refresh_token),
        token_expiry = COALESCE(EXCLUDED.token_expiry, calendar_integrations.token_expiry),
        scope = COALESCE(EXCLUDED.scope, calendar_integrations.scope),
        google_calendar_id = COALESCE(EXCLUDED.google_calendar_id, calendar_integrations.google_calendar_id),
        auto_generate_meet = COALESCE(EXCLUDED.auto_generate_meet, calendar_integrations.auto_generate_meet),
        updated_at = EXCLUDED.updated_at`,
      [
        id,
        creatorId,
        integration.accountEmail,
        integration.isConnected,
        syncStatus,
        now,
        encAccessToken,
        encRefreshToken,
        integration.tokenExpiry || null,
        integration.scope || null,
        integration.googleCalendarId || 'primary',
        integration.autoGenerateMeet !== false,
        now,
        now
      ]
    );

    return {
      id,
      creatorId,
      provider: 'google_calendar',
      accountEmail: integration.accountEmail,
      isConnected: integration.isConnected,
      syncStatus,
      lastSyncedAt: 'Just now',
      accessToken: integration.accessToken,
      refreshToken: integration.refreshToken,
      tokenExpiry: integration.tokenExpiry,
      scope: integration.scope,
      googleCalendarId: integration.googleCalendarId || 'primary',
      autoGenerateMeet: integration.autoGenerateMeet !== false,
      createdAt: now.split('T')[0],
      updatedAt: now.split('T')[0]
    };
  },

  async disconnect(creatorId: string = 'creator_aarav'): Promise<boolean> {
    const id = `gcal_${creatorId}`;
    const now = new Date().toISOString();

    await query(
      `UPDATE calendar_integrations SET
        is_connected = FALSE,
        sync_status = 'disconnected',
        access_token = NULL,
        refresh_token = NULL,
        updated_at = $1
      WHERE id = $2 OR creator_id = $3`,
      [now, id, creatorId]
    );

    return true;
  }
};

// ============================================================================
// 14. CALENDAR AVAILABILITY MODEL (Weekly schedule & Buffer)
// ============================================================================
export const CalendarAvailabilityModel = {
  async getByCreator(creatorId: string = 'creator_aarav'): Promise<{ availability: DayAvailability[]; bufferMinutes: number }> {
    const res = await query(
      'SELECT * FROM calendar_availability WHERE creator_id = $1 ORDER BY created_at ASC',
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      const availability: DayAvailability[] = res.rows.map((row) => {
        const timeRanges = typeof row.time_slots === 'string' ? JSON.parse(row.time_slots) : row.time_slots || [];
        return {
          day: row.day_of_week,
          isEnabled: Boolean(row.is_enabled),
          timeRanges
        };
      });

      const bufferMinutes = res.rows[0].buffer_minutes || 15;
      return { availability, bufferMinutes };
    }

    return { availability: INITIAL_WEEKLY_AVAILABILITY, bufferMinutes: 15 };
  },

  async save(
    creatorId: string = 'creator_aarav',
    availability: DayAvailability[],
    bufferMinutes: number = 15
  ): Promise<boolean> {
    const now = new Date().toISOString();

    for (const day of availability) {
      const id = `avail_${creatorId}_${day.day.toLowerCase()}`;
      await query(
        `INSERT INTO calendar_availability (
          id, creator_id, day_of_week, is_enabled, time_slots, buffer_minutes, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (creator_id, day_of_week) DO UPDATE SET
          is_enabled = EXCLUDED.is_enabled,
          time_slots = EXCLUDED.time_slots,
          buffer_minutes = EXCLUDED.buffer_minutes,
          updated_at = EXCLUDED.updated_at`,
        [
          id,
          creatorId,
          day.day,
          day.isEnabled,
          JSON.stringify(day.timeRanges || []),
          bufferMinutes,
          now,
          now
        ]
      );
    }

    return true;
  }
};

// ============================================================================
// 15. CALENDAR MEETINGS MODEL (Upcoming meetings)
// ============================================================================
export const CalendarMeetingModel = {
  async getByCreator(creatorId: string = 'creator_aarav'): Promise<CalendarMeeting[]> {
    const res = await query(
      `SELECT * FROM calendar_meetings 
       WHERE creator_id = $1 OR creator_id IS NULL OR $1 = 'all'
       ORDER BY created_at DESC`,
      [creatorId]
    );

    if (res && res.rows.length > 0) {
      return res.rows.map((row) => ({
        id: row.id,
        creatorId: row.creator_id || creatorId,
        studentName: row.student_name,
        studentEmail: row.student_email,
        studentAvatar: row.student_avatar || undefined,
        studentPhone: row.student_phone || undefined,
        meetingTitle: row.meeting_title,
        meetingDate: row.meeting_date,
        meetingTime: row.meeting_time,
        durationMinutes: Number(row.duration_minutes) || 45,
        meetingStatus: row.meeting_status || 'confirmed',
        meetingUrl: row.meeting_url || 'https://meet.google.com/new',
        googleEventId: row.google_event_id || undefined,
        topic: row.topic || undefined,
        createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '2026-09-05'
      }));
    }

    return INITIAL_CALENDAR_MEETINGS.filter((m) => m.creatorId === creatorId || creatorId === 'all');
  },

  async create(meeting: Omit<CalendarMeeting, 'id' | 'createdAt'> & { id?: string }): Promise<CalendarMeeting> {
    const id = meeting.id || `meet_${Date.now()}`;
    const now = new Date().toISOString();

    const newMeeting: CalendarMeeting = {
      ...meeting,
      id,
      createdAt: now.split('T')[0]
    };

    await query(
      `INSERT INTO calendar_meetings (
        id, creator_id, student_name, student_email, student_avatar, student_phone,
        meeting_title, meeting_date, meeting_time, duration_minutes, meeting_status,
        meeting_url, google_event_id, topic, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        id,
        meeting.creatorId || 'creator_aarav',
        meeting.studentName,
        meeting.studentEmail,
        meeting.studentAvatar || null,
        meeting.studentPhone || null,
        meeting.meetingTitle,
        meeting.meetingDate,
        meeting.meetingTime,
        meeting.durationMinutes || 45,
        meeting.meetingStatus || 'confirmed',
        meeting.meetingUrl,
        meeting.googleEventId || null,
        meeting.topic || null,
        now
      ]
    );

    return newMeeting;
  },

  async updateStatus(id: string, status: string): Promise<boolean> {
    await query('UPDATE calendar_meetings SET meeting_status = $1 WHERE id = $2', [status, id]);
    return true;
  }
};


