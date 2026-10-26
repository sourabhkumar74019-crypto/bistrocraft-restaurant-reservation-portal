const initialMenuItems = [
  { id: 'm-1', title: 'Paneer Butter Masala', category: 'Mains', diet: 'Veg', price: 280, inStock: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', desc: 'Soft cottage cheese cooked in rich tomato and butter gravy.' },
  { id: 'm-2', title: 'Chicken Biryani (Hyderabadi)', category: 'Mains', diet: 'Non-Veg', price: 340, inStock: true, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', desc: 'Aromatic basmati rice cooked with juicy marinated chicken.' },
  { id: 'm-3', title: 'Crispy Veg Kurkure Momos', category: 'Starters', diet: 'Veg', price: 160, inStock: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', desc: 'Crispy fried vegetable dumplings served with spicy chutney.' },
  { id: 'm-4', title: 'Chicken Malai Tikka', category: 'Starters', diet: 'Non-Veg', price: 290, inStock: true, image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', desc: 'Tender chicken pieces marinated in cream and mild spices.' },
  { id: 'm-5', title: 'Gulab Jamun (2 Pcs)', category: 'Desserts', diet: 'Veg', price: 90, inStock: true, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80', desc: 'Soft warm milk dumplings soaked in cardamom sugar syrup.' },
  { id: 'm-6', title: 'Masala Cold Coffee with Ice Cream', category: 'Beverages', diet: 'Veg', price: 120, inStock: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', desc: 'Rich whipped cold coffee topped with vanilla ice cream.' }
];

let appSettings = JSON.parse(localStorage.getItem('bistro_settings')) || {
  restaurantName: 'BistroCraft Family Restaurant',
  ownerPhone: '918376891847',
  gstRate: 5.0
};

let menuItems = JSON.parse(localStorage.getItem('bistro_menu')) || initialMenuItems;
let reservationsList = JSON.parse(localStorage.getItem('bistro_bookings')) || [];
let cart = JSON.parse(localStorage.getItem('bistro_cart')) || [];
let isDarkMode = true;
let currentCategory = 'All';
let currentLang = 'en';
let isLoggedIn = false;

const translations = {
  en: {
    tagline: 'Restaurant & Cafe',
    navMenu: 'Digital Menu',
    navBooking: 'Table Booking',
    navAdmin: 'Owner Panel',
    navSettings: 'Settings',
    staffLogin: 'Staff Login',
    staffLogout: 'Logout',
    heroBadge: 'Fresh & Delicious Food',
    heroTitle: 'Swad Aisa Jo Dil Ko Bhaye!',
    heroDesc: 'Explore our digital menu, order takeaway, or reserve a table for family and friends in seconds.',
    catAll: 'All Dishes',
    catStarters: 'Starters',
    catMains: 'Main Course',
    catDesserts: 'Desserts',
    catBeverages: 'Beverages',
    dietAll: 'Veg & Non-Veg',
    dietVeg: 'Veg Only 🟢',
    dietNonVeg: 'Non-Veg 🔴',
    bookBadge: 'Reserve Your Dining Table',
    bookTitle: 'Book A Table',
    bookDesc: 'Instant table booking confirmation sent directly via WhatsApp.',
    labelName: 'Full Name *',
    labelPhone: 'Phone / WhatsApp Number *',
    labelEmail: 'Email Address (Optional)',
    labelDate: 'Date *',
    labelTime: 'Time Slot *',
    labelGuests: 'Number of Guests *',
    labelNotes: 'Special Requests / Notes',
    btnBook: 'Confirm Reservation via WhatsApp',
    cartTitle: 'Takeaway Order Cart',
    labelCustomerName: 'Your Name *',
    labelCustomerPhone: 'WhatsApp Phone Number *',
    labelPayment: 'Payment Method',
    btnCheckout: 'Send Order via WhatsApp'
  },
  hi: {
    tagline: 'रेस्टोरेंट और कैफे',
    navMenu: 'डिजिटल मेनू',
    navBooking: 'टेबल बुकिंग',
    navAdmin: 'ओनर पैनल',
    navSettings: 'सेटिंग्स',
    staffLogin: 'स्टाफ लॉगिन',
    staffLogout: 'लॉगआउट',
    heroBadge: 'ताज़ा और स्वादिष्ट खाना',
    heroTitle: 'स्वाद ऐसा जो दिल को भाए!',
    heroDesc: 'हमारा डिजिटल मेनू देखें, टेकअवे ऑर्डर करें या परिवार और दोस्तों के लिए टेबल बुक करें।',
    catAll: 'सभी व्यंजन',
    catStarters: 'स्टार्टर्स',
    catMains: 'मेन कोर्स',
    catDesserts: 'मिठाई / डेजर्ट',
    catBeverages: 'पेय पदार्थ (ड्रिंक्स)',
    dietAll: 'वेज और नॉन-वेज',
    dietVeg: 'केवल शाकाहारी 🟢',
    dietNonVeg: 'केवल मांसाहारी 🔴',
    bookBadge: 'अपनी टेबल बुक करें',
    bookTitle: 'टेबल बुकिंग',
    bookDesc: 'व्हाट्सएप के जरिए तुरंत टेबल बुकिंग की पुष्टि प्राप्त करें।',
    labelName: 'पूरा नाम *',
    labelPhone: 'फोन / व्हाट्सएप नंबर *',
    labelEmail: 'ईमेल पता (वैकल्पिक)',
    labelDate: 'तारीख *',
    labelTime: 'समय (टाइम) *',
    labelGuests: 'लोगों की संख्या *',
    labelNotes: 'विशेष अनुरोध / नोट्स',
    btnBook: 'व्हाट्सएप पर टेबल बुक करें',
    cartTitle: 'टेकअवे ऑर्डर कार्ट',
    labelCustomerName: 'आपका नाम *',
    labelCustomerPhone: 'व्हाट्सएप फोन नंबर *',
    labelPayment: 'भुगतान का तरीका',
    btnCheckout: 'व्हाट्सएप पर ऑर्डर भेजें'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  applySettingsUI();
  renderCustomerMenu();
  renderAdminTable();
  renderAdminBookings();
  updateCartUI();
});

function saveMenuState() { localStorage.setItem('bistro_menu', JSON.stringify(menuItems)); }
function saveBookingsState() { localStorage.setItem('bistro_bookings', JSON.stringify(reservationsList)); }
function saveCartState() { localStorage.setItem('bistro_cart', JSON.stringify(cart)); }
function saveSettingsState() { localStorage.setItem('bistro_settings', JSON.stringify(appSettings)); }

function applySettingsUI() {
  document.getElementById('cartGstPercent').textContent = appSettings.gstRate;
  document.getElementById('settingRestName').value = appSettings.restaurantName;
  document.getElementById('settingOwnerPhone').value = appSettings.ownerPhone;
  document.getElementById('settingGstRate').value = appSettings.gstRate;
  document.getElementById('footerRestName').textContent = appSettings.restaurantName;
}

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  document.getElementById('langLabel').textContent = currentLang === 'en' ? 'हिंदी' : 'English';
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  renderCustomerMenu();
}

function switchMode(mode) {
  document.getElementById('customerView').classList.toggle('hidden', mode !== 'customer');
  document.getElementById('adminView').classList.toggle('hidden', mode !== 'admin');
  document.getElementById('settingsView').classList.toggle('hidden', mode !== 'settings');

  document.getElementById('nav-menu').classList.toggle('active', mode === 'customer');
  document.getElementById('nav-admin').classList.toggle('active', mode === 'admin');
  document.getElementById('nav-settings').classList.toggle('active', mode === 'settings');
}

function switchTab(tab) {
  if (tab === 'settings') switchMode('settings');
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');

  if (isDarkMode) {
    html.classList.remove('light');
    html.classList.add('dark');
    icon.className = 'fa-solid fa-moon text-rose-400';
    label.textContent = 'Dark';
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    icon.className = 'fa-solid fa-sun text-rose-500';
    label.textContent = 'Light';
  }
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('#categoryFilterGroup button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderCustomerMenu();
}

function searchMenu() {
  renderCustomerMenu();
}

function renderCustomerMenu() {
  const container = document.getElementById('customerMenuGrid');
  const query = document.getElementById('menuSearchInput')?.value.toLowerCase() || '';
  const dietFilter = document.getElementById('dietFilter')?.value || 'All';
  container.innerHTML = '';

  const filtered = menuItems.filter(item => {
    const matchCat = currentCategory === 'All' || item.category === currentCategory;
    const matchDiet = dietFilter === 'All' || item.diet === dietFilter;
    const matchSearch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCat && matchDiet && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full py-12 text-center text-sub">${currentLang === 'hi' ? 'कोई व्यंजन नहीं मिला।' : 'No dishes found matching search criteria.'}</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = `menu-card card-bg rounded-2xl overflow-hidden border card-border flex flex-col justify-between ${!item.inStock ? 'opacity-60' : ''}`;
    
    const dietBadge = item.diet === 'Veg' 
      ? '<span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">Veg 🟢</span>'
      : '<span class="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">Non-Veg 🔴</span>';

    card.innerHTML = `
      <div>
        <div class="relative h-48 overflow-hidden">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">${item.category}</span>
            ${dietBadge}
          </div>
          ${!item.inStock ? '<span class="absolute top-3 right-3 bg-slate-950/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Out of Stock</span>' : ''}
        </div>
        <div class="p-5 space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="font-extrabold text-brand text-base">${item.title}</h3>
            <span class="text-rose-400 font-black text-base">₹${item.price}</span>
          </div>
          <p class="text-xs text-sub leading-relaxed">${item.desc}</p>
        </div>
      </div>
      <div class="p-5 pt-0">
        <button onclick="addToCart('${item.id}')" ${!item.inStock ? 'disabled' : ''} class="w-full ${item.inStock ? '' : 'bg-slate-800 cursor-not-allowed'} font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2" style="${item.inStock ? 'background-color: #f43f5e !important; color: #ffffff !important;' : 'color: #9ca3af !important;'}">
          <i class="fa-solid fa-plus"></i> ${item.inStock ? (currentLang === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Takeaway Cart') : (currentLang === 'hi' ? 'अनुपलब्ध' : 'Currently Unavailable')}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleCartDrawer() {
  document.getElementById('cartDrawer').classList.toggle('hidden');
}

function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item || !item.inStock) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCartState();
  updateCartUI();
  showToast(`Added ${item.title} to cart!`, 'success');
}

function updateCartQty(id, delta) {
  const index = cart.findIndex(c => c.id === id);
  if (index !== -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
  }
  saveCartState();
  updateCartUI();
}

function updateCartUI() {
  const container = document.getElementById('cartItemsContainer');
  const countBadge = document.getElementById('cartCountBadge');
  container.innerHTML = '';

  let totalQty = 0;
  let subtotal = 0;

  cart.forEach(item => {
    totalQty += item.qty;
    subtotal += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'flex justify-between items-center bg-card p-3 rounded-xl border card-border text-xs';
    row.innerHTML = `
      <div class="space-y-0.5">
        <h4 class="font-bold text-brand">${item.title}</h4>
        <p class="text-rose-400 font-bold">₹${item.price * item.qty}</p>
      </div>
      <div class="flex items-center gap-2 bg-card p-1 rounded-lg border card-border">
        <button onclick="updateCartQty('${item.id}', -1)" class="w-6 h-6 text-brand font-bold flex items-center justify-center hover:bg-rose-500 hover:text-white rounded transition">-</button>
        <span class="font-bold text-brand text-xs px-1">${item.qty}</span>
        <button onclick="updateCartQty('${item.id}', 1)" class="w-6 h-6 text-brand font-bold flex items-center justify-center hover:bg-rose-500 hover:text-white rounded transition">+</button>
      </div>
    `;
    container.appendChild(row);
  });

  const gstTax = subtotal * (appSettings.gstRate / 100);
  const total = subtotal + gstTax;

  countBadge.textContent = totalQty;
  document.getElementById('cartSubtotal').textContent = `₹${subtotal.toFixed(0)}`;
  document.getElementById('cartTax').textContent = `₹${gstTax.toFixed(0)}`;
  document.getElementById('cartTotal').textContent = `₹${total.toFixed(0)}`;
}

function handleCheckout() {
  if (cart.length === 0) {
    showToast('Cart is empty!', 'error');
    return;
  }

  const custName = document.getElementById('cartCustomerName').value.trim();
  const custPhone = document.getElementById('cartCustomerPhone').value.trim();
  const payMethod = document.getElementById('cartPaymentMethod').value;

  if (!custName || !custPhone) {
    showToast('Please enter your Name and WhatsApp Number!', 'error');
    return;
  }

  let subtotal = 0;
  let itemsText = '';
  cart.forEach((item, idx) => {
    subtotal += item.price * item.qty;
    itemsText += `${idx + 1}. ${item.title} x ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  const gstTax = subtotal * (appSettings.gstRate / 100);
  const grandTotal = subtotal + gstTax;

  const waMessage = `*NEW TAKEAWAY ORDER* 🍽️\n` +
    `*Restaurant:* ${appSettings.restaurantName}\n` +
    `--------------------------------\n` +
    `*Customer Name:* ${custName}\n` +
    `*Customer Phone:* ${custPhone}\n` +
    `*Payment Mode:* ${payMethod}\n` +
    `--------------------------------\n` +
    `*ORDER ITEMS:*\n${itemsText}` +
    `--------------------------------\n` +
    `*Subtotal:* ₹${subtotal}\n` +
    `*GST (${appSettings.gstRate}%):* ₹${gstTax.toFixed(0)}\n` +
    `*GRAND TOTAL:* ₹${grandTotal.toFixed(0)}\n\n` +
    `Please confirm my takeaway order!`;

  const waUrl = `https://wa.me/${appSettings.ownerPhone}?text=${encodeURIComponent(waMessage)}`;

  cart = [];
  saveCartState();
  updateCartUI();
  toggleCartDrawer();

  window.open(waUrl, '_blank');
  showToast('Redirecting to WhatsApp to send order...', 'success');
}

function handleTableBooking(e) {
  e.preventDefault();

  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const guests = document.getElementById('bookGuests').value;
  const notes = document.getElementById('bookNotes').value || 'None';

  const newBooking = {
    id: 'bk-' + Date.now(),
    name,
    phone,
    email: document.getElementById('bookEmail').value || 'N/A',
    date,
    time,
    guests,
    notes,
    status: 'Confirmed'
  };

  reservationsList.unshift(newBooking);
  saveBookingsState();
  renderAdminBookings();

  const waMessage = `*NEW TABLE RESERVATION REQUEST* 🪑\n` +
    `*Restaurant:* ${appSettings.restaurantName}\n` +
    `--------------------------------\n` +
    `*Guest Name:* ${name}\n` +
    `*Phone Number:* ${phone}\n` +
    `*Date:* ${date}\n` +
    `*Time:* ${time}\n` +
    `*Guests:* ${guests} Person(s)\n` +
    `*Notes:* ${notes}\n` +
    `--------------------------------\n` +
    `Please confirm my reservation!`;

  const waUrl = `https://wa.me/${appSettings.ownerPhone}?text=${encodeURIComponent(waMessage)}`;

  e.target.reset();
  window.open(waUrl, '_blank');
  showToast('Reservation sent via WhatsApp!', 'success');
}

function switchAdminTab(tab) {
  document.getElementById('adminSub-menu').classList.toggle('hidden', tab !== 'menu');
  document.getElementById('adminSub-bookings').classList.toggle('hidden', tab !== 'bookings');

  document.getElementById('admTab-menu').classList.toggle('active', tab === 'menu');
  document.getElementById('admTab-bookings').classList.toggle('active', tab === 'bookings');
}

function renderAdminTable() {
  const tbody = document.getElementById('adminMenuTableBody');
  tbody.innerHTML = '';

  menuItems.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-rose-500/5 transition';
    tr.innerHTML = `
      <td class="p-4 flex items-center gap-3">
        <img src="${item.image}" class="w-10 h-10 object-cover rounded-xl">
        <div>
          <h4 class="font-bold text-brand text-xs">${item.title}</h4>
          <p class="text-[10px] text-sub truncate max-w-xs">${item.desc}</p>
        </div>
      </td>
      <td class="p-4 text-sub">${item.category}</td>
      <td class="p-4 text-sub">${item.diet === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}</td>
      <td class="p-4 font-bold text-rose-400">₹${item.price}</td>
      <td class="p-4">
        <button onclick="toggleStockStatus('${item.id}')" class="${item.inStock ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'} border text-[10px] font-extrabold px-2.5 py-1 rounded-full">
          ${item.inStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>
      <td class="p-4 text-right space-x-2">
        <button onclick="openEditItemModal('${item.id}')" class="p-2 text-sub hover:text-rose-400"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteMenuItem('${item.id}')" class="p-2 text-sub hover:text-rose-500"><i class="fa-solid fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleStockStatus(id) {
  const item = menuItems.find(m => m.id === id);
  if (item) {
    item.inStock = !item.inStock;
    saveMenuState();
    renderAdminTable();
    renderCustomerMenu();
    showToast(`Updated stock status for ${item.title}`, 'success');
  }
}

function openAddItemModal() {
  document.getElementById('editItemId').value = '';
  document.getElementById('itemModalTitle').textContent = 'Add New Menu Dish';
  document.getElementById('itemTitle').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemImage').value = '';
  document.getElementById('itemDesc').value = '';
  openModal('itemModal');
}

function openEditItemModal(id) {
  const item = menuItems.find(m => m.id === id);
  if (!item) return;

  document.getElementById('editItemId').value = item.id;
  document.getElementById('itemModalTitle').textContent = 'Edit Dish Item';
  document.getElementById('itemTitle').value = item.title;
  document.getElementById('itemCategory').value = item.category;
  document.getElementById('itemDiet').value = item.diet || 'Veg';
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemImage').value = item.image;
  document.getElementById('itemDesc').value = item.desc;
  openModal('itemModal');
}

function handleItemSave(e) {
  e.preventDefault();

  const editId = document.getElementById('editItemId').value;
  const itemData = {
    id: editId || 'm-' + Date.now(),
    title: document.getElementById('itemTitle').value,
    category: document.getElementById('itemCategory').value,
    diet: document.getElementById('itemDiet').value,
    price: parseInt(document.getElementById('itemPrice').value),
    image: document.getElementById('itemImage').value,
    desc: document.getElementById('itemDesc').value,
    inStock: true
  };

  if (editId) {
    const idx = menuItems.findIndex(m => m.id === editId);
    if (idx !== -1) menuItems[idx] = itemData;
  } else {
    menuItems.unshift(itemData);
  }

  saveMenuState();
  closeModal('itemModal');
  renderAdminTable();
  renderCustomerMenu();
  showToast('Menu item updated successfully!', 'success');
}

function deleteMenuItem(id) {
  if (confirm('Are you sure you want to delete this dish item?')) {
    menuItems = menuItems.filter(m => m.id !== id);
    saveMenuState();
    renderAdminTable();
    renderCustomerMenu();
    showToast('Item deleted from menu', 'info');
  }
}

function renderAdminBookings() {
  const tbody = document.getElementById('adminBookingsTableBody');
  tbody.innerHTML = '';

  if (reservationsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-sub">No table reservations recorded yet.</td></tr>`;
    return;
  }

  reservationsList.forEach(b => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-rose-500/5 transition';
    tr.innerHTML = `
      <td class="p-4">
        <h4 class="font-bold text-brand text-xs">${b.name}</h4>
      </td>
      <td class="p-4 text-sub font-bold">${b.phone}</td>
      <td class="p-4 text-sub">${b.date} @ ${b.time}</td>
      <td class="p-4 font-bold text-brand">${b.guests} Guests</td>
      <td class="p-4 text-sub">${b.notes}</td>
      <td class="p-4">
        <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full">${b.status}</span>
      </td>
      <td class="p-4 text-right">
        <button onclick="cancelBooking('${b.id}')" class="text-rose-400 hover:text-rose-500 text-xs font-bold">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function cancelBooking(id) {
  reservationsList = reservationsList.filter(b => b.id !== id);
  saveBookingsState();
  renderAdminBookings();
  showToast('Reservation cancelled', 'info');
}

function handleSettingsSave(e) {
  e.preventDefault();

  appSettings.restaurantName = document.getElementById('settingRestName').value;
  appSettings.ownerPhone = document.getElementById('settingOwnerPhone').value.replace(/\D/g, '');
  appSettings.gstRate = parseFloat(document.getElementById('settingGstRate').value);

  saveSettingsState();
  applySettingsUI();
  showToast('Restaurant operating settings updated!', 'success');
}

function handleAuthClick() {
  if (isLoggedIn) {
    isLoggedIn = false;
    document.getElementById('nav-admin').classList.add('hidden');
    document.getElementById('nav-admin').classList.remove('flex');
    document.getElementById('nav-settings').classList.add('hidden');
    document.getElementById('loginBtn').innerText = translations[currentLang].staffLogin;
    switchMode('customer');
    showToast('Logged out successfully', 'info');
  } else {
    openModal('authModal');
  }
}

function handleAuthLogin(e) {
  e.preventDefault();
  isLoggedIn = true;
  
  document.getElementById('nav-admin').classList.remove('hidden');
  document.getElementById('nav-admin').classList.add('flex');
  document.getElementById('nav-settings').classList.remove('hidden');
  document.getElementById('loginBtn').innerText = translations[currentLang].staffLogout;

  closeModal('authModal');
  switchMode('admin');
  showToast('Logged in as Restaurant Manager!', 'success');
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `px-4 py-3 rounded-xl text-xs font-bold text-white shadow-xl backdrop-blur-md border flex items-center gap-2 pointer-events-auto transition transform translate-y-2 opacity-0 ${type === 'success' ? 'bg-emerald-600/90 border-emerald-400' : 'bg-rose-600/90 border-rose-400'}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
