/* =========================================================
   BistroCraft - script.js
   ========================================================= */

const initialMenuItems = [
  { id: 'm-1', title: 'Paneer Butter Masala', category: 'Mains', diet: 'Veg', price: 280, inStock: true, tag: 'Popular', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', desc: 'Soft cottage cheese cooked in rich tomato and butter gravy.' },
  { id: 'm-2', title: 'Chicken Biryani (Hyderabadi)', category: 'Mains', diet: 'Non-Veg', price: 340, inStock: true, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', desc: 'Aromatic basmati rice cooked with juicy marinated chicken.' },
  { id: 'm-3', title: 'Crispy Veg Kurkure Momos', category: 'Starters', diet: 'Veg', price: 160, inStock: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', desc: 'Crispy fried vegetable dumplings served with spicy chutney.' },
  { id: 'm-4', title: 'Chicken Malai Tikka', category: 'Starters', diet: 'Non-Veg', price: 290, inStock: true, image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', desc: 'Tender chicken pieces marinated in cream and mild spices.' },
  { id: 'm-5', title: 'Gulab Jamun (2 Pcs)', category: 'Desserts', diet: 'Veg', price: 90, inStock: true, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', desc: 'Soft warm milk dumplings soaked in cardamom sugar syrup.' },
  { id: 'm-6', title: 'Masala Cold Coffee with Ice Cream', category: 'Beverages', diet: 'Veg', price: 120, inStock: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', desc: 'Rich whipped cold coffee topped with vanilla ice cream.' }
];

const DEFAULT_SETTINGS = { restaurantName: 'BistroCraft Family Restaurant', ownerPhone: '918376891847', gstRate: 5.0, maxGuests: 15 };
const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];
const CAT_KEYS = { All: 'catAll', Starters: 'catStarters', Mains: 'catMains', Desserts: 'catDesserts', Beverages: 'catBeverages' };

const translations = {
  en: {
    tagline: 'Restaurant & Cafe', navMenu: 'Digital Menu', navBooking: 'Table Booking', navAdmin: 'Owner Panel', navSettings: 'Settings',
    staffLogin: 'Staff Login', staffLogout: 'Logout',
    heroBadge: 'Fresh & Delicious Food', heroTitle: 'Swad Aisa Jo Dil Ko Bhaye!',
    heroDesc: 'Explore our digital menu, order takeaway, or reserve a table for family and friends in seconds.',
    ctaMenu: 'View Menu', ctaBook: 'Book a Table',
    stat1: 'Veg & Non-Veg', stat1s: 'Both options', stat2: 'Takeaway', stat2s: 'Order on WhatsApp', stat3: 'Reservations', stat3s: 'Instant requests',
    menuEyebrow: 'What we serve', menuTitle: 'Our Menu', searchPh: 'Search dishes...',
    catAll: 'All Dishes', catStarters: 'Starters', catMains: 'Main Course', catDesserts: 'Desserts', catBeverages: 'Beverages',
    dietAll: 'All', dietVeg: 'Veg 🟢', dietNonVeg: 'Non-Veg 🔴',
    bookBadge: 'Reserve Your Dining Table', bookTitle: 'Book A Table', bookDesc: 'Send your booking request instantly via WhatsApp.',
    labelName: 'Full Name *', labelPhone: 'Phone / WhatsApp Number *', labelEmail: 'Email Address (Optional)', labelDate: 'Date *',
    labelTime: 'Time Slot *', labelGuests: 'Number of Guests *', labelNotes: 'Special Requests / Notes', notesPh: 'Birthday / Window Seat',
    btnBook: 'Request Reservation via WhatsApp', bookHint: 'Your table is confirmed once the restaurant replies on WhatsApp.',
    cartTitle: 'Takeaway Order Cart', labelCustomerName: 'Your Name *', labelCustomerPhone: 'WhatsApp Phone Number *', labelPayment: 'Payment Method',
    labelNote: 'Note (optional)', cartNotePh: 'Less spicy, extra chutney…', subtotal: 'Subtotal', total: 'Total Amount',
    btnCheckout: 'Send Order via WhatsApp', clearCart: 'Clear cart',
    emptyCart: 'Your cart is empty.', emptyCartSub: 'Add something delicious from the menu.',
    noDishes: 'No dishes found. Try a different search or filter.', addToCart: 'Add to Takeaway Cart', unavailable: 'Currently Unavailable', outOfStock: 'Out of Stock'
  },
  hi: {
    tagline: 'रेस्टोरेंट और कैफे', navMenu: 'डिजिटल मेनू', navBooking: 'टेबल बुकिंग', navAdmin: 'ओनर पैनल', navSettings: 'सेटिंग्स',
    staffLogin: 'स्टाफ लॉगिन', staffLogout: 'लॉगआउट',
    heroBadge: 'ताज़ा और स्वादिष्ट खाना', heroTitle: 'स्वाद ऐसा जो दिल को भाए!',
    heroDesc: 'हमारा डिजिटल मेनू देखें, टेकअवे ऑर्डर करें या परिवार और दोस्तों के लिए टेबल बुक करें।',
    ctaMenu: 'मेनू देखें', ctaBook: 'टेबल बुक करें',
    stat1: 'वेज और नॉन-वेज', stat1s: 'दोनों विकल्प', stat2: 'टेकअवे', stat2s: 'व्हाट्सएप पर ऑर्डर', stat3: 'रिज़र्वेशन', stat3s: 'तुरंत रिक्वेस्ट',
    menuEyebrow: 'हमारे व्यंजन', menuTitle: 'हमारा मेनू', searchPh: 'व्यंजन खोजें...',
    catAll: 'सभी व्यंजन', catStarters: 'स्टार्टर्स', catMains: 'मेन कोर्स', catDesserts: 'मिठाई / डेजर्ट', catBeverages: 'पेय पदार्थ',
    dietAll: 'सभी', dietVeg: 'वेज 🟢', dietNonVeg: 'नॉन-वेज 🔴',
    bookBadge: 'अपनी टेबल बुक करें', bookTitle: 'टेबल बुकिंग', bookDesc: 'व्हाट्सएप के जरिए तुरंत बुकिंग रिक्वेस्ट भेजें।',
    labelName: 'पूरा नाम *', labelPhone: 'फोन / व्हाट्सएप नंबर *', labelEmail: 'ईमेल पता (वैकल्पिक)', labelDate: 'तारीख *',
    labelTime: 'समय *', labelGuests: 'लोगों की संख्या *', labelNotes: 'विशेष अनुरोध / नोट्स', notesPh: 'जन्मदिन / खिड़की के पास सीट',
    btnBook: 'व्हाट्सएप पर बुकिंग रिक्वेस्ट भेजें', bookHint: 'रेस्टोरेंट के व्हाट्सएप पर जवाब देने के बाद आपकी टेबल कन्फर्म होगी।',
    cartTitle: 'टेकअवे ऑर्डर कार्ट', labelCustomerName: 'आपका नाम *', labelCustomerPhone: 'व्हाट्सएप फोन नंबर *', labelPayment: 'भुगतान का तरीका',
    labelNote: 'नोट (वैकल्पिक)', cartNotePh: 'कम मसालेदार, एक्स्ट्रा चटनी…', subtotal: 'सबटोटल', total: 'कुल राशि',
    btnCheckout: 'व्हाट्सएप पर ऑर्डर भेजें', clearCart: 'कार्ट खाली करें',
    emptyCart: 'आपका कार्ट खाली है।', emptyCartSub: 'मेनू से कुछ स्वादिष्ट जोड़ें।',
    noDishes: 'कोई व्यंजन नहीं मिला। दूसरा सर्च या फ़िल्टर आज़माएं।', addToCart: 'कार्ट में जोड़ें', unavailable: 'अभी उपलब्ध नहीं', outOfStock: 'स्टॉक खत्म'
  }
};

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = (u) => { try { const x = new URL(u); return ['http:', 'https:'].includes(x.protocol) ? x.href : ''; } catch { return ''; } };
const rupee = (n) => `₹${Math.round(n)}`;
const store = {
  get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};
const t = (k) => (translations[currentLang] && translations[currentLang][k]) || translations.en[k] || k;
const normPhone = (p) => { const d = String(p).replace(/\D/g, ''); return d.length === 10 ? '91' + d : d; };
const validPhone = (p) => /^\+?[0-9\s()-]{8,}$/.test(p.trim()) && p.replace(/\D/g, '').length >= 10;

/* ---------- State ---------- */
let appSettings = { ...DEFAULT_SETTINGS, ...store.get('bistro_settings', {}) };
let menuItems = store.get('bistro_menu', initialMenuItems);
let reservationsList = store.get('bistro_bookings', []);
let cart = store.get('bistro_cart', []);
let currentCategory = 'All';
let currentDiet = 'All';
let currentLang = store.get('bistro_lang', 'en');
let isLoggedIn = sessionStorage.getItem('bistro_session') === '1';
let currentMode = 'customer';
let lastFocus = null;

const saveMenu = () => store.set('bistro_menu', menuItems);
const saveBookings = () => store.set('bistro_bookings', reservationsList);
const saveCart = () => store.set('bistro_cart', cart);
const saveSettings = () => store.set('bistro_settings', appSettings);

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  reconcileCart();
  initTheme();
  applyLanguage();
  applySettingsUI();
  setLoggedIn(isLoggedIn);
  initBookingDate();
  renderFilters();
  renderCustomerMenu();
  renderAdminTable();
  renderAdminBookings();
  renderAdminStats();
  updateCartUI();
  bindEvents();
  initReveal();
  $('footerYear').textContent = new Date().getFullYear();
});

/* ---------- Theme ---------- */
function initTheme() {
  const saved = store.get('bistro_theme', null);
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight ? 'light' : 'dark'));
}
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  $('themeIcon').className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#030712' : '#fdfbf7';
}
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  store.set('bistro_theme', next);
}

/* ---------- Language ---------- */
function applyLanguage() {
  document.documentElement.lang = currentLang;
  $('langLabel').textContent = currentLang === 'en' ? 'हिंदी' : 'English';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (el.id === 'loginBtnText') return;
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  $('loginBtnText').textContent = t(isLoggedIn ? 'staffLogout' : 'staffLogin');
  renderFilters();
  renderCustomerMenu();
  updateCartUI();
}
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  store.set('bistro_lang', currentLang);
  applyLanguage();
}

/* ---------- Settings ---------- */
function applySettingsUI() {
  $('cartGstPercent').textContent = appSettings.gstRate;
  $('settingRestName').value = appSettings.restaurantName;
  $('settingOwnerPhone').value = appSettings.ownerPhone;
  $('settingGstRate').value = appSettings.gstRate;
  $('settingMaxGuests').value = appSettings.maxGuests;
  $('footerRestName').textContent = appSettings.restaurantName;
  $('bookGuests').max = appSettings.maxGuests;
  document.title = `${appSettings.restaurantName} | Fresh Food & Dining`;
}

function handleSettingsSave(e) {
  e.preventDefault();
  const name = $('settingRestName').value.trim();
  const phone = $('settingOwnerPhone').value.replace(/\D/g, '');
  const gst = parseFloat($('settingGstRate').value);
  const maxG = parseInt($('settingMaxGuests').value, 10);
  if (!name) return showToast('Restaurant name is required', 'error');
  if (phone.length < 10) return showToast('Enter a valid WhatsApp number with country code', 'error');
  if (Number.isNaN(gst) || gst < 0 || gst > 28) return showToast('GST must be between 0 and 28', 'error');
  if (Number.isNaN(maxG) || maxG < 1) return showToast('Enter a valid guest limit', 'error');
  appSettings = { restaurantName: name, ownerPhone: phone, gstRate: gst, maxGuests: maxG };
  saveSettings();
  applySettingsUI();
  updateCartUI();
  showToast('Settings updated!', 'success');
}

/* ---------- Navigation ---------- */
function switchMode(mode) {
  if ((mode === 'admin' || mode === 'settings') && !isLoggedIn) { openAuth(); return; }
  currentMode = mode;
  $('customerView').classList.toggle('hidden', mode !== 'customer');
  $('adminView').classList.toggle('hidden', mode !== 'admin');
  $('settingsView').classList.toggle('hidden', mode !== 'settings');
  $('nav-menu').classList.toggle('active', mode === 'customer');
  $('nav-admin').classList.toggle('active', mode === 'admin');
  $('nav-settings').classList.toggle('active', mode === 'settings');
  window.scrollTo({ top: 0 });
  initReveal();
}
function scrollToSection(id) { const el = $(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
function closeMobileNav() {
  $('mainNav').classList.remove('open');
  $('menuToggle').setAttribute('aria-expanded', 'false');
  $('menuToggle').querySelector('i').className = 'fa-solid fa-bars';
}

/* ---------- Menu (customer) ---------- */
function renderFilters() {
  $('categoryFilterGroup').innerHTML = CATEGORIES.map((c) =>
    `<button class="cat-btn ${c === currentCategory ? 'active' : ''}" data-cat="${c}" role="tab" aria-selected="${c === currentCategory}">${esc(t(CAT_KEYS[c]))}</button>`
  ).join('');
}

function renderCustomerMenu() {
  const grid = $('customerMenuGrid');
  const q = ($('menuSearchInput').value || '').trim().toLowerCase();

  const items = menuItems.filter((i) =>
    (currentCategory === 'All' || i.category === currentCategory) &&
    (currentDiet === 'All' || i.diet === currentDiet) &&
    (!q || `${i.title} ${i.desc}`.toLowerCase().includes(q))
  );

  if (!items.length) {
    grid.innerHTML = `<div class="empty"><i class="fa-solid fa-bowl-food"></i>${esc(t('noDishes'))}</div>`;
    return;
  }

  grid.innerHTML = items.map((item, idx) => {
    const veg = item.diet === 'Veg';
    const img = safeUrl(item.image);
    return `
    <article class="menu-card ${item.inStock ? '' : 'soldout'}" style="animation-delay:${Math.min(idx, 8) * 55}ms">
      <div class="card-media">
        ${img ? `<img src="${esc(img)}" alt="${esc(item.title)}" loading="lazy" onerror="this.style.display='none'">` : ''}
        <div class="card-badges">
          <span class="tag">${esc(item.category)}</span>
          <span class="tag ${veg ? 'veg' : 'nonveg'}">${veg ? 'Veg 🟢' : 'Non-Veg 🔴'}</span>
        </div>
        ${!item.inStock ? `<span class="card-flag out">${esc(t('outOfStock'))}</span>` : item.tag ? `<span class="card-flag">${esc(item.tag)}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-title"><h3>${esc(item.title)}</h3><span class="price">${rupee(item.price)}</span></div>
        <p>${esc(item.desc)}</p>
      </div>
      <div class="card-foot">
        <button class="add-btn" data-add="${esc(item.id)}" ${item.inStock ? '' : 'disabled'}>
          <i class="fa-solid ${item.inStock ? 'fa-plus' : 'fa-ban'}"></i> ${esc(item.inStock ? t('addToCart') : t('unavailable'))}
        </button>
      </div>
    </article>`;
  }).join('');
}

/* ---------- Cart ---------- */
// Keep cart in sync with the live menu (price changes, removed or sold-out dishes)
function reconcileCart() {
  cart = cart
    .map((c) => { const m = menuItems.find((x) => x.id === c.id); return m && m.inStock ? { id: m.id, title: m.title, price: m.price, qty: Math.max(1, c.qty | 0) } : null; })
    .filter(Boolean);
  saveCart();
}

function addToCart(id) {
  const item = menuItems.find((m) => m.id === id);
  if (!item || !item.inStock) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, title: item.title, price: item.price, qty: 1 });
  saveCart();
  updateCartUI(true);
  showToast(`${item.title} ✓`, 'success');
}

function updateCartQty(id, delta) {
  const row = cart.find((c) => c.id === id);
  if (!row) return;
  row.qty += delta;
  if (row.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
  updateCartUI();
}

function clearCart() {
  if (!cart.length) return;
  cart = [];
  saveCart();
  updateCartUI();
}

function cartTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * (appSettings.gstRate / 100);
  return { subtotal, tax, total: subtotal + tax };
}

function updateCartUI(bump = false) {
  const box = $('cartItemsContainer');
  const qty = cart.reduce((s, i) => s + i.qty, 0);

  box.innerHTML = cart.length
    ? cart.map((i) => `
      <div class="cart-row">
        <div><h4>${esc(i.title)}</h4><div class="line-price">${rupee(i.price * i.qty)}</div></div>
        <div class="qty">
          <button data-qty="-1" data-id="${esc(i.id)}" aria-label="Decrease ${esc(i.title)}">−</button>
          <span>${i.qty}</span>
          <button data-qty="1" data-id="${esc(i.id)}" aria-label="Increase ${esc(i.title)}">+</button>
        </div>
      </div>`).join('')
    : `<div class="cart-empty"><i class="fa-solid fa-bowl-food"></i>${esc(t('emptyCart'))}<br>${esc(t('emptyCartSub'))}</div>`;

  const badge = $('cartCountBadge');
  badge.textContent = qty;
  if (bump) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }

  const { subtotal, tax, total } = cartTotals();
  $('cartGstPercent').textContent = appSettings.gstRate;
  $('cartSubtotal').textContent = rupee(subtotal);
  $('cartTax').textContent = rupee(tax);
  $('cartTotal').textContent = rupee(total);
}

function handleCheckout() {
  if (!cart.length) return showToast(t('emptyCart'), 'error');

  const nameEl = $('cartCustomerName');
  const phoneEl = $('cartCustomerPhone');
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const pay = $('cartPaymentMethod').value;
  const note = $('cartNote').value.trim();

  nameEl.classList.toggle('invalid', !name);
  phoneEl.classList.toggle('invalid', !validPhone(phone));
  if (!name) { showToast('Please enter your name', 'error'); return nameEl.focus(); }
  if (!validPhone(phone)) { showToast('Please enter a valid phone number', 'error'); return phoneEl.focus(); }

  const { subtotal, tax, total } = cartTotals();
  const items = cart.map((i, n) => `${n + 1}. ${i.title} x ${i.qty} = ${rupee(i.price * i.qty)}`).join('\n');

  const msg =
`*NEW TAKEAWAY ORDER* 🍽️
*Restaurant:* ${appSettings.restaurantName}
--------------------------------
*Customer Name:* ${name}
*Customer Phone:* ${phone}
*Payment Mode:* ${pay}
--------------------------------
*ORDER ITEMS:*
${items}
--------------------------------
*Subtotal:* ${rupee(subtotal)}
*GST (${appSettings.gstRate}%):* ${rupee(tax)}
*GRAND TOTAL:* ${rupee(total)}${note ? `\n\n*Note:* ${note}` : ''}

Please confirm my takeaway order!`;

  window.open(`https://wa.me/${appSettings.ownerPhone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  cart = [];
  saveCart();
  updateCartUI();
  $('cartNote').value = '';
  closeOverlay('cartDrawer');
  showToast('Opening WhatsApp to send your order…', 'success');
}

/* ---------- Table booking ---------- */
function todayISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
function initBookingDate() { $('bookDate').min = todayISO(); $('bookDate').value = todayISO(); }

function handleTableBooking(e) {
  e.preventDefault();
  const name = $('bookName').value.trim();
  const phone = $('bookPhone').value.trim();
  const date = $('bookDate').value;
  const time = $('bookTime').value;
  const guests = parseInt($('bookGuests').value, 10);
  const notes = $('bookNotes').value.trim() || 'None';
  const email = $('bookEmail').value.trim() || 'N/A';

  $('bookName').classList.toggle('invalid', !name);
  $('bookPhone').classList.toggle('invalid', !validPhone(phone));
  if (!name) return showToast('Please enter your name', 'error');
  if (!validPhone(phone)) return showToast('Please enter a valid phone number', 'error');
  if (!date || date < todayISO()) return showToast('Please choose today or a future date', 'error');
  if (!guests || guests < 1 || guests > appSettings.maxGuests) return showToast(`Guests must be between 1 and ${appSettings.maxGuests}`, 'error');

  reservationsList.unshift({ id: 'bk-' + Date.now(), name, phone, email, date, time, guests, notes, status: 'Pending' });
  saveBookings();
  renderAdminBookings();
  renderAdminStats();

  const msg =
`*NEW TABLE RESERVATION REQUEST* 🪑
*Restaurant:* ${appSettings.restaurantName}
--------------------------------
*Guest Name:* ${name}
*Phone Number:* ${phone}
*Date:* ${date}
*Time:* ${time}
*Guests:* ${guests} Person(s)
*Notes:* ${notes}
--------------------------------
Please confirm my reservation!`;

  e.target.reset();
  $('bookGuests').value = 2;
  initBookingDate();
  window.open(`https://wa.me/${appSettings.ownerPhone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  showToast('Request ready, send it in WhatsApp to finish!', 'success');
}

/* ---------- Admin: stats & tabs ---------- */
function renderAdminStats() {
  const today = todayISO();
  const pending = reservationsList.filter((b) => b.status === 'Pending').length;
  const todays = reservationsList.filter((b) => b.date === today && b.status !== 'Cancelled').length;
  const out = menuItems.filter((m) => !m.inStock).length;
  $('adminStats').innerHTML = `
    <div class="stat"><span>Total Dishes</span><strong>${menuItems.length}</strong></div>
    <div class="stat ${out ? 'hot' : ''}"><span>Out of Stock</span><strong>${out}</strong></div>
    <div class="stat ${pending ? 'hot' : ''}"><span>Pending Bookings</span><strong>${pending}</strong></div>
    <div class="stat"><span>Today's Bookings</span><strong>${todays}</strong></div>`;
  $('bookingTabCount').textContent = pending;
  $('bookingTabCount').classList.toggle('hidden', !pending);
}

function switchAdminTab(tab) {
  $('adminSub-menu').classList.toggle('hidden', tab !== 'menu');
  $('adminSub-bookings').classList.toggle('hidden', tab !== 'bookings');
  $('admTab-menu').classList.toggle('active', tab === 'menu');
  $('admTab-bookings').classList.toggle('active', tab === 'bookings');
}

/* ---------- Admin: menu ---------- */
function renderAdminTable() {
  const body = $('adminMenuTableBody');
  if (!menuItems.length) { body.innerHTML = `<tr><td colspan="6" class="table-empty">No dishes yet. Add your first dish.</td></tr>`; return; }
  body.innerHTML = menuItems.map((i) => {
    const img = safeUrl(i.image);
    return `
    <tr>
      <td><div class="dish-cell">${img ? `<img src="${esc(img)}" alt="" loading="lazy" onerror="this.style.display='none'">` : ''}<div><h4>${esc(i.title)}</h4><p>${esc(i.desc)}</p></div></div></td>
      <td class="muted">${esc(i.category)}</td>
      <td class="muted">${i.diet === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}</td>
      <td><strong style="color:var(--accent)">${rupee(i.price)}</strong></td>
      <td><button class="status ${i.inStock ? 'ok' : 'warn'}" data-stock="${esc(i.id)}" title="Click to toggle">${i.inStock ? 'In Stock' : 'Out of Stock'}</button></td>
      <td class="right"><span class="row-actions">
        <button class="row-btn" data-edit="${esc(i.id)}" aria-label="Edit ${esc(i.title)}"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="row-btn" data-del="${esc(i.id)}" aria-label="Delete ${esc(i.title)}"><i class="fa-solid fa-trash"></i></button>
      </span></td>
    </tr>`;
  }).join('');
}

function toggleStockStatus(id) {
  const item = menuItems.find((m) => m.id === id);
  if (!item) return;
  item.inStock = !item.inStock;
  saveMenu();
  reconcileCart();
  renderAdminTable(); renderCustomerMenu(); renderAdminStats(); updateCartUI();
  showToast(`${item.title}: ${item.inStock ? 'In Stock' : 'Out of Stock'}`, 'info');
}

function openAddItemModal() {
  $('itemForm').reset();
  $('editItemId').value = '';
  $('itemModalTitle').textContent = 'Add New Menu Dish';
  openOverlay('itemModal');
}

function openEditItemModal(id) {
  const item = menuItems.find((m) => m.id === id);
  if (!item) return;
  $('editItemId').value = item.id;
  $('itemModalTitle').textContent = 'Edit Dish';
  $('itemTitle').value = item.title;
  $('itemCategory').value = item.category;
  $('itemDiet').value = item.diet || 'Veg';
  $('itemPrice').value = item.price;
  $('itemImage').value = item.image;
  $('itemDesc').value = item.desc;
  openOverlay('itemModal');
}

function handleItemSave(e) {
  e.preventDefault();
  const editId = $('editItemId').value;
  const title = $('itemTitle').value.trim();
  const price = parseInt($('itemPrice').value, 10);
  const image = safeUrl($('itemImage').value.trim());
  if (!title) return showToast('Dish title is required', 'error');
  if (!price || price < 1) return showToast('Enter a valid price', 'error');
  if (!image) return showToast('Image URL must start with https://', 'error');

  const prev = menuItems.find((m) => m.id === editId);
  const data = {
    id: editId || 'm-' + Date.now(),
    title, price, image,
    category: $('itemCategory').value,
    diet: $('itemDiet').value,
    desc: $('itemDesc').value.trim(),
    inStock: prev ? prev.inStock : true,
    tag: prev ? prev.tag : undefined
  };

  if (prev) menuItems[menuItems.indexOf(prev)] = data;
  else menuItems.unshift(data);

  saveMenu();
  reconcileCart();
  closeOverlay('itemModal');
  renderAdminTable(); renderCustomerMenu(); renderAdminStats(); updateCartUI();
  showToast('Menu updated!', 'success');
}

function deleteMenuItem(id) {
  const item = menuItems.find((m) => m.id === id);
  if (!item || !confirm(`Delete "${item.title}" from the menu?`)) return;
  menuItems = menuItems.filter((m) => m.id !== id);
  saveMenu();
  reconcileCart();
  renderAdminTable(); renderCustomerMenu(); renderAdminStats(); updateCartUI();
  showToast('Dish deleted', 'info');
}

function exportMenu() {
  const blob = new Blob([JSON.stringify(menuItems, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `bistrocraft-menu-${todayISO()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function importMenu(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error('bad');
      const clean = data.map((m, i) => ({
        id: String(m.id || 'm-' + Date.now() + i),
        title: String(m.title || '').slice(0, 80),
        category: CATEGORIES.includes(m.category) && m.category !== 'All' ? m.category : 'Mains',
        diet: m.diet === 'Non-Veg' ? 'Non-Veg' : 'Veg',
        price: Math.max(1, parseInt(m.price, 10) || 0),
        image: safeUrl(m.image),
        desc: String(m.desc || '').slice(0, 300),
        inStock: m.inStock !== false,
        tag: m.tag ? String(m.tag).slice(0, 20) : undefined
      })).filter((m) => m.title && m.price);
      if (!clean.length) throw new Error('empty');
      if (!confirm(`Replace the current menu with ${clean.length} imported dishes?`)) return;
      menuItems = clean;
      saveMenu(); reconcileCart();
      renderAdminTable(); renderCustomerMenu(); renderAdminStats(); updateCartUI();
      showToast('Menu imported!', 'success');
    } catch { showToast('Invalid menu file', 'error'); }
  };
  reader.readAsText(file);
}

/* ---------- Admin: bookings ---------- */
function statusClass(s) { return s === 'Confirmed' ? 'ok' : s === 'Cancelled' ? 'bad' : 'warn'; }

function renderAdminBookings() {
  const body = $('adminBookingsTableBody');
  if (!reservationsList.length) { body.innerHTML = `<tr><td colspan="7" class="table-empty">No reservations recorded on this device yet.</td></tr>`; return; }
  body.innerHTML = reservationsList.map((b) => `
    <tr>
      <td><strong>${esc(b.name)}</strong><div class="muted small">${esc(b.email)}</div></td>
      <td class="muted">${esc(b.phone)}</td>
      <td class="muted">${esc(b.date)} @ ${esc(b.time)}</td>
      <td><strong>${esc(b.guests)}</strong></td>
      <td class="muted">${esc(b.notes)}</td>
      <td><span class="status ${statusClass(b.status)}">${esc(b.status)}</span></td>
      <td class="right"><span class="row-actions">
        ${b.status !== 'Confirmed' ? `<button class="row-btn" data-bk-confirm="${esc(b.id)}" title="Confirm" aria-label="Confirm booking"><i class="fa-solid fa-check"></i></button>` : ''}
        <button class="row-btn wa" data-bk-wa="${esc(b.id)}" title="Reply on WhatsApp" aria-label="Reply on WhatsApp"><i class="fa-brands fa-whatsapp"></i></button>
        ${b.status !== 'Cancelled' ? `<button class="row-btn" data-bk-cancel="${esc(b.id)}" title="Cancel" aria-label="Cancel booking"><i class="fa-solid fa-ban"></i></button>` : ''}
        <button class="row-btn" data-bk-del="${esc(b.id)}" title="Delete" aria-label="Delete booking"><i class="fa-solid fa-trash"></i></button>
      </span></td>
    </tr>`).join('');
}

function setBookingStatus(id, status) {
  const b = reservationsList.find((x) => x.id === id);
  if (!b) return;
  b.status = status;
  saveBookings(); renderAdminBookings(); renderAdminStats();
  showToast(`Reservation ${status.toLowerCase()}`, 'info');
}

function replyBookingWhatsApp(id) {
  const b = reservationsList.find((x) => x.id === id);
  if (!b) return;
  const verb = b.status === 'Cancelled' ? 'could not be accommodated' : 'is confirmed';
  const msg = `Hello ${b.name}, your table for ${b.guests} on ${b.date} at ${b.time} at ${appSettings.restaurantName} ${verb}. Thank you!`;
  window.open(`https://wa.me/${normPhone(b.phone)}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

function deleteBooking(id) {
  if (!confirm('Delete this reservation record?')) return;
  reservationsList = reservationsList.filter((b) => b.id !== id);
  saveBookings(); renderAdminBookings(); renderAdminStats();
}

/* ---------- Auth (owner password) ---------- */
// NOTE: this protects the panel on this device only. Anyone with browser dev tools
// can bypass front-end checks; real security needs a server-side login.
const AUTH_KEY = 'bistro_owner_auth';
let failedAttempts = 0, lockUntil = 0;

async function hashPass(pass, salt) {
  const data = new TextEncoder().encode(salt + ':' + pass);
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 5381; for (const b of data) h = ((h << 5) + h + b) >>> 0; return 'x' + h.toString(16);
}
const newSalt = () => Array.from(crypto.getRandomValues(new Uint8Array(12))).map((b) => b.toString(16).padStart(2, '0')).join('');

function openAuth() {
  const hasPass = !!store.get(AUTH_KEY, null);
  $('authTitle').textContent = hasPass ? 'Owner Login' : 'Set Owner Password';
  $('authSubtitle').textContent = hasPass ? 'Enter your password to open the management panel.' : 'First time here? Create a password to protect the owner panel on this device.';
  $('authPassLabel').textContent = hasPass ? 'Password' : 'New Password (min 6 characters)';
  $('authConfirmWrap').classList.toggle('hidden', hasPass);
  $('authSubmit').textContent = hasPass ? 'Log In' : 'Create Password & Log In';
  $('authPass').autocomplete = hasPass ? 'current-password' : 'new-password';
  $('authForm').reset();
  $('authError').classList.add('hidden');
  openOverlay('authModal');
}

function authError(msg) { const el = $('authError'); el.textContent = msg; el.classList.remove('hidden'); }

async function handleAuthLogin(e) {
  e.preventDefault();
  const pass = $('authPass').value;
  const saved = store.get(AUTH_KEY, null);

  if (!saved) {
    if (pass.length < 6) return authError('Password must be at least 6 characters.');
    if (pass !== $('authPassConfirm').value) return authError('Passwords do not match.');
    const salt = newSalt();
    store.set(AUTH_KEY, { salt, hash: await hashPass(pass, salt) });
    return completeLogin();
  }

  if (Date.now() < lockUntil) return authError(`Too many attempts. Try again in ${Math.ceil((lockUntil - Date.now()) / 1000)}s.`);
  if (await hashPass(pass, saved.salt) === saved.hash) { failedAttempts = 0; return completeLogin(); }
  failedAttempts += 1;
  if (failedAttempts >= 5) { lockUntil = Date.now() + 30000; failedAttempts = 0; return authError('Too many attempts. Locked for 30 seconds.'); }
  authError('Incorrect password.');
}

function completeLogin() {
  sessionStorage.setItem('bistro_session', '1');
  setLoggedIn(true);
  closeOverlay('authModal');
  switchMode('admin');
  showToast('Logged in as Restaurant Manager', 'success');
}

function setLoggedIn(state) {
  isLoggedIn = state;
  $('nav-admin').classList.toggle('hidden', !state);
  $('nav-settings').classList.toggle('hidden', !state);
  $('loginBtnText').textContent = t(state ? 'staffLogout' : 'staffLogin');
}

function handleAuthClick() {
  if (isLoggedIn) {
    sessionStorage.removeItem('bistro_session');
    setLoggedIn(false);
    switchMode('customer');
    showToast('Logged out', 'info');
  } else openAuth();
}

async function handlePasswordChange(e) {
  e.preventDefault();
  const p = $('newPass').value;
  if (p.length < 6) return showToast('Password must be at least 6 characters', 'error');
  if (p !== $('newPassConfirm').value) return showToast('Passwords do not match', 'error');
  const salt = newSalt();
  store.set(AUTH_KEY, { salt, hash: await hashPass(p, salt) });
  e.target.reset();
  showToast('Password updated', 'success');
}

/* ---------- Overlays ---------- */
function openOverlay(id) {
  lastFocus = document.activeElement;
  const el = $(id);
  el.classList.remove('hidden');
  el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const focusable = el.querySelector('input:not([type=hidden]):not([hidden]), button:not([data-close="' + id + '"]), select, textarea') || el.querySelector('button');
  setTimeout(() => focusable && focusable.focus(), 50);
}
function closeOverlay(id) {
  const el = $(id);
  el.classList.add('hidden');
  el.setAttribute('aria-hidden', 'true');
  if (['cartDrawer', 'itemModal', 'authModal'].every((x) => $(x).classList.contains('hidden'))) document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ---------- Toasts ---------- */
function showToast(msg, type = 'success') {
  const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icon}"></i><span></span>`;
  el.lastChild.textContent = msg;
  $('toastContainer').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 2800);
}

/* ---------- Scroll effects ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.1 });
  els.forEach((e) => io.observe(e));
}
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('scrollProgress').style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  $('siteHeader').classList.toggle('scrolled', y > 10);
  $('toTopBtn').classList.toggle('show', y > 600);
}

/* ---------- Events ---------- */
function bindEvents() {
  $('themeToggleBtn').addEventListener('click', toggleTheme);
  $('langBtn').addEventListener('click', toggleLanguage);
  $('loginBtn').addEventListener('click', handleAuthClick);
  $('openCartBtn').addEventListener('click', () => openOverlay('cartDrawer'));
  $('checkoutBtn').addEventListener('click', handleCheckout);
  $('clearCartBtn').addEventListener('click', clearCart);
  $('addItemBtn').addEventListener('click', openAddItemModal);
  $('exportMenuBtn').addEventListener('click', exportMenu);
  $('importMenuBtn').addEventListener('click', () => $('importMenuFile').click());
  $('importMenuFile').addEventListener('change', (e) => { if (e.target.files[0]) importMenu(e.target.files[0]); e.target.value = ''; });
  $('toTopBtn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  $('checkoutForm').addEventListener('submit', (e) => e.preventDefault());

  $('bookingForm').addEventListener('submit', handleTableBooking);
  $('itemForm').addEventListener('submit', handleItemSave);
  $('authForm').addEventListener('submit', handleAuthLogin);
  $('settingsForm').addEventListener('submit', handleSettingsSave);
  $('passwordForm').addEventListener('submit', handlePasswordChange);

  $('brandLink').addEventListener('click', (e) => { e.preventDefault(); switchMode('customer'); });

  $('menuToggle').addEventListener('click', () => {
    const open = $('mainNav').classList.toggle('open');
    $('menuToggle').setAttribute('aria-expanded', open);
    $('menuToggle').querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  $('mainNav').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-nav]');
    if (!btn) return;
    const nav = btn.dataset.nav;
    if (nav === 'booking') { switchMode('customer'); setTimeout(() => scrollToSection('bookingSection'), 60); }
    else if (nav === 'menu') { switchMode('customer'); setTimeout(() => scrollToSection('menuSection'), 60); }
    else switchMode(nav);
    closeMobileNav();
  });

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-close]');
    if (close) closeOverlay(close.dataset.close);

    const cat = e.target.closest('[data-cat]');
    if (cat) { currentCategory = cat.dataset.cat; renderFilters(); renderCustomerMenu(); }

    const diet = e.target.closest('[data-diet]');
    if (diet) {
      currentDiet = diet.dataset.diet;
      document.querySelectorAll('#dietFilter button').forEach((b) => b.classList.toggle('active', b === diet));
      renderCustomerMenu();
    }

    const add = e.target.closest('[data-add]');
    if (add) addToCart(add.dataset.add);

    const q = e.target.closest('[data-qty]');
    if (q) updateCartQty(q.dataset.id, Number(q.dataset.qty));

    const at = e.target.closest('[data-admtab]');
    if (at) switchAdminTab(at.dataset.admtab);

    const stock = e.target.closest('[data-stock]'); if (stock) toggleStockStatus(stock.dataset.stock);
    const edit = e.target.closest('[data-edit]'); if (edit) openEditItemModal(edit.dataset.edit);
    const del = e.target.closest('[data-del]'); if (del) deleteMenuItem(del.dataset.del);
    const bc = e.target.closest('[data-bk-confirm]'); if (bc) setBookingStatus(bc.dataset.bkConfirm, 'Confirmed');
    const bx = e.target.closest('[data-bk-cancel]'); if (bx) setBookingStatus(bx.dataset.bkCancel, 'Cancelled');
    const bw = e.target.closest('[data-bk-wa]'); if (bw) replyBookingWhatsApp(bw.dataset.bkWa);
    const bd = e.target.closest('[data-bk-del]'); if (bd) deleteBooking(bd.dataset.bkDel);
  });

  let timer;
  $('menuSearchInput').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(renderCustomerMenu, 150); });

  ['cartCustomerName', 'cartCustomerPhone', 'bookName', 'bookPhone'].forEach((id) =>
    $(id).addEventListener('input', (e) => e.target.classList.remove('invalid'))
  );

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    ['authModal', 'itemModal', 'cartDrawer'].forEach((id) => { if (!$(id).classList.contains('hidden')) closeOverlay(id); });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
