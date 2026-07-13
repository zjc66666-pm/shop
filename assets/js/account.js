(function () {
  const ASSET = 'assets/images/account/';

  const state = {
    toast: '',
    resetStep: 1,
    lastAccountView: 'account-orders',
    orderFilter: 'all',
    trackOrderId: '',
    cancelOrderId: '',
    reviewOrderId: '',
    reviewItemIndex: -1,
    reviewRatings: { product: 0, service: 0, shipping: 0 },
    reviewDescription: '',
    reviewImages: [],
    collectionRemoveId: '',
    addressDialog: null,
    passwordForm: { current: '', next: '', confirm: '' },
    mobileNavOpen: false
  };

  const REVIEW_RATING_TEXTS = ['Very poor', 'Poor', 'Average', 'Good', 'Excellent'];

  const PRODUCT_IMAGES = {
    gum: 'assets/images/products/focus-gum.svg',
    focus: 'assets/images/products/focus-pouch.svg'
  };

  const orders = {
    FOL20250827001: {
      id: 'FOL20250827001', createdAt: 'Aug 27, 2025, 10:14 AM', status: 'to_pay', paymentStatus: 'Unpaid',
      subtotal: 33.98, shippingFee: 0, total: 29.98, paidAmount: 0, totalSavings: 4.00,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'Card',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Aug 27, 2025, 10:14 AM' }, { label: 'Awaiting payment', time: 'Aug 27, 2025, 10:14 AM' }],
      items: [
        { type: 'product', title: 'Neurix Focus & Energy Gum', variant: 'Mint / 12 Pack', qty: 1, price: 12.99, compare: 14.99, productDiscount: 2.00, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Neurix Focus & Energy Gum', variant: 'Citrus / 12 Pack', qty: 1, price: 16.99, compare: 18.99, productDiscount: 2.00, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827002: {
      id: 'FOL20250827002', createdAt: 'Aug 27, 2025, 09:18 AM', status: 'to_ship', paymentStatus: 'Paid',
      subtotal: 174.66, shippingFee: 8.99, total: 169.66, paidAmount: 169.66, totalSavings: 46.59,
      orderDiscounts: [{ label: 'WELCOME5', amount: 5.00 }], shippingDiscounts: [{ label: 'FREESHIP', amount: 8.99 }], paymentMethod: 'Card',
      subscription: { id: 'SUB-20471', frequency: 'Every 2 months', nextCharge: 'Oct 27, 2025' },
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Aug 27, 2025, 09:18 AM' }, { label: 'Payment confirmed', time: 'Aug 27, 2025, 09:19 AM' }, { label: 'Preparing shipment', time: 'Aug 27, 2025, 09:20 AM' }],
      items: [
        { type: 'bundle', title: 'Coffee Office Pack', qty: 1, price: 55.98, compare: 69.97, bundleDiscount: 7.99, subscriptionDiscount: 6.00, subscription: { id: 'SUB-20471', frequency: 'Every 2 months' }, children: [
          { title: 'Signature Blend Coffee 500g', variant: 'Whole bean, 2 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Coffee Brew Guide', variant: 'Digital download', qty: 1, gift: true, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'bundle', title: 'Focus Gum - Multipack', qty: 1, price: 49.30, compare: 57.30, bundleDiscount: 8.00, children: [
          { title: 'Neurix Focus & Energy Gum', variant: 'Mint / 12 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Neurix Focus & Energy Gum', variant: 'Citrus / 12 Pack', qty: 2, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'product', title: 'Whey Protein 1kg', variant: 'Vanilla / 1kg', qty: 1, price: 31.59, compare: 39.00, subscriptionDiscount: 3.90, productDiscount: 3.51, subscription: { id: 'SUB-20472', frequency: 'Every 1 month' }, image: PRODUCT_IMAGES.focus },
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 28.80, compare: 32.00, productDiscount: 3.20, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 8.99, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827003: {
      id: 'FOL20250827003', createdAt: 'Aug 14, 2025, 08:40 AM', status: 'shipped', paymentStatus: 'Paid',
      subtotal: 46.99, shippingFee: 0, total: 46.99, paidAmount: 46.99, totalSavings: 5.00,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'PayPal',
      subscription: { id: 'SUB-20452', frequency: 'Every 1 month', nextCharge: 'Sep 14, 2025' },
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      tracking: { carrier: 'USPS', number: '9400 1000 0000 0123 4567 89', stage: 'Arriving tomorrow' },
      timeline: [{ label: 'Order placed', time: 'Aug 14, 2025, 08:40 AM' }, { label: 'Payment confirmed', time: 'Aug 14, 2025, 08:41 AM' }, { label: 'Shipped with USPS', time: 'Aug 15, 2025, 02:18 PM' }],
      items: [
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 28.80, compare: 32.00, subscriptionDiscount: 1.60, productDiscount: 1.60, subscription: { id: 'SUB-20452', frequency: 'Every 1 month' }, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Vitamin D3', variant: '120 softgels', qty: 1, price: 18.19, compare: 19.99, subscriptionDiscount: 1.80, subscription: { id: 'SUB-20452', frequency: 'Every 1 month' }, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827004: {
      id: 'FOL20250827004', createdAt: 'Jul 28, 2025, 01:06 PM', status: 'review', paymentStatus: 'Paid',
      subtotal: 57.30, shippingFee: 0, total: 49.30, paidAmount: 49.30, totalSavings: 8.00,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'Apple Pay',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      tracking: { carrier: 'FedEx', number: '7849 1122 3344', stage: 'Delivered on Aug 1, 2025' },
      timeline: [{ label: 'Order placed', time: 'Jul 28, 2025, 01:06 PM' }, { label: 'Shipped with FedEx', time: 'Jul 29, 2025, 10:24 AM' }, { label: 'Delivered', time: 'Aug 1, 2025, 03:12 PM' }],
      items: [
        { type: 'bundle', title: 'Focus Gum - Multipack', qty: 1, price: 49.30, compare: 57.30, bundleDiscount: 8.00, children: [
          { title: 'Neurix Focus & Energy Gum', variant: 'Mint / 12 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Neurix Focus & Energy Gum', variant: 'Citrus / 12 Pack', qty: 2, image: PRODUCT_IMAGES.focus }
        ] }
      ]
    },
    FOL20250827005: {
      id: 'FOL20250827005', createdAt: 'Jul 02, 2025, 06:32 PM', status: 'done', paymentStatus: 'Paid',
      subtotal: 89.99, shippingFee: 0, total: 89.99, paidAmount: 89.99, totalSavings: 0,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'Card',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Jul 02, 2025, 06:32 PM' }, { label: 'Delivered', time: 'Jul 06, 2025, 11:04 AM' }, { label: 'Order completed', time: 'Jul 20, 2025, 11:04 AM' }],
      items: [{ type: 'product', title: 'Neurix Daily Performance Pack', variant: '30-day supply', qty: 1, price: 89.99, image: PRODUCT_IMAGES.focus }]
    },
    FOL20250827006: {
      id: 'FOL20250827006', createdAt: 'Jun 26, 2025, 04:22 PM', status: 'to_pay', paymentStatus: 'Unpaid',
      subtotal: 116.35, shippingFee: 0, total: 109.35, paidAmount: 0, totalSavings: 32.61,
      orderDiscounts: [{ label: 'PREPAY7', amount: 7.00 }], shippingDiscounts: [], paymentMethod: 'Card',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Jun 26, 2025, 04:22 PM' }, { label: 'Awaiting payment', time: 'Jun 26, 2025, 04:22 PM' }],
      items: [
        { type: 'bundle', title: 'Coffee Essentials Bundle', qty: 1, price: 49.98, compare: 63.98, bundleDiscount: 9.00, subscriptionDiscount: 5.00, subscription: { frequency: 'Every 1 month', pending: true }, children: [
          { title: 'Signature Blend Coffee 500g', variant: 'Whole bean / 2 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Coffee Brew Guide', variant: 'Digital download', qty: 1, gift: true, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'product', title: 'Whey Protein 1kg', variant: 'Vanilla / 1kg', qty: 1, price: 31.59, compare: 39.00, subscriptionDiscount: 3.90, productDiscount: 3.51, subscription: { frequency: 'Every 1 month', pending: true }, image: PRODUCT_IMAGES.focus },
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 25.79, compare: 29.99, productDiscount: 4.20, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 8.99, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827007: {
      id: 'FOL20250827007', createdAt: 'Jun 18, 2025, 11:03 AM', status: 'to_ship', paymentStatus: 'Paid',
      subtotal: 43.98, shippingFee: 5.00, total: 43.98, paidAmount: 43.98, totalSavings: 5.00,
      orderDiscounts: [], shippingDiscounts: [{ label: 'FREESHIP', amount: 5.00 }], paymentMethod: 'Google Pay',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Jun 18, 2025, 11:03 AM' }, { label: 'Payment confirmed', time: 'Jun 18, 2025, 11:04 AM' }, { label: 'Preparing shipment', time: 'Jun 18, 2025, 11:05 AM' }],
      items: [
        { type: 'product', title: 'Neurix Focus & Energy Gum', variant: 'Mint / 12 Pack', qty: 1, price: 16.99, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Neurix Focus & Energy Gum', variant: 'Citrus / 12 Pack', qty: 1, price: 26.99, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827008: {
      id: 'FOL20250827008', createdAt: 'Jun 06, 2025, 02:47 PM', status: 'shipped', paymentStatus: 'Paid',
      subtotal: 94.98, shippingFee: 7.99, total: 89.98, paidAmount: 89.98, totalSavings: 22.98,
      orderDiscounts: [{ label: 'WELCOME5', amount: 5.00 }], shippingDiscounts: [{ label: 'FREESHIP', amount: 7.99 }], paymentMethod: 'Card',
      subscription: { id: 'SUB-20448', frequency: 'Every 2 months', nextCharge: 'Aug 06, 2025' },
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      tracking: { carrier: 'UPS', number: '1Z999AA10123456784', stage: 'In transit' },
      timeline: [{ label: 'Order placed', time: 'Jun 06, 2025, 02:47 PM' }, { label: 'Payment confirmed', time: 'Jun 06, 2025, 02:48 PM' }, { label: 'Shipped with UPS', time: 'Jun 07, 2025, 09:16 AM' }],
      items: [
        { type: 'bundle', title: 'Coffee Office Pack', qty: 1, price: 54.99, compare: 64.98, bundleDiscount: 4.99, subscriptionDiscount: 5.00, subscription: { id: 'SUB-20448', frequency: 'Every 2 months' }, children: [
          { title: 'Signature Blend Coffee 500g', variant: 'Ground / 2 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Coffee Brew Guide', variant: 'Digital download', qty: 1, gift: true, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'product', title: 'Neurix Daily Performance Pack', variant: '30-day supply', qty: 1, price: 39.99, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827009: {
      id: 'FOL20250827009', createdAt: 'May 20, 2025, 09:36 AM', status: 'review', paymentStatus: 'Paid',
      subtotal: 69.38, shippingFee: 0, total: 69.38, paidAmount: 69.38, totalSavings: 10.61,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'PayPal',
      subscription: { id: 'SUB-20436', frequency: 'Every 1 month', nextCharge: 'Jun 20, 2025' },
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      tracking: { carrier: 'FedEx', number: '7849 1122 8877', stage: 'Delivered on May 24, 2025' },
      timeline: [{ label: 'Order placed', time: 'May 20, 2025, 09:36 AM' }, { label: 'Shipped with FedEx', time: 'May 21, 2025, 01:24 PM' }, { label: 'Delivered', time: 'May 24, 2025, 11:12 AM' }],
      items: [
        { type: 'product', title: 'Whey Protein 1kg', variant: 'Chocolate / 1kg', qty: 1, price: 31.59, compare: 39.00, subscriptionDiscount: 3.90, productDiscount: 3.51, subscription: { id: 'SUB-20436', frequency: 'Every 1 month' }, image: PRODUCT_IMAGES.focus },
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 28.80, compare: 32.00, productDiscount: 3.20, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 8.99, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827010: {
      id: 'FOL20250827010', createdAt: 'May 03, 2025, 03:15 PM', status: 'done', paymentStatus: 'Paid',
      subtotal: 125.36, shippingFee: 8.99, total: 120.36, paidAmount: 120.36, totalSavings: 38.59,
      orderDiscounts: [{ label: 'WELCOME5', amount: 5.00 }], shippingDiscounts: [{ label: 'FREESHIP', amount: 8.99 }], paymentMethod: 'Apple Pay',
      subscription: { id: 'SUB-20422', frequency: 'Every 2 months', nextCharge: 'Jul 03, 2025' },
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'May 03, 2025, 03:15 PM' }, { label: 'Delivered', time: 'May 08, 2025, 02:41 PM' }, { label: 'All items reviewed', time: 'May 10, 2025, 11:04 AM' }, { label: 'Order completed', time: 'May 17, 2025, 11:04 AM' }],
      items: [
        { type: 'bundle', title: 'Coffee Office Pack', qty: 1, price: 55.98, compare: 69.97, bundleDiscount: 7.99, subscriptionDiscount: 6.00, subscription: { id: 'SUB-20422', frequency: 'Every 2 months' }, reviewed: true, children: [
          { title: 'Signature Blend Coffee 500g', variant: 'Whole bean / 2 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Coffee Brew Guide', variant: 'Digital download', qty: 1, gift: true, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'product', title: 'Whey Protein 1kg', variant: 'Vanilla / 1kg', qty: 1, price: 31.59, compare: 39.00, subscriptionDiscount: 3.90, productDiscount: 3.51, subscription: { id: 'SUB-20423', frequency: 'Every 1 month' }, reviewed: true, image: PRODUCT_IMAGES.focus },
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 28.80, compare: 32.00, productDiscount: 3.20, reviewed: true, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 8.99, reviewed: true, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827011: {
      id: 'FOL20250827011', createdAt: 'Apr 17, 2025, 10:19 AM', status: 'cancelled', paymentStatus: 'Cancelled',
      subtotal: 42.98, shippingFee: 0, total: 42.98, paidAmount: 0, totalSavings: 4.20,
      orderDiscounts: [], shippingDiscounts: [], paymentMethod: 'Card',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Apr 17, 2025, 10:19 AM' }, { label: 'Order cancelled', time: 'Apr 17, 2025, 10:34 AM' }],
      items: [
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 25.79, compare: 29.99, productDiscount: 4.20, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 17.19, image: PRODUCT_IMAGES.focus }
      ]
    },
    FOL20250827012: {
      id: 'FOL20250827012', createdAt: 'Apr 02, 2025, 05:44 PM', status: 'cancelled', paymentStatus: 'Refunded',
      subtotal: 116.35, shippingFee: 0, total: 109.35, paidAmount: 109.35, totalSavings: 32.61,
      orderDiscounts: [{ label: 'WELCOME7', amount: 7.00 }], shippingDiscounts: [], paymentMethod: 'Google Pay',
      shipping: { name: 'Alex Morgan', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], phone: '+1 206 555 0188' },
      timeline: [{ label: 'Order placed', time: 'Apr 02, 2025, 05:44 PM' }, { label: 'Payment confirmed', time: 'Apr 02, 2025, 05:45 PM' }, { label: 'Order cancelled', time: 'Apr 03, 2025, 09:10 AM' }, { label: 'Refunded', time: 'Apr 05, 2025, 01:28 PM' }],
      items: [
        { type: 'bundle', title: 'Coffee Essentials Bundle', qty: 1, price: 49.98, compare: 63.98, bundleDiscount: 9.00, subscriptionDiscount: 5.00, subscription: { frequency: 'Every 1 month', pending: true }, children: [
          { title: 'Signature Blend Coffee 500g', variant: 'Whole bean / 2 Pack', qty: 2, image: PRODUCT_IMAGES.gum },
          { title: 'Coffee Brew Guide', variant: 'Digital download', qty: 1, gift: true, image: PRODUCT_IMAGES.focus }
        ] },
        { type: 'product', title: 'Whey Protein 1kg', variant: 'Vanilla / 1kg', qty: 1, price: 31.59, compare: 39.00, subscriptionDiscount: 3.90, productDiscount: 3.51, subscription: { frequency: 'Every 1 month', pending: true }, image: PRODUCT_IMAGES.focus },
        { type: 'product', title: 'Daily Multivitamin (60 ct)', variant: '60 capsules', qty: 1, price: 25.79, compare: 29.99, productDiscount: 4.20, image: PRODUCT_IMAGES.gum },
        { type: 'product', title: 'Stainless Steel Coffee Scoop', variant: '30 ml', qty: 1, price: 8.99, image: PRODUCT_IMAGES.focus }
      ]
    }
  };

  const collectionItems = [
    { id: 'COL-01', title: 'Neurix Focus & Energy Gum', price: 12.99, compare: 14.99, image: PRODUCT_IMAGES.gum },
    { id: 'COL-02', title: 'Whey Protein 1kg', price: 31.59, compare: 39.00, image: PRODUCT_IMAGES.focus },
    { id: 'COL-03', title: 'Daily Multivitamin (60 ct)', price: 28.80, compare: 32.00, image: PRODUCT_IMAGES.gum }
  ];

  const addressItems = [
    { id: 'ADDR-01', name: 'Alex Morgan', phone: '+1 206 555 0188', email: 'alex.morgan@email.com', lines: ['118 King Street, Suite 6', 'Seattle, WA 98101', 'United States'], isDefault: true },
    { id: 'ADDR-02', name: 'Alex Morgan', phone: '+1 425 555 0146', email: 'alex.morgan@email.com', lines: ['412 Sunset Avenue', 'Bellevue, WA 98004', 'United States'], isDefault: false }
  ];

  function h(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function currentOrderId() {
    return new URLSearchParams(location.search).get('id') || 'FOL20250827002';
  }

  function setView(view, params) {
    if (window.setView && !params) {
      window.setView(view);
      return;
    }
    const url = new URL(location.href);
    url.searchParams.set('view', view);
    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));
    }
    history.pushState({}, '', url);
    if (window.render) window.render();
  }

  function setOrderDetail(orderId) {
    setView('order-detail', { id: orderId });
  }

  function toast(text) {
    state.toast = text;
    if (window.render) window.render();
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => {
      state.toast = '';
      if (window.render) window.render();
    }, 1300);
  }

  function pct(value, total) {
    return ((value / total) * 100).toFixed(4) + '%';
  }

  function hot(zone, width, height) {
    const label = h(zone.label || zone.action || zone.go || 'Open');
    const attrs = zone.go ? `data-go="${h(zone.go)}"` : `data-account-action="${h(zone.action)}"`;
    const extra = zone.id ? ` data-id="${h(zone.id)}"` : '';
    const style = `left:${pct(zone.x, width)};top:${pct(zone.y, height)};width:${pct(zone.w, width)};height:${pct(zone.h, height)};`;
    return `<button class="design-hotspot" style="${style}" ${attrs}${extra} aria-label="${label}" title="${label}"></button>`;
  }

  function frame({ desktop, mobile, dw, dh, mw, mh, desktopZones = [], mobileZones = [], desktopClass = '', mobileClass = '' }) {
    return `<section class="account-design-root">
      <div class="design-frame pc-design ${desktopClass}" style="--design-w:${dw};--design-h:${dh};">
        <img src="${ASSET}${desktop}" alt="" draggable="false">
        <div class="design-overlay">${desktopZones.map((zone) => hot(zone, dw, dh)).join('')}</div>
      </div>
      <div class="design-frame mobile-design ${mobileClass}" style="--design-w:${mw};--design-h:${mh};">
        <img src="${ASSET}${mobile}" alt="" draggable="false">
        <div class="design-overlay">${mobileZones.map((zone) => hot(zone, mw, mh)).join('')}</div>
      </div>
      ${state.toast ? `<div class="account-toast">${h(state.toast)}</div>` : ''}
    </section>`;
  }

  function shellFromAsset(desktop, mobile, dw, dh, mw, mh, desktopZones, mobileZones, options = {}) {
    return frame({ desktop, mobile, dw, dh, mw, mh, desktopZones, mobileZones, ...options });
  }

  function entryHtml() {
    const cards = [
      ['cart-page', 'Cart page', 'Full-page cart for normal products, variants, bundles, and subscriptions.'],
      ['cart-drawer', 'Cart drawer', 'Side cart drawer for mobile space, bundle children, and discount display.'],
      ['checkout', 'Checkout', 'Checkout summary, payment form, subscription, and bundle display.'],
      ['account-orders', 'Account center', 'Account center entry for orders, collections, address book, and modal states.'],
      ['login', 'Login', 'Trigger login modal and password recovery flow.'],
      ['register', 'Register', 'Trigger registration modal.']
    ];
    return `<section class="account-entry">
      <p class="entry-label">NEURIX USER-END TESTING</p>
      <h1>Neurix user-end QA entry</h1>
      <p>Cart and Checkout keep the existing HTML prototype. Account, login, and register flows use the latest latest account design package as the visual source of truth with clickable hotspots for navigation and modal states.</p>
      <div class="entry-grid">${cards.map(([view, title, desc]) => `<button class="entry-card" data-go="${view}"><strong>${title}</strong><span>${desc}</span></button>`).join('')}</div>
    </section>`;
  }

  function sidebarZones(active) {
    const pc = [
      { x: 312, y: 206, w: 110, h: 28, action: 'password', label: 'Edit password' },
      { x: 270, y: 350, w: 145, h: 42, go: 'account-orders', label: 'My orders' },
      { x: 270, y: 412, w: 145, h: 42, go: 'account-collections', label: 'Collections' },
      { x: 270, y: 474, w: 145, h: 42, go: 'account-address', label: 'Address Book' },
      { x: 270, y: 536, w: 145, h: 42, action: 'signout', label: 'Sign out' }
    ];
    const mobile = [
      { x: 650, y: 138, w: 52, h: 52, action: 'password', label: 'Edit password' },
      { x: 714, y: 138, w: 52, h: 52, action: 'signout', label: 'Sign out' },
      { x: 24, y: 229, w: 150, h: 48, go: 'account-orders', label: 'My orders' },
      { x: 210, y: 229, w: 170, h: 48, go: 'account-collections', label: 'Collections' },
      { x: 430, y: 229, w: 190, h: 48, go: 'account-address', label: 'Address Book' }
    ];
    return { pc, mobile };
  }

  const ORDER_STATUS = {
    all: { label: 'All' },
    to_pay: { label: 'To pay', tone: 'warning', progress: 0 },
    to_ship: { label: 'To ship', tone: 'active', progress: 1 },
    shipped: { label: 'Shipped', tone: 'active', progress: 2 },
    review: { label: 'Awaiting Review', tone: 'success', progress: 3 },
    done: { label: 'Done', tone: 'muted', progress: 4 },
    cancelled: { label: 'Cancelled', tone: 'muted', progress: 0 }
  };

  const ORDER_FILTERS = [
    ['all', 'All orders'], ['to_pay', 'To pay'], ['to_ship', 'To ship'], ['shipped', 'Shipped'],
    ['review', 'Awaiting Review'], ['done', 'Done'], ['cancelled', 'Cancelled']
  ];

  function money(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function orderStatus(order) {
    return ORDER_STATUS[order.status] || ORDER_STATUS.to_ship;
  }

  function orderHasBundle(order) {
    return order.items.some((item) => item.type === 'bundle');
  }

  function orderHasSubscription(order) {
    return order.items.some((item) => item.subscription);
  }

  function orderHasDiscount(order) {
    return order.items.some((item) => item.bundleDiscount || item.subscriptionDiscount || item.productDiscount) || order.orderDiscounts.length || order.shippingDiscounts.length;
  }

  function orderItemCount(order) {
    return order.items.reduce((count, item) => count + Number(item.qty || 1), 0);
  }

  function orderPreviewImages(order) {
    const images = [];
    order.items.forEach((item) => {
      if (item.type === 'bundle' && item.children && item.children.length) images.push(item.children[0].image);
      else if (item.image) images.push(item.image);
    });
    return images.filter(Boolean).slice(0, 2);
  }

  function orderSummary(order) {
    const first = order.items[0];
    if (!first) return 'No items';
    const remaining = Math.max(0, order.items.length - 1);
    return `${first.title}${remaining ? ` + ${remaining} more item${remaining > 1 ? 's' : ''}` : ''}`;
  }

  function storefrontHeader() {
    return `<header class="account-storefront-header">
      <div class="account-storefront-header-inner">
        <button class="account-mobile-menu-button" data-account-action="mobile-nav-toggle" aria-label="${state.mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}" aria-expanded="${state.mobileNavOpen}" aria-controls="account-mobile-nav-drawer"><span aria-hidden="true"></span></button>
        <button class="account-storefront-brand" data-go="index" aria-label="Back to home">BESTVOY</button>
        <nav class="account-storefront-nav" aria-label="Store navigation">
          <button data-go="index">Home</button><button data-go="index">All Products</button><button data-go="index">All Reviews</button>
          <button data-go="index">Blog</button><button data-go="account-orders">Order Tracking</button><button data-go="index">About Us</button>
        </nav>
        <div class="account-storefront-tools">
          <button class="account-currency">USD($)<span class="account-chev"></span></button>
          <button class="account-tool account-tool-search" aria-label="Search"><span></span></button>
          <button class="account-tool account-tool-user" data-go="account-orders" aria-label="Account"><i class="account-tool-icon account-icon account-icon--header-account" aria-hidden="true"></i></button>
          <button class="account-tool account-tool-cart" data-cart-action="open-drawer" aria-label="Cart"><i class="account-tool-icon account-icon account-icon--header-cart" aria-hidden="true"></i><b>2</b></button>
        </div>
      </div>${mobileNavigationDrawer()}
    </header>`;
  }

  function mobileNavigationDrawer() {
    const items = [
      ['index', 'Home'], ['index', 'All Products'], ['index', 'All Reviews'],
      ['index', 'Blog'], ['account-orders', 'Order Tracking'], ['index', 'About Us']
    ];
    const tabIndex = state.mobileNavOpen ? '0' : '-1';
    return `<div class="account-mobile-nav-drawer ${state.mobileNavOpen ? 'is-open' : ''}" aria-hidden="${!state.mobileNavOpen}">
      <button class="account-mobile-nav-backdrop" data-account-action="mobile-nav-close" aria-label="Close navigation menu" tabindex="${tabIndex}"></button>
      <aside class="account-mobile-nav-panel" id="account-mobile-nav-drawer" aria-label="Mobile navigation">
        <strong>BESTVOY</strong>
        <nav>${items.map(([view, label]) => `<button data-account-action="mobile-nav-go" data-go="${view}" tabindex="${tabIndex}">${label}</button>`).join('')}</nav>
      </aside>
    </div>`;
  }

  function storefrontFooter() {
    return `<footer class="account-storefront-footer">
      <div class="account-storefront-footer-inner">
        <div class="account-footer-links">
          <section><strong>Shop</strong><span>Blog</span><span>All Reviews</span><span>Sitemap</span></section>
          <section><strong>Support</strong><span>About Us</span><span>Contact Us</span><span>Payment Method</span><span>Order Tracking</span></section>
          <section><strong>Legal & Privacy</strong><span>Terms of Service</span><span>Privacy Policy</span><span>Cookie Policy</span><span>Cookies Settings</span></section>
          <section><strong>Policies</strong><span>Shipping Policy</span><span>Return & Refund Policy</span><span>Order Changes And Cancellations</span><span>Review Policy</span></section>
        </div>
        <section class="account-footer-contact"><strong>Get in Touch</strong><span>Company: Bestvoy INC</span><span>Address: 7300 MILLER DR, FREDERICK CO 80504, US</span><span>Contact Us: support@bestvoy.com</span><span>Phone (US): +1 (508) 204-3308</span><p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p><div><input aria-label="Email address" placeholder="Please enter your email address"><button>Subscribe</button></div></section>
      </div>
      <div class="account-storefront-footer-bottom"><span>We Accept</span><div class="account-payment-chips" aria-label="Accepted payment methods"><img src="assets/images/payments/paypal.png" alt="PayPal"><img src="assets/images/payments/google-pay.svg" alt="Google Pay"><img src="assets/images/payments/apple-pay.svg" alt="Apple Pay"><img src="assets/images/payments/visa.svg" alt="Visa"><img src="assets/images/payments/mastercard.svg" alt="Mastercard"><img src="assets/images/payments/american-express.svg" alt="American Express"><img src="assets/images/payments/discover.png" alt="Discover"><img src="assets/images/payments/diners-club.svg" alt="Diners Club"><img src="assets/images/payments/jcb.png" alt="JCB"><img src="assets/images/payments/klarna.png" alt="Klarna"><img src="assets/images/payments/afterpay.png" alt="Afterpay"></div><small>© 2026 Bestvoy INC. All Rights Reserved.</small></div>
    </footer>`;
  }

  function storefrontShell(content, mainClass = '') {
    const classes = mainClass ? ` ${mainClass}` : '';
    return `<section class="account-storefront-root">
      ${storefrontHeader()}
      <main class="account-storefront-main${classes}">${content}</main>
      ${storefrontFooter()}
    </section>`;
  }

  function accountBreadcrumb(title) {
    return `<nav class="account-storefront-breadcrumb" aria-label="Breadcrumb"><button data-go="index">Home</button><span>›</span><button data-go="account-orders">Account</button><span>›</span><strong>${h(title)}</strong></nav>`;
  }

  function accountNavigation(active) {
    const links = [
      ['account-orders', 'My orders', 'orders'],
      ['account-collections', 'Collections', 'collections'],
      ['account-address', 'Address Book', 'address']
    ];
    return `<nav class="account-storefront-side-nav" aria-label="Account navigation">${links.map(([view, label, icon]) => `<button class="account-storefront-side-link ${active === view ? 'is-active' : ''}" data-go="${view}"><i class="account-side-symbol account-icon account-icon--${icon}" aria-hidden="true"></i>${label}</button>`).join('')}</nav>`;
  }

  function accountMobileHeader(active) {
    const links = [
      ['account-orders', 'My orders'],
      ['account-collections', 'Collections'],
      ['account-address', 'Address Book']
    ];
    return `<section class="account-mobile-account-header">
      <div class="account-mobile-profile">
        <div class="account-mobile-avatar">AM</div>
        <div class="account-mobile-profile-copy"><strong>Alex Morgan</strong><span>alex.morgan@email.com</span></div>
        <div class="account-mobile-profile-actions">
          <button data-account-action="password" aria-label="Edit password"><i class="account-icon account-icon--password" aria-hidden="true"></i></button>
          <button data-account-action="signout" aria-label="Sign out"><i class="account-icon account-icon--signout" aria-hidden="true"></i></button>
        </div>
      </div>
      <nav class="account-mobile-account-menu" aria-label="Account menu">${links.map(([view, label]) => `<button class="${active === view ? 'is-active' : ''}" data-go="${view}">${label}</button>`).join('')}</nav>
    </section>`;
  }

  function accountSidebar(active) {
    return `<aside class="account-storefront-sidebar">
      <div class="account-storefront-user"><div class="account-storefront-avatar">AM</div><strong>Alex Morgan</strong><span>alex.morgan@email.com</span><button data-account-action="password"><i class="account-icon account-icon--password" aria-hidden="true"></i><span>Edit password</span></button></div>
      ${accountNavigation(active)}
      <button class="account-storefront-signout" data-account-action="signout"><i class="account-side-symbol account-icon account-icon--signout" aria-hidden="true"></i>Sign Out</button>
    </aside>`;
  }

  function accountShell(content, active = 'account-orders', title = 'My orders') {
    return `<section class="account-storefront-root">
      ${storefrontHeader()}
      <main class="account-storefront-main">
        ${accountBreadcrumb(title)}
        <div class="account-storefront-layout">${accountSidebar(active)}<section class="account-storefront-content">${accountMobileHeader(active)}${content}</section></div>
      </main>
      ${storefrontFooter()}
      ${state.toast ? `<div class="account-toast">${h(state.toast)}</div>` : ''}
    </section>`;
  }

  function orderDetailShell(content) {
    return `<section class="account-storefront-root">
      ${storefrontHeader()}
      <main class="account-detail-main">${accountBreadcrumb('Order details')}${content}</main>
      ${storefrontFooter()}
      ${state.toast ? `<div class="account-toast">${h(state.toast)}</div>` : ''}
    </section>`;
  }

  function orderBadges(order) {
    const badges = [];
    if (orderHasBundle(order)) badges.push('<span class="order-kind-tag bundle">Bundle</span>');
    if (orderHasSubscription(order)) badges.push('<span class="order-kind-tag subscription">Subscription</span>');
    if (orderHasDiscount(order)) badges.push('<span class="order-kind-tag discount">Discount applied</span>');
    return badges.length ? `<div class="order-kind-tags">${badges.join('')}</div>` : '';
  }

  function orderActions(order, compact) {
    const id = h(order.id);
    const classes = compact ? ' account-action-compact' : '';
    const view = `<button class="account-button secondary${classes}" data-account-action="detail" data-id="${id}">View details</button>`;
    const group = (actions) => `<div class="order-card-actions is-${actions.length}-actions">${actions.join('')}</div>`;
    if (order.status === 'to_pay') return group([`<button class="account-button text${classes}" data-account-action="cancel-order" data-id="${id}">Cancel order</button>`, view, '<button class="account-button primary' + classes + '" data-go="checkout">Pay Now</button>']);
    if (order.status === 'shipped') return group([view, `<button class="account-button secondary${classes}" data-account-action="track" data-id="${id}">Track package</button>`, `<button class="account-button primary${classes}" data-account-action="confirm" data-id="${id}">Confirm receipt</button>`]);
    if (order.status === 'review') return group([view, `<button class="account-button primary${classes}" data-account-action="detail" data-id="${id}">Leave a review</button>`]);
    return group([view]);
  }

  function orderListProduct(item) {
    if (item.type === 'bundle') {
      const children = (item.children || []).map((child) => `<div class="account-order-product account-order-bundle-child"><div class="account-order-product-image"><img src="${h(child.image)}" alt=""></div><div class="account-order-product-info"><div class="account-order-product-title"><span class="account-order-included ${child.gift ? 'is-gift' : ''}">${child.gift ? 'Free' : 'Included'}</span><strong>${h(child.title)}</strong></div>${child.variant ? `<span class="account-order-variant">${h(child.variant)}</span>` : ''}<div class="account-order-product-meta"><span>x${Number(child.qty || 1)}</span></div></div></div>`).join('');
      return `<section class="account-order-bundle"><div class="account-order-bundle-head"><div><span class="account-order-bundle-tag">Bundle</span><strong>${h(item.title)}</strong></div><div>${priceBlock(item.price, item.compare)}</div></div>${children}</section>`;
    }
    return `<div class="account-order-product"><div class="account-order-product-image"><img src="${h(item.image)}" alt=""></div><div class="account-order-product-info"><strong>${h(item.title)}</strong>${item.variant ? `<span class="account-order-variant">${h(item.variant)}</span>` : ''}<div class="account-order-product-meta"><span>x${Number(item.qty || 1)}</span></div></div><div class="account-order-product-price">${priceBlock(item.price, item.compare)}</div></div>`;
  }

  function orderCard(order) {
    const status = orderStatus(order);
    const shipping = Number(order.shippingFee || 0);
    const mobileTotal = `A total of <strong>${orderItemCount(order)}</strong> Items, actually paid <span>${money(order.total)}</span>${shipping > 0 ? `<em>(Including shipping ${money(shipping)})</em>` : ''}`;
    return `<article class="account-live-order-card">
      <button class="account-live-order-summary" data-account-action="detail" data-id="${h(order.id)}" aria-label="Open order ${h(order.id)}">
        <div class="account-live-order-head"><span>Order date: ${h(order.createdAt)}</span><strong class="account-live-order-status ${status.tone}">${h(status.label)}</strong></div>
        <div class="account-live-order-products">${order.items.map(orderListProduct).join('')}</div>
      </button>
      <div class="account-live-order-footer"><p class="account-live-order-total account-live-order-total--desktop"><span>Total</span><strong>${money(order.total)}</strong></p><p class="account-live-order-total account-live-order-total--mobile">${mobileTotal}</p>${orderActions(order, true)}</div>
      ${state.trackOrderId === order.id && order.tracking ? trackingPanel(order) : ''}
    </article>`;
  }

  function ordersHtml() {
    state.lastAccountView = 'account-orders';
    const filteredOrders = Object.values(orders).filter((order) => state.orderFilter === 'all' || order.status === state.orderFilter);
    const filterTabs = ORDER_FILTERS.map(([value, label]) => `<button class="order-filter ${state.orderFilter === value ? 'is-active' : ''}" data-account-action="filter" data-filter="${value}">${label}</button>`).join('');
    const empty = '<div class="account-order-empty"><strong>No orders yet.</strong><span>Orders matching this status will appear here.</span></div>';
    return accountShell(`<section class="account-live-orders-section"><div class="order-filter-row" role="tablist" aria-label="Order status">${filterTabs}</div>
      <div class="account-live-order-list">${filteredOrders.length ? filteredOrders.map(orderCard).join('') : empty}</div>
      <div class="account-order-pagination" aria-label="Order pages"><span>‹</span><strong>1</strong><span>2</span><span>3</span><span>4</span><span>5</span><span>›</span></div>
      ${orderDialogs()}`);
  }

  function resetPasswordForm() {
    state.passwordForm = { current: '', next: '', confirm: '' };
  }

  function passwordDialogHtml() {
    const form = state.passwordForm;
    return `<div class="account-dialog-backdrop" role="presentation"><section class="account-dialog account-password-dialog" role="dialog" aria-modal="true" aria-labelledby="change-password-title"><button class="account-dialog-close" data-account-action="modal-close" aria-label="Close">&times;</button><h2 id="change-password-title">Change Password</h2><div class="account-password-form"><label>Current password<input type="password" data-password-field="current" value="${h(form.current)}" autocomplete="current-password" placeholder="Enter current password"></label><label>New password<input type="password" data-password-field="next" value="${h(form.next)}" autocomplete="new-password" placeholder="At least 8 characters"></label><label>Confirm new password<input type="password" data-password-field="confirm" value="${h(form.confirm)}" autocomplete="new-password" placeholder="Enter new password again"></label></div><div class="account-dialog-actions"><button class="account-button secondary" data-account-action="modal-close">Cancel</button><button class="account-button primary" data-account-action="save-password">Save password</button></div></section></div>`;
  }

  function accountOverlayBackgroundHtml() {
    const backView = state.lastAccountView || 'account-orders';
    return backView === 'account-address'
      ? addressHtml()
      : backView === 'account-collections'
        ? collectionsHtml()
        : ordersHtml();
  }

  function accountPasswordHtml() {
    return `${accountOverlayBackgroundHtml()}${passwordDialogHtml()}`;
  }

  function signoutDialogHtml() {
    return `<div class="account-dialog-backdrop" role="presentation"><section class="account-dialog account-signout-dialog" role="dialog" aria-modal="true" aria-labelledby="signout-title"><button class="account-dialog-close" data-account-action="modal-close" aria-label="Close">&times;</button><h2 id="signout-title">Sign out</h2><p>Are you sure you want to sign out of your account?</p><div class="account-dialog-actions"><button class="account-button secondary" data-account-action="modal-close">Cancel</button><button class="account-button primary" data-account-action="signout-confirm">Sign out</button></div></section></div>`;
  }

  function accountSignoutHtml() {
    return `${accountOverlayBackgroundHtml()}${signoutDialogHtml()}`;
  }

  function collectionRemoveDialog() {
    const item = collectionItems.find((candidate) => candidate.id === state.collectionRemoveId);
    if (!item) return '';
    return `<div class="account-dialog-backdrop" role="presentation"><section class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="collection-remove-title"><button class="account-dialog-close" data-account-action="collection-remove-cancel" aria-label="Close">&times;</button><h2 id="collection-remove-title">Remove collection</h2><p>Remove <strong>${h(item.title)}</strong> from your collections?</p><div class="account-dialog-actions"><button class="account-button text" data-account-action="collection-remove-cancel">Cancel</button><button class="account-button primary" data-account-action="collection-remove-confirm">Remove</button></div></section></div>`;
  }

  function collectionCard(item) {
    const discount = item.compare > item.price ? Math.round((1 - item.price / item.compare) * 100) : 0;
    return `<article class="account-collection-card"><div class="account-collection-media"><img src="${h(item.image)}" alt="${h(item.title)}"></div><div class="account-collection-info"><h2>${h(item.title)}</h2><div class="account-collection-pricing"><strong>${money(item.price)}</strong>${item.compare > item.price ? `<s>${money(item.compare)}</s>` : ''}${discount ? `<span>${discount}% OFF</span>` : ''}</div><p>Free shipping</p></div><div class="account-collection-actions"><button class="account-collection-button primary" data-go="cart-page">View product</button><button class="account-collection-button text" data-account-action="collection-remove" data-id="${h(item.id)}">Remove</button></div></article>`;
  }

  function collectionsHtml() {
    state.lastAccountView = 'account-collections';
    const content = collectionItems.length
      ? `<div class="account-collection-list">${collectionItems.map(collectionCard).join('')}</div>`
      : '<div class="account-account-empty"><strong>No collections yet.</strong><span>Save products to review them here later.</span></div>';
    return accountShell(`<section class="account-view-section account-collections-section"><h1 class="account-view-title">Collections</h1>${content}${collectionRemoveDialog()}</section>`, 'account-collections', 'Collections');
  }

  function addressCard(item) {
    return `<article class="account-address-card">${item.isDefault ? '<span class="account-address-default">Default</span>' : ''}<div class="account-address-info"><h2>${h(item.name)}</h2><p>${h(item.phone)}</p><p>${h(item.email)}</p><p class="account-address-lines">${item.lines.map(h).join('<br>')}</p></div><div class="account-address-actions"><button data-account-action="address-edit" data-id="${h(item.id)}">Edit</button><button data-account-action="address-delete" data-id="${h(item.id)}">Remove</button></div></article>`;
  }

  function addressDialogHtml() {
    const dialog = state.addressDialog;
    if (!dialog) return '';
    const item = addressItems.find((candidate) => candidate.id === dialog.id);
    if (dialog.mode === 'delete') {
      if (!item) return '';
      return `<div class="account-dialog-backdrop" role="presentation"><section class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="address-delete-title"><button class="account-dialog-close" data-account-action="address-close" aria-label="Close">&times;</button><h2 id="address-delete-title">Delete address</h2><p>Delete the address for <strong>${h(item.name)}</strong> from your address book?</p><div class="account-dialog-actions"><button class="account-button text" data-account-action="address-close">Cancel</button><button class="account-button primary" data-account-action="address-delete-confirm">Confirm</button></div></section></div>`;
    }
    const values = item || { name: '', phone: '', email: '', lines: ['', '', ''], isDefault: false };
    return `<div class="account-dialog-backdrop" role="presentation"><section class="account-dialog account-address-dialog" role="dialog" aria-modal="true" aria-labelledby="address-dialog-title"><button class="account-dialog-close" data-account-action="address-close" aria-label="Close">&times;</button><h2 id="address-dialog-title">${item ? 'Edit address' : 'Add new address'}</h2><div class="account-address-form"><label>Full name<input data-address-field="name" value="${h(values.name)}" autocomplete="name"></label><label>Phone<input data-address-field="phone" value="${h(values.phone)}" autocomplete="tel"></label><label class="account-address-form-wide">Email<input data-address-field="email" value="${h(values.email)}" autocomplete="email"></label><label class="account-address-form-wide">Address<input data-address-field="address1" value="${h(values.lines[0] || '')}" autocomplete="street-address"></label><label>City<input data-address-field="city" value="${h((values.lines[1] || '').split(',')[0] || '')}" autocomplete="address-level2"></label><label>State / ZIP code<input data-address-field="region" value="${h((values.lines[1] || '').split(',').slice(1).join(',').trim() || '')}" autocomplete="address-level1"></label><label class="account-address-form-wide">Country<input data-address-field="country" value="${h(values.lines[2] || 'United States')}" autocomplete="country-name"></label><label class="account-address-default-field"><input type="checkbox" data-address-field="default" ${values.isDefault ? 'checked' : ''}><span>Set as default address</span></label></div><div class="account-dialog-actions"><button class="account-button text" data-account-action="address-close">Cancel</button><button class="account-button primary" data-account-action="address-save">Save address</button></div></section></div>`;
  }

  function addressHtml() {
    state.lastAccountView = 'account-address';
    return accountShell(`<section class="account-view-section account-address-section"><h1 class="account-view-title">Address Book</h1><div class="account-address-grid"><button class="account-address-add" data-account-action="address-add"><span aria-hidden="true">+</span><strong>Add new address</strong></button>${addressItems.map(addressCard).join('')}</div>${addressDialogHtml()}</section>`, 'account-address', 'Address Book');
  }

  function priceBlock(price, compare) {
    const hasCompare = Number(compare || 0) > Number(price || 0);
    return `<div class="account-inline-price">${hasCompare ? `<s>${money(compare)}</s>` : ''}<strong>${money(price)}</strong></div>`;
  }

  function priceAdjustment(label, amount, kind) {
    if (!amount) return '';
    return `<div class="account-detail-price-adjustment ${kind || ''}"><span><i class="account-detail-price-adjustment-icon account-icon account-icon--discount" aria-hidden="true"></i>${h(label)}</span><strong>-${money(amount)}</strong></div>`;
  }

  function deliveryIntervalLabel(subscription) {
    const frequency = String(subscription && subscription.frequency ? subscription.frequency : '').trim();
    if (!frequency) return 'Subscription';
    return /^every\s+/i.test(frequency) ? `Delivery every ${frequency.replace(/^every\s+/i, '')}` : frequency;
  }

  function subscriptionPriceAdjustment(item) {
    if (!item.subscription) return '';
    const amount = Number(item.subscriptionDiscount || 0);
    const label = deliveryIntervalLabel(item.subscription);
    const summary = amount > 0 ? `${label} (-${money(amount)})` : label;
    return `<div class="account-detail-price-adjustment subscription"><span><i class="account-detail-price-adjustment-icon account-icon account-icon--discount" aria-hidden="true"></i>${h(summary)}</span></div>`;
  }

  function formatVariant(value) {
    return String(value || '').split(',').map((part) => part.trim()).filter(Boolean).join(' / ');
  }

  function itemPriceSummary(price, compare, adjustments) {
    const rows = adjustments.filter(Boolean).join('');
    return `<div class="account-detail-price-stack">${priceBlock(price, compare)}${rows ? `<div class="account-detail-price-adjustments">${rows}</div>` : ''}</div>`;
  }

  function itemReviewAction(order, item, itemIndex) {
    if (item.reviewed) {
      return '<span class="account-detail-review-status"><i class="account-icon account-icon--done" aria-hidden="true"></i>Reviewed</span>';
    }
    if (order.status !== 'review') return '';
    return `<button class="account-detail-review-button" data-account-action="review-open" data-id="${h(order.id)}" data-item-index="${itemIndex}"><i class="account-icon account-icon--awaiting-review" aria-hidden="true"></i>Leave a review</button>`;
  }

  function productDetailItem(item, order, itemIndex) {
    const variant = formatVariant(item.variant);
    const reviewAction = itemReviewAction(order, item, itemIndex);
    return `<article class="account-detail-goods-item">
      <div class="account-detail-product-image"><img src="${h(item.image)}" alt=""></div>
      <div class="account-detail-product-info"><div class="account-detail-product-copy"><strong>${h(item.title)}</strong>${variant ? `<span class="account-detail-product-variant">${h(variant)}</span>` : ''}<div class="account-detail-product-quantity">x${Number(item.qty || 1)}</div></div>
        ${itemPriceSummary(item.price, item.compare, [subscriptionPriceAdjustment(item), priceAdjustment('Product discount', item.productDiscount, 'product')])}
        ${reviewAction ? `<div class="account-detail-review-control">${reviewAction}</div>` : ''}
      </div>
    </article>`;
  }

  function bundleDetailItem(item, order, itemIndex) {
    const childRows = (item.children || []).map((child) => {
      const variant = formatVariant(child.variant);
      return `<div class="account-detail-bundle-child">
      <div class="account-detail-child-image"><img src="${h(child.image)}" alt=""></div>
      <div><div class="account-detail-child-title"><span class="account-detail-included ${child.gift ? 'gift' : ''}">${child.gift ? 'Free' : 'Included'}</span><strong>${h(child.title)}</strong></div>${variant ? `<span class="account-detail-child-variant">${h(variant)}</span>` : ''}<span class="account-detail-child-quantity">x${Number(child.qty || 1)}</span></div>
    </div>`;
    }).join('');
    const reviewAction = itemReviewAction(order, item, itemIndex);
    return `<section class="account-detail-bundle-group">
      <div class="account-detail-bundle-head"><div><span class="account-detail-bundle-label">Bundle</span><strong>${h(item.title)}</strong><span>x${Number(item.qty || 1)}</span></div></div>
      ${itemPriceSummary(item.price, item.compare, [priceAdjustment('Bundle discount', item.bundleDiscount, 'bundle'), subscriptionPriceAdjustment(item)])}
      <div class="account-detail-bundle-children">${childRows}</div>
      ${reviewAction ? `<div class="account-detail-bundle-review-control">${reviewAction}</div>` : ''}
    </section>`;
  }

  function trackingPanel(order) {
    if (!order.tracking) return '';
    return `<section class="account-tracking-panel"><div><span>Tracking</span><strong>${h(order.tracking.carrier)} ${h(order.tracking.number)}</strong></div><span class="tracking-stage">${h(order.tracking.stage)}</span></section>`;
  }

  function orderProgress(order) {
    const status = orderStatus(order);
    if (order.status === 'cancelled') return `<section class="account-detail-cancelled"><strong>Order cancelled</strong><span>This order was cancelled and will not be fulfilled.</span></section>`;
    const steps = [['To pay', 'to-pay'], ['To ship', 'to-ship'], ['Shipped', 'shipped'], ['Awaiting Review', 'awaiting-review'], ['Done', 'done']];
    return `<section class="account-detail-progress"><ol>${steps.map(([step, icon], index) => `<li class="${index <= status.progress ? 'is-complete' : ''} ${index === status.progress ? 'is-current' : ''}"><i class="account-detail-progress-icon account-icon account-icon--${icon}" aria-hidden="true"></i><strong>${step}</strong></li>`).join('')}</ol></section>`;
  }

  function orderTotals(order) {
    const orderDiscounts = order.orderDiscounts || [];
    const shippingDiscounts = order.shippingDiscounts || [];
    const checkoutSubtotal = (order.items || []).reduce((total, item) => total + (Number(item.price || 0) * Number(item.qty || 1)), 0) || Number(order.subtotal || 0);
    const discountLine = (discount) => `<div class="account-detail-summary-line account-detail-summary-subline"><span><i class="account-icon account-icon--discount" aria-hidden="true"></i>${h(discount.label)}</span><strong>-${money(discount.amount)}</strong></div>`;
    const hasShippingDiscount = shippingDiscounts.length > 0;
    const shippingDiscountTotal = shippingDiscounts.reduce((total, discount) => total + Number(discount.amount || 0), 0);
    const shippingAmount = Number(order.shippingFee || shippingDiscountTotal || 0);
    const shippingValue = hasShippingDiscount
      ? `<strong class="account-detail-summary-shipping-value"><s>${money(shippingAmount)}</s><b>FREE</b></strong>`
      : `<strong>${shippingAmount > 0 ? money(shippingAmount) : 'FREE'}</strong>`;
    const totalSavings = Number(order.totalSavings || 0);

    return `<section class="account-detail-summary">
      <div class="account-detail-summary-line"><span>Subtotal (${orderItemCount(order)} Items)</span><strong>${money(checkoutSubtotal)}</strong></div>
      ${orderDiscounts.length ? '<div class="account-detail-summary-line account-detail-summary-label"><span>Order Discount</span></div>' : ''}
      ${orderDiscounts.map(discountLine).join('')}
      <div class="account-detail-summary-line"><span>Shipping</span>${shippingValue}</div>
      ${shippingDiscounts.map(discountLine).join('')}
      <div class="account-detail-summary-line account-detail-summary-total"><span>Total</span><strong>${money(order.total)}</strong></div>
      ${totalSavings > 0 ? `<div class="account-detail-summary-savings"><i class="account-icon account-icon--discount" aria-hidden="true"></i><span>TOTAL SAVINGS ${money(totalSavings)}</span></div>` : ''}
    </section>`;
  }

  function orderInfoCards(order) {
    const shippingAddress = h((order.shipping.lines || []).join(', '));
    const delivery = order.tracking ? `<section class="account-detail-info-section"><h2>Delivery Information</h2><dl><div><dt>Express:</dt><dd>${h(order.tracking.carrier)}</dd></div><div><dt>Tracking number:</dt><dd>${h(order.tracking.number)} <button class="account-copy-button" data-account-action="track" data-id="${h(order.id)}">${state.trackOrderId === order.id ? 'Hide tracking' : 'Track package'}</button></dd></div></dl>${state.trackOrderId === order.id ? trackingPanel(order) : ''}</section>` : '';
    return `<div class="account-detail-info-stack">${delivery}<section class="account-detail-info-section"><h2>Order Information</h2><dl><div><dt>Order number:</dt><dd>${h(order.id)}</dd></div><div><dt>Order status:</dt><dd>${h(orderStatus(order).label)}</dd></div><div><dt>Order date:</dt><dd>${h(order.createdAt)}</dd></div><div><dt>Payment Method:</dt><dd>${h(order.paymentMethod)}</dd></div><div><dt>Order total:</dt><dd class="account-detail-info-money">${money(order.total)}</dd></div></dl></section><section class="account-detail-info-section"><h2>Shipping Information</h2><dl><div><dt>Recipient:</dt><dd>${h(order.shipping.name)}</dd></div><div><dt>Email:</dt><dd>alex.morgan@email.com</dd></div><div><dt>Phone number:</dt><dd>${h(order.shipping.phone)}</dd></div><div><dt>Shipping address:</dt><dd>${shippingAddress}</dd></div></dl></section></div>`;
  }

  function orderTimeline(order) {
    return `<section class="detail-timeline"><h2>Order updates</h2><ol>${order.timeline.slice().reverse().map((event) => `<li><span></span><div><strong>${h(event.label)}</strong><small>${h(event.time)}</small></div></li>`).join('')}</ol></section>`;
  }

  function detailActions(order) {
    const id = h(order.id);
    if (order.status === 'to_pay') return `<div class="account-detail-actions"><button class="account-button secondary" data-account-action="cancel-order" data-id="${id}">Cancel order</button><button class="account-button primary" data-go="checkout">Pay Now</button></div>`;
    if (order.status === 'shipped') return `<div class="account-detail-actions"><button class="account-button secondary" data-account-action="track" data-id="${id}">Track package</button><button class="account-button primary" data-account-action="confirm" data-id="${id}">Confirm receipt</button></div>`;
    if (order.status === 'done' || order.status === 'cancelled') return `<div class="account-detail-actions"><button class="account-button secondary" data-account-action="buy-again" data-id="${id}">Buy again</button></div>`;
    return '';
  }

  function resetReviewForm() {
    (state.reviewImages || []).forEach((image) => {
      if (image && image.url && image.url.indexOf('blob:') === 0) URL.revokeObjectURL(image.url);
    });
    state.reviewRatings = { product: 0, service: 0, shipping: 0 };
    state.reviewDescription = '';
    state.reviewImages = [];
  }

  function reviewRatingRow(label, field) {
    const score = Number(state.reviewRatings[field] || 0);
    const ratingText = score ? `<span class="review-rating-text">${REVIEW_RATING_TEXTS[score - 1]}</span>` : '';
    return `<div class="review-rating-row"><span class="review-rating-label">${label}</span><div class="review-stars" role="radiogroup" aria-label="${label}">${[1, 2, 3, 4, 5].map((value) => `<button type="button" class="${value <= score ? 'is-selected' : ''}" data-account-action="review-score" data-field="${field}" data-score="${value}" aria-label="${value} stars">&#9733;</button>`).join('')}</div>${ratingText}</div>`;
  }

  function reviewDialog(order) {
    const imageItems = (state.reviewImages || []).map((image, index) => `<div class="review-image-item"><img src="${h(image.url)}" alt="Review upload ${index + 1}"><button type="button" data-account-action="review-remove-image" data-index="${index}" aria-label="Remove image">x</button></div>`).join('');
    const remaining = Math.max(0, 6 - (state.reviewImages || []).length);
    return `<div class="account-dialog-backdrop"><section class="account-dialog review-dialog" role="dialog" aria-modal="true" aria-labelledby="review-order-title"><header class="review-dialog-header"><h2 id="review-order-title">Leave a review</h2><button class="account-dialog-close" data-account-action="dialog-close" aria-label="Close">x</button></header><div class="review-dialog-body"><section class="review-section review-rating-section"><h3>Product rating</h3>${reviewRatingRow('Product quality', 'product')}${reviewRatingRow('Service attitude', 'service')}${reviewRatingRow('Shipping service', 'shipping')}</section><section class="review-section review-description-section"><h3>Product description</h3><textarea class="review-description" data-review-description maxlength="500" placeholder="Did the product meet your expectations? Share your thoughts to help others decide!">${h(state.reviewDescription)}</textarea><div class="review-description-meta"><span>Share your experience with this order.</span><span data-review-count>${state.reviewDescription.length} / 500</span></div></section><section class="review-section review-upload-section"><h3>Upload photos</h3><p class="review-upload-tip">Max 5MB per image. Supported formats: JPG, PNG, JPEG.</p><div class="review-upload-grid">${imageItems}${remaining > 0 ? '<button type="button" class="review-upload-button" data-account-action="review-upload" aria-label="Upload photos">+</button>' : ''}</div><input class="review-file-input" data-review-files type="file" accept="image/jpeg,image/jpg,image/png" multiple></section></div><div class="account-dialog-actions review-dialog-actions"><button class="account-button secondary" data-account-action="dialog-close">Cancel</button><button class="account-button primary" data-account-action="review-submit" data-id="${h(order.id)}" data-item-index="${state.reviewItemIndex}">Submit review</button></div></section></div>`;
  }

  function orderDialogs() {
    const cancelOrder = state.cancelOrderId ? orders[state.cancelOrderId] : null;
    const reviewOrder = state.reviewOrderId && state.reviewItemIndex >= 0 ? orders[state.reviewOrderId] : null;
    if (cancelOrder) return `<div class="account-dialog-backdrop"><section class="account-dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-order-title"><button class="account-dialog-close" data-account-action="dialog-close" aria-label="Close">x</button><p class="account-eyebrow">CANCEL ORDER</p><h2 id="cancel-order-title">Cancel order #${h(cancelOrder.id)}?</h2><p>This action cannot be undone. Your payment will not be captured for this order.</p><div class="account-dialog-actions"><button class="account-button secondary" data-account-action="dialog-close">Keep order</button><button class="account-button danger" data-account-action="cancel-confirm" data-id="${h(cancelOrder.id)}">Cancel order</button></div></section></div>`;
    if (reviewOrder) return reviewDialog(reviewOrder);
    return '';
  }

  function detailHtml() {
    const order = orders[currentOrderId()] || orders.FOL20250827002;
    const items = order.items.map((item, index) => item.type === 'bundle' ? bundleDetailItem(item, order, index) : productDetailItem(item, order, index)).join('');
    return orderDetailShell(`<section class="account-live-order-detail">${orderProgress(order)}${orderInfoCards(order)}<section class="account-detail-goods-section"><h2>Items</h2><div class="account-detail-goods-list">${items}</div></section>${orderTotals(order)}${detailActions(order)}</section>${orderDialogs()}`);
  }

  function modalFrame(type) {
    const backView = state.lastAccountView || 'account-orders';
    const configs = {
      password: ['account-password-pc.png', 'account-password-mobile.jpg', 1920, 1313, 786, 1704],
      signout: ['account-signout-pc.png', 'account-signout-mobile.jpg', 1920, 1363, 786, 1704],
      addressAdd: ['account-address-add-pc.png', 'account-address-add-mobile.jpg', 1920, 1313, 786, 2080],
      addressDelete: ['account-address-delete-pc.png', 'account-address-delete-mobile.jpg', 1920, 1313, 786, 1704],
      cancelOrder: ['order-detail-pay-cancel-pc.png', 'order-detail-pay-cancel-mobile.jpg', 1920, 1363, 786, 1704],
      review: ['order-detail-review-modal-pc.png', 'order-detail-review-modal-mobile.jpg', 1920, 1518, 786, 1704]
    };
    const cfg = configs[type] || configs.signout;
    const [desktop, mobile, dw, dh, mw, mh] = cfg;
    const desktopZones = [];
    const mobileZones = [];
    const closeTo = type === 'cancelOrder' || type === 'review' ? 'order-detail' : backView;
    const closeAction = type === 'cancelOrder' || type === 'review' ? 'modal-close-detail' : 'modal-close';
    desktopZones.push({ x: 0, y: 0, w: dw, h: dh, action: 'noop', label: 'Modal background' });
    mobileZones.push({ x: 0, y: 0, w: mw, h: mh, action: 'noop', label: 'Modal background' });
    if (type === 'password') {
      desktopZones.push({ x: 1148, y: 676, w: 150, h: 48, action: 'modal-close', label: 'Cancel' }, { x: 1320, y: 676, w: 150, h: 48, action: 'save-password', label: 'Save password' }, { x: 1440, y: 420, w: 50, h: 50, action: 'modal-close', label: 'Close' });
      mobileZones.push({ x: 34, y: 67, w: 70, h: 70, action: 'modal-close', label: 'Back' }, { x: 690, y: 67, w: 70, h: 70, action: 'modal-close', label: 'Close' }, { x: 32, y: 1135, w: 720, h: 82, action: 'save-password', label: 'Continue' });
    } else if (type === 'signout') {
      desktopZones.push({ x: 1110, y: 620, w: 150, h: 46, action: 'modal-close', label: 'Cancel' }, { x: 1290, y: 620, w: 150, h: 46, action: 'signout-confirm', label: 'Sign out' }, { x: 1440, y: 430, w: 50, h: 50, action: 'modal-close', label: 'Close' });
      mobileZones.push({ x: 34, y: 68, w: 70, h: 70, action: 'modal-close', label: 'Back' }, { x: 690, y: 68, w: 70, h: 70, action: 'modal-close', label: 'Close' }, { x: 32, y: 1240, w: 340, h: 82, action: 'modal-close', label: 'Cancel' }, { x: 410, y: 1240, w: 340, h: 82, action: 'signout-confirm', label: 'Sign out' });
    } else if (type === 'addressAdd') {
      desktopZones.push({ x: 1140, y: 790, w: 150, h: 48, action: 'address-close', label: 'Cancel' }, { x: 1310, y: 790, w: 150, h: 48, action: 'address-save', label: 'Save address' }, { x: 1440, y: 295, w: 50, h: 50, action: 'address-close', label: 'Close' });
      mobileZones.push({ x: 34, y: 68, w: 70, h: 70, action: 'address-close', label: 'Back' }, { x: 690, y: 68, w: 70, h: 70, action: 'address-close', label: 'Close' }, { x: 32, y: 1540, w: 720, h: 82, action: 'address-save', label: 'Save address' });
    } else if (type === 'addressDelete') {
      desktopZones.push({ x: 1110, y: 620, w: 150, h: 46, action: 'address-close', label: 'Cancel' }, { x: 1290, y: 620, w: 150, h: 46, action: 'address-delete-confirm', label: 'Delete' }, { x: 1440, y: 430, w: 50, h: 50, action: 'address-close', label: 'Close' });
      mobileZones.push({ x: 34, y: 68, w: 70, h: 70, action: 'address-close', label: 'Back' }, { x: 690, y: 68, w: 70, h: 70, action: 'address-close', label: 'Close' }, { x: 32, y: 1240, w: 340, h: 82, action: 'address-close', label: 'Cancel' }, { x: 410, y: 1240, w: 340, h: 82, action: 'address-delete-confirm', label: 'Delete' });
    } else if (type === 'cancelOrder') {
      desktopZones.push({ x: 1110, y: 620, w: 150, h: 46, action: closeAction, id: currentOrderId(), label: 'Cancel' }, { x: 1290, y: 620, w: 150, h: 46, action: 'cancel-confirm', id: currentOrderId(), label: 'Confirm cancel' }, { x: 1440, y: 430, w: 50, h: 50, action: closeAction, id: currentOrderId(), label: 'Close' });
      mobileZones.push({ x: 34, y: 68, w: 70, h: 70, action: closeAction, id: currentOrderId(), label: 'Back' }, { x: 690, y: 68, w: 70, h: 70, action: closeAction, id: currentOrderId(), label: 'Close' }, { x: 32, y: 1240, w: 340, h: 82, action: closeAction, id: currentOrderId(), label: 'Cancel' }, { x: 410, y: 1240, w: 340, h: 82, action: 'cancel-confirm', id: currentOrderId(), label: 'Confirm cancel' });
    } else if (type === 'review') {
      desktopZones.push({ x: 1440, y: 260, w: 50, h: 50, action: closeAction, id: currentOrderId(), label: 'Close' }, { x: 1210, y: 1298, w: 170, h: 52, action: closeAction, id: currentOrderId(), label: 'Cancel' }, { x: 1400, y: 1298, w: 170, h: 52, action: 'review-submit', id: currentOrderId(), label: 'Submit review' });
      mobileZones.push({ x: 34, y: 68, w: 70, h: 70, action: closeAction, id: currentOrderId(), label: 'Back' }, { x: 690, y: 68, w: 70, h: 70, action: closeAction, id: currentOrderId(), label: 'Close' }, { x: 32, y: 1440, w: 340, h: 82, action: closeAction, id: currentOrderId(), label: 'Cancel' }, { x: 410, y: 1440, w: 340, h: 82, action: 'review-submit', id: currentOrderId(), label: 'Submit review' });
    }
    return shellFromAsset(desktop, mobile, dw, dh, mw, mh, desktopZones, mobileZones, type === 'cancelOrder' || type === 'review' ? {} : {});
  }

  function authHtml(view) {
    const isRegister = view === 'register';
    const isReset = view === 'reset-password';
    if (isReset) return resetHtml();
    const desktop = isRegister ? 'auth-register-desktop.png' : 'auth-login-desktop.png';
    const mobile = isRegister ? 'auth-register-mobile.jpg' : 'auth-login-mobile.jpg';
    const desktopZones = [
      { x: 0, y: 0, w: 1024, h: 1488, go: 'index', label: 'Close auth' },
      { x: 304, y: 236, w: 42, h: 42, go: 'index', label: 'Back' },
      { x: 655, y: 236, w: 42, h: 42, go: 'index', label: 'Close' },
      { x: 336, y: 488, w: 352, h: 44, action: 'auth-complete', label: isRegister ? 'Create account' : 'Sign in' },
      { x: 438, y: 553, w: 150, h: 28, go: 'reset-password', label: 'Forgot password' },
      { x: 336, y: 650, w: 352, h: 44, action: 'auth-complete', label: 'Sign in with Google' }
    ];
    const mobileZones = [
      { x: 32, y: 656, w: 74, h: 74, go: 'index', label: 'Back' },
      { x: 688, y: 656, w: 74, h: 74, go: 'index', label: 'Close' },
      { x: 32, y: 1190, w: 722, h: 86, action: 'auth-complete', label: isRegister ? 'Create account' : 'Sign in' },
      { x: 300, y: 1300, w: 220, h: 46, go: 'reset-password', label: 'Forgot password' },
      { x: 32, y: 1430, w: 722, h: 86, action: 'auth-complete', label: 'Sign in with Google' }
    ];
    return shellFromAsset(desktop, mobile, 1024, 1488, 786, 1704, desktopZones, mobileZones, { desktopClass: 'tablet-design auth-design' });
  }

  function resetHtml() {
    const desktopMap = ['reset-step1-desktop.png', 'reset-step2-desktop.png', 'reset-step3-desktop.png', 'reset-step4-desktop.png'];
    const mobileMap = ['reset-step1-mobile.jpg', 'reset-step2-mobile.jpg', 'reset-step3-mobile.jpg', 'reset-step4-mobile.jpg'];
    const step = Math.max(1, Math.min(4, Number(state.resetStep || 1)));
    const desktopZones = [
      { x: 0, y: 0, w: 1024, h: 1263, go: 'index', label: 'Close reset password' },
      { x: 304, y: 236, w: 42, h: 42, go: 'login', label: 'Back to login' },
      { x: 655, y: 236, w: 42, h: 42, go: 'index', label: 'Close' },
      { x: 336, y: 515, w: 352, h: 44, action: step === 4 ? 'auth-complete' : 'reset-next', label: 'Continue reset' }
    ];
    const mobileZones = [
      { x: 32, y: 656, w: 74, h: 74, go: 'login', label: 'Back to login' },
      { x: 688, y: 656, w: 74, h: 74, go: 'index', label: 'Close' },
      { x: 32, y: 1040, w: 722, h: 86, action: step === 4 ? 'auth-complete' : 'reset-next', label: 'Continue reset' }
    ];
    return shellFromAsset(desktopMap[step - 1], mobileMap[step - 1], 1024, 1263, 786, 1704, desktopZones, mobileZones, { desktopClass: 'tablet-design auth-design' });
  }

  function renderView(view) {
    if (view === 'index') return entryHtml();
    if (view === 'account-orders') return ordersHtml();
    if (view === 'account-collections') return collectionsHtml();
    if (view === 'account-address') return addressHtml();
    if (view === 'order-detail') return detailHtml();
    if (view === 'login' || view === 'register' || view === 'reset-password') return authHtml(view);
    if (view === 'account-password') return accountPasswordHtml();
    if (view === 'account-signout') return accountSignoutHtml();
    if (view === 'account-address-add') { state.addressDialog = { mode: 'create', id: '' }; return addressHtml(); }
    if (view === 'account-address-delete') { state.addressDialog = { mode: 'delete', id: addressItems[0] ? addressItems[0].id : '' }; return addressHtml(); }
    if (view === 'order-cancel') return modalFrame('cancelOrder');
    if (view === 'order-review-modal') {
      const order = orders[currentOrderId()];
      state.reviewOrderId = order ? order.id : '';
      state.reviewItemIndex = order ? order.items.findIndex((item) => !item.reviewed) : -1;
      return detailHtml();
    }
    return null;
  }

  function handleAction(action, target) {
    const id = target.dataset.id;
    if (action === 'noop') return;
    if (action === 'mobile-nav-toggle') { state.mobileNavOpen = !state.mobileNavOpen; if (window.render) window.render(); return; }
    if (action === 'mobile-nav-close') { state.mobileNavOpen = false; if (window.render) window.render(); return; }
    if (action === 'mobile-nav-go') { state.mobileNavOpen = false; setView(target.dataset.go || 'index'); return; }
    if (action === 'filter') {
      state.orderFilter = target.dataset.filter || 'all';
      if (window.render) window.render();
      return;
    }
    if (action === 'detail') { setOrderDetail(id); return; }
    if (action === 'password') { setView('account-password'); return; }
    if (action === 'signout') { setView('account-signout'); return; }
    if (action === 'signout-confirm') { toast('Signed out'); setView('index'); return; }
    if (action === 'modal-close') { resetPasswordForm(); setView(state.lastAccountView || 'account-orders'); return; }
    if (action === 'save-password') {
      const form = state.passwordForm;
      if (!form.current || !form.next || !form.confirm) { toast('Complete all password fields'); return; }
      if (form.next.length < 8) { toast('Use at least 8 characters for your new password'); return; }
      if (form.next !== form.confirm) { toast('New passwords do not match'); return; }
      resetPasswordForm();
      toast('Password updated');
      setView(state.lastAccountView || 'account-orders');
      return;
    }
    if (action === 'address-add') { state.addressDialog = { mode: 'create', id: '' }; if (window.render) window.render(); return; }
    if (action === 'address-edit') { state.addressDialog = { mode: 'edit', id }; if (window.render) window.render(); return; }
    if (action === 'address-delete') { state.addressDialog = { mode: 'delete', id }; if (window.render) window.render(); return; }
    if (action === 'address-close') { state.addressDialog = null; if (window.render) window.render(); return; }
    if (action === 'address-save') {
      const dialog = state.addressDialog;
      const read = (name) => String(document.querySelector(`[data-address-field="${name}"]`)?.value || '').trim();
      const defaultField = document.querySelector('[data-address-field="default"]');
      const isDefault = defaultField instanceof HTMLInputElement && defaultField.checked;
      const name = read('name');
      if (!name) { toast('Enter a full name'); return; }
      const city = read('city');
      const region = read('region');
      const next = { id: dialog && dialog.id ? dialog.id : `ADDR-${Date.now()}`, name, phone: read('phone'), email: read('email'), lines: [read('address1'), [city, region].filter(Boolean).join(', '), read('country') || 'United States'].filter(Boolean), isDefault };
      if (isDefault) addressItems.forEach((candidate) => { candidate.isDefault = false; });
      const index = addressItems.findIndex((candidate) => candidate.id === next.id);
      if (index >= 0) addressItems.splice(index, 1, next);
      else addressItems.push(next);
      state.addressDialog = null;
      toast(index >= 0 ? 'Address updated' : 'Address added');
      return;
    }
    if (action === 'address-delete-confirm') {
      const dialog = state.addressDialog;
      const index = addressItems.findIndex((candidate) => candidate.id === (dialog && dialog.id));
      if (index >= 0) {
        const wasDefault = addressItems[index].isDefault;
        addressItems.splice(index, 1);
        if (wasDefault && addressItems[0]) addressItems[0].isDefault = true;
      }
      state.addressDialog = null;
      toast('Address deleted');
      return;
    }
    if (action === 'collection-remove') { state.collectionRemoveId = id; if (window.render) window.render(); return; }
    if (action === 'collection-remove-cancel') { state.collectionRemoveId = ''; if (window.render) window.render(); return; }
    if (action === 'collection-remove-confirm') {
      const index = collectionItems.findIndex((candidate) => candidate.id === state.collectionRemoveId);
      if (index >= 0) collectionItems.splice(index, 1);
      state.collectionRemoveId = '';
      toast('Removed from collections');
      return;
    }
    if (action === 'cancel-order') {
      state.cancelOrderId = id || currentOrderId();
      state.reviewOrderId = '';
      state.reviewItemIndex = -1;
      if (window.render) window.render();
      return;
    }
    if (action === 'dialog-close') {
      state.cancelOrderId = '';
      state.reviewOrderId = '';
      state.reviewItemIndex = -1;
      resetReviewForm();
      if (window.render) window.render();
      return;
    }
    if (action === 'cancel-confirm') {
      const order = orders[id || state.cancelOrderId];
      if (order) {
        order.status = 'cancelled';
        order.paymentStatus = order.paidAmount ? 'Refund pending' : 'Cancelled';
        order.timeline.push({ label: 'Order cancelled', time: 'Just now' });
      }
      state.cancelOrderId = '';
      toast('Order cancelled');
      return;
    }
    if (action === 'modal-close-detail') { setOrderDetail(id || currentOrderId()); return; }
    if (action === 'review-open' || action === 'review-modal') {
      const order = orders[id || currentOrderId()];
      const requestedIndex = Number(target.dataset.itemIndex);
      const itemIndex = action === 'review-open' && Number.isInteger(requestedIndex)
        ? requestedIndex
        : order ? order.items.findIndex((item) => !item.reviewed) : -1;
      if (!order || itemIndex < 0 || !order.items[itemIndex] || order.items[itemIndex].reviewed) return;
      state.reviewOrderId = order.id;
      state.reviewItemIndex = itemIndex;
      state.cancelOrderId = '';
      resetReviewForm();
      if (window.render) window.render();
      return;
    }
    if (action === 'review-score') {
      const field = target.dataset.field;
      if (!['product', 'service', 'shipping'].includes(field)) return;
      state.reviewRatings[field] = Math.max(1, Math.min(5, Number(target.dataset.score || 5)));
      if (window.render) window.render();
      return;
    }
    if (action === 'review-upload') {
      document.querySelector('.review-file-input')?.click();
      return;
    }
    if (action === 'review-remove-image') {
      const index = Number(target.dataset.index);
      const image = state.reviewImages[index];
      if (image && image.url && image.url.indexOf('blob:') === 0) URL.revokeObjectURL(image.url);
      state.reviewImages = state.reviewImages.filter((_, imageIndex) => imageIndex !== index);
      if (window.render) window.render();
      return;
    }
    if (action === 'review-submit') {
      const order = orders[id || state.reviewOrderId];
      const itemIndex = Number(target.dataset.itemIndex);
      const ratings = state.reviewRatings;
      if (!ratings.product || !ratings.service || !ratings.shipping || !state.reviewDescription.trim()) {
        toast('Complete all ratings and add a review');
        return;
      }
      if (order && Number.isInteger(itemIndex) && order.items[itemIndex]) {
        const item = order.items[itemIndex];
        item.reviewed = true;
        order.timeline.push({ label: `Review submitted for ${item.title}`, time: 'Just now' });
        if (order.items.every((candidate) => candidate.reviewed)) {
          order.status = 'done';
          order.timeline.push({ label: 'All item reviews submitted', time: 'Just now' });
        }
      }
      state.reviewOrderId = '';
      state.reviewItemIndex = -1;
      resetReviewForm();
      toast('Review submitted');
      return;
    }
    if (action === 'track') {
      const order = orders[id || currentOrderId()];
      if (!order || !order.tracking) { toast('Tracking is not available yet'); return; }
      state.trackOrderId = state.trackOrderId === order.id ? '' : order.id;
      if (window.render) window.render();
      return;
    }
    if (action === 'confirm') {
      const order = orders[id || currentOrderId()];
      if (order) {
        order.status = 'review';
        if (order.tracking) order.tracking.stage = 'Delivered just now';
        order.timeline.push({ label: 'Delivery received', time: 'Just now' });
      }
      state.trackOrderId = '';
      toast('Receipt confirmed');
      return;
    }
    if (action === 'buy-again') { setView('cart-page'); return; }
    if (action === 'auth-complete') { toast('Signed in'); setView('account-orders'); return; }
    if (action === 'reset-next') { state.resetStep = Math.min(4, Number(state.resetStep || 1) + 1); if (window.render) window.render(); }
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('[data-account-action]') : null;
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    handleAction(target.dataset.accountAction, target);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !state.mobileNavOpen) return;
    state.mobileNavOpen = false;
    if (window.render) window.render();
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.matches('[data-password-field]')) {
      const field = target.dataset.passwordField;
      if (field === 'current' || field === 'next' || field === 'confirm') state.passwordForm[field] = target.value;
      return;
    }
    if (target instanceof HTMLTextAreaElement && target.matches('[data-review-description]')) {
      state.reviewDescription = target.value.slice(0, 500);
      const count = target.closest('.review-description-section')?.querySelector('[data-review-count]');
      if (count) count.textContent = `${state.reviewDescription.length} / 500`;
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || !target.matches('[data-review-files]')) return;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const remaining = Math.max(0, 6 - state.reviewImages.length);
    const files = Array.from(target.files || []).slice(0, remaining);
    let rejected = false;
    files.forEach((file) => {
      if (!allowedTypes.includes(file.type.toLowerCase()) || file.size > 5 * 1024 * 1024) {
        rejected = true;
        return;
      }
      state.reviewImages.push({ url: URL.createObjectURL(file) });
    });
    target.value = '';
    if (rejected) toast('Use JPG or PNG images up to 5MB');
    if (window.render) window.render();
  });

  window.AccountPrototype = { renderView, renderStorefrontShell: storefrontShell };
})();
