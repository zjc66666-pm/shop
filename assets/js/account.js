(function () {
  const ASSET = 'assets/images/account/';

  const state = {
    toast: '',
    resetStep: 1,
    lastAccountView: 'account-orders'
  };

  const orders = {
    FOL20250827001: { status: 'pay' },
    FOL20250827002: { status: 'ship' },
    FOL20250827003: { status: 'shipped' },
    FOL20250827004: { status: 'review' },
    FOL20250827005: { status: 'done' }
  };

  const detailAsset = {
    pay: ['order-detail-pay-pc.png', 'order-detail-pay-mobile.jpg', 1920, 1797, 786, 5030],
    ship: ['order-detail-ship-pc.png', 'order-detail-ship-mobile.jpg', 1920, 1410, 786, 3498],
    shipped: ['order-detail-shipped-pc.png', 'order-detail-shipped-mobile.jpg', 1920, 1518, 786, 3994],
    review: ['order-detail-review-pc.png', 'order-detail-review-mobile.jpg', 1920, 1518, 786, 4498],
    done: ['order-detail-done-desktop.png', 'order-detail-done-mobile.jpg', 1024, 1529, 786, 3698]
  };

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
      { x: 270, y: 536, w: 160, h: 42, go: 'account-vendor', label: 'Become a vendor' },
      { x: 270, y: 608, w: 145, h: 42, action: 'signout', label: 'Sign out' }
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

  function ordersHtml() {
    state.lastAccountView = 'account-orders';
    const shared = sidebarZones('account-orders');
    const desktopZones = shared.pc.concat([
      { x: 532, y: 325, w: 540, h: 46, action: 'detail', id: 'FOL20250827001', label: 'Open to pay order' },
      { x: 942, y: 322, w: 130, h: 34, action: 'cancel-order', id: 'FOL20250827001', label: 'Cancel order' },
      { x: 1078, y: 322, w: 130, h: 34, action: 'detail', id: 'FOL20250827001', label: 'View details' },
      { x: 1216, y: 322, w: 130, h: 34, go: 'checkout', label: 'Pay now' },
      { x: 1212, y: 630, w: 135, h: 38, action: 'detail', id: 'FOL20250827002', label: 'View to ship details' },
      { x: 942, y: 872, w: 130, h: 34, action: 'detail', id: 'FOL20250827003', label: 'View shipped details' },
      { x: 1078, y: 872, w: 130, h: 34, action: 'track', id: 'FOL20250827003', label: 'Track package' },
      { x: 1216, y: 872, w: 130, h: 34, action: 'confirm', id: 'FOL20250827003', label: 'Confirm receipt' },
      { x: 1078, y: 1096, w: 130, h: 34, action: 'detail', id: 'FOL20250827004', label: 'View review details' },
      { x: 1216, y: 1096, w: 130, h: 34, action: 'detail', id: 'FOL20250827004', label: 'Leave a review' },
      { x: 1216, y: 1788, w: 130, h: 34, action: 'detail', id: 'FOL20250827005', label: 'View done details' },
      { x: 760, y: 2682, w: 390, h: 48, action: 'noop', label: 'Pagination' }
    ]);
    const mobileZones = shared.mobile.concat([
      { x: 22, y: 650, w: 180, h: 54, action: 'cancel-order', id: 'FOL20250827001', label: 'Cancel order' },
      { x: 222, y: 650, w: 190, h: 54, action: 'detail', id: 'FOL20250827001', label: 'View details' },
      { x: 436, y: 650, w: 205, h: 54, go: 'checkout', label: 'Pay Now' },
      { x: 30, y: 1175, w: 720, h: 64, action: 'detail', id: 'FOL20250827002', label: 'View to ship details' },
      { x: 30, y: 1550, w: 190, h: 52, action: 'detail', id: 'FOL20250827003', label: 'View shipped details' },
      { x: 305, y: 1550, w: 190, h: 52, action: 'track', id: 'FOL20250827003', label: 'Track package' },
      { x: 515, y: 1550, w: 220, h: 52, action: 'confirm', id: 'FOL20250827003', label: 'Confirm receipt' },
      { x: 30, y: 1982, w: 320, h: 56, action: 'detail', id: 'FOL20250827004', label: 'View review details' },
      { x: 410, y: 1982, w: 330, h: 56, action: 'detail', id: 'FOL20250827004', label: 'Leave a review' },
      { x: 30, y: 2932, w: 720, h: 64, action: 'detail', id: 'FOL20250827005', label: 'View done details' }
    ]);
    return shellFromAsset('account-orders-pc.png', 'account-orders-mobile.jpg', 1920, 2809, 786, 6712, desktopZones, mobileZones);
  }

  function collectionsHtml() {
    state.lastAccountView = 'account-collections';
    const shared = sidebarZones('account-collections');
    const desktopZones = shared.pc.concat([
      { x: 1645, y: 262, w: 220, h: 50, go: 'cart-page', label: 'View details' },
      { x: 1690, y: 325, w: 120, h: 34, action: 'collection-remove', label: 'Remove collection item' },
      { x: 1645, y: 438, w: 220, h: 50, go: 'cart-page', label: 'View details' },
      { x: 1690, y: 502, w: 120, h: 34, action: 'collection-remove', label: 'Remove collection item' },
      { x: 1645, y: 616, w: 220, h: 50, go: 'cart-page', label: 'View details' },
      { x: 1690, y: 680, w: 120, h: 34, action: 'collection-remove', label: 'Remove collection item' },
      { x: 1645, y: 793, w: 220, h: 50, go: 'cart-page', label: 'View details' },
      { x: 1690, y: 858, w: 120, h: 34, action: 'collection-remove', label: 'Remove collection item' }
    ]);
    const mobileZones = shared.mobile.concat([
      { x: 24, y: 360, w: 740, h: 420, go: 'cart-page', label: 'View details' },
      { x: 24, y: 800, w: 740, h: 420, go: 'cart-page', label: 'View details' },
      { x: 24, y: 1240, w: 740, h: 420, go: 'cart-page', label: 'View details' },
      { x: 24, y: 1680, w: 740, h: 420, go: 'cart-page', label: 'View details' }
    ]);
    return shellFromAsset('account-collections-pc.png', 'account-collections-mobile.jpg', 1920, 1444, 786, 3902, desktopZones, mobileZones);
  }

  function addressHtml() {
    state.lastAccountView = 'account-address';
    const shared = sidebarZones('account-address');
    const desktopZones = shared.pc.concat([
      { x: 632, y: 252, w: 430, h: 170, action: 'address-add', label: 'Add new address' },
      { x: 1855, y: 378, w: 42, h: 42, action: 'address-delete', label: 'Delete address' },
      { x: 1800, y: 378, w: 42, h: 42, action: 'address-add', label: 'Edit address' }
    ]);
    const mobileZones = shared.mobile.concat([
      { x: 32, y: 300, w: 720, h: 82, action: 'address-add', label: 'Add new address' },
      { x: 30, y: 450, w: 720, h: 210, action: 'address-delete', label: 'Open address delete modal' }
    ]);
    return shellFromAsset('account-address-pc.png', 'account-address-mobile.jpg', 1920, 1313, 786, 3994, desktopZones, mobileZones);
  }

  function vendorHtml() {
    state.lastAccountView = 'account-vendor';
    return `<section class="account-entry"><p class="entry-label">ACCOUNT</p><h1>Become a vendor</h1><p>This entry is shown in the account sidebar design. The vendor application flow is not part of this Neurix user-end prototype yet.</p><div class="entry-grid"><button class="entry-card" data-go="account-orders"><strong>Back to orders</strong><span>Return to the account center.</span></button></div></section>`;
  }

  function detailHtml() {
    const orderId = currentOrderId();
    const status = orders[orderId]?.status || 'ship';
    const asset = detailAsset[status] || detailAsset.ship;
    const [desktop, mobile, dw, dh, mw, mh] = asset;
    const desktopZones = [
      { x: 330, y: 88, w: 170, h: 38, go: 'account-orders', label: 'Back to orders' },
      { x: 580, y: 118, w: 760, h: 120, action: 'noop', label: 'Order progress' }
    ];
    const mobileZones = [
      { x: 26, y: 75, w: 74, h: 74, go: 'account-orders', label: 'Back to orders' },
      { x: 20, y: 150, w: 746, h: 190, action: 'noop', label: 'Order progress' }
    ];
    if (status === 'pay') {
      desktopZones.push({ x: 1352, y: 1268, w: 154, h: 48, action: 'cancel-order', id: orderId, label: 'Cancel order' }, { x: 1522, y: 1268, w: 154, h: 48, go: 'checkout', label: 'Pay Now' });
      mobileZones.push({ x: 24, y: 3000, w: 350, h: 70, action: 'cancel-order', id: orderId, label: 'Cancel order' }, { x: 400, y: 3000, w: 350, h: 70, go: 'checkout', label: 'Pay Now' });
    }
    if (status === 'shipped') {
      desktopZones.push({ x: 1475, y: 1000, w: 165, h: 52, action: 'track', id: orderId, label: 'Track package' }, { x: 1660, y: 1000, w: 165, h: 52, action: 'confirm', id: orderId, label: 'Confirm receipt' });
      mobileZones.push({ x: 28, y: 2620, w: 340, h: 70, action: 'track', id: orderId, label: 'Track package' }, { x: 398, y: 2620, w: 340, h: 70, action: 'confirm', id: orderId, label: 'Confirm receipt' });
    }
    if (status === 'review') {
      desktopZones.push({ x: 1660, y: 866, w: 170, h: 54, action: 'review-modal', id: orderId, label: 'Leave a review' }, { x: 1475, y: 1000, w: 165, h: 52, action: 'track', id: orderId, label: 'Track package' }, { x: 1660, y: 1000, w: 165, h: 52, go: 'cart-page', label: 'Buy again' });
      mobileZones.push({ x: 30, y: 2480, w: 720, h: 70, action: 'review-modal', id: orderId, label: 'Leave a review' });
    }
    if (status === 'done') {
      desktopZones.push({ x: 650, y: 1160, w: 160, h: 46, go: 'cart-page', label: 'Buy again' });
      mobileZones.push({ x: 30, y: 2440, w: 720, h: 70, go: 'cart-page', label: 'Buy again' });
    }
    const options = status === 'done' ? { desktopClass: 'tablet-design' } : {};
    return shellFromAsset(desktop, mobile, dw, dh, mw, mh, desktopZones, mobileZones, options);
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
    if (view === 'account-vendor') return vendorHtml();
    if (view === 'order-detail') return detailHtml();
    if (view === 'login' || view === 'register' || view === 'reset-password') return authHtml(view);
    if (view === 'account-password') return modalFrame('password');
    if (view === 'account-signout') return modalFrame('signout');
    if (view === 'account-address-add') return modalFrame('addressAdd');
    if (view === 'account-address-delete') return modalFrame('addressDelete');
    if (view === 'order-cancel') return modalFrame('cancelOrder');
    if (view === 'order-review-modal') return modalFrame('review');
    return null;
  }

  function handleAction(action, target) {
    const id = target.dataset.id;
    if (action === 'noop') return;
    if (action === 'detail') { setOrderDetail(id); return; }
    if (action === 'password') { setView('account-password'); return; }
    if (action === 'signout') { setView('account-signout'); return; }
    if (action === 'signout-confirm') { toast('Signed out'); setView('index'); return; }
    if (action === 'modal-close') { setView(state.lastAccountView || 'account-orders'); return; }
    if (action === 'save-password') { toast('Password updated'); setView(state.lastAccountView || 'account-orders'); return; }
    if (action === 'address-add') { state.lastAccountView = 'account-address'; setView('account-address-add'); return; }
    if (action === 'address-delete') { state.lastAccountView = 'account-address'; setView('account-address-delete'); return; }
    if (action === 'address-close') { setView('account-address'); return; }
    if (action === 'address-save') { toast('Address saved'); setView('account-address'); return; }
    if (action === 'address-delete-confirm') { toast('Address deleted'); setView('account-address'); return; }
    if (action === 'collection-remove') { toast('Removed from collections'); return; }
    if (action === 'cancel-order') { setView('order-cancel', { id: id || currentOrderId() }); return; }
    if (action === 'cancel-confirm') { toast('Order cancelled'); setOrderDetail(id || 'FOL20250827001'); return; }
    if (action === 'modal-close-detail') { setOrderDetail(id || currentOrderId()); return; }
    if (action === 'review-modal') { setView('order-review-modal', { id: id || currentOrderId() }); return; }
    if (action === 'review-submit') { toast('Review submitted'); setOrderDetail(id || 'FOL20250827004'); return; }
    if (action === 'track') { toast('Tracking package'); return; }
    if (action === 'confirm') { toast('Receipt confirmed'); setOrderDetail('FOL20250827005'); return; }
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

  window.AccountPrototype = { renderView };
})();
