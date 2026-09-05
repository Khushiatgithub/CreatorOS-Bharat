import { query } from './db';
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
  SubscriptionPayment
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


