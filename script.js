// Default Initial Menu Items Seed
const initialMenuItems = [
  { id: 'm-1', title: 'Black Truffle Tagliatelle', category: 'Mains', price: 34.00, inStock: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80', desc: 'Handmade pasta tossed in aged parmesan wheel & fresh truffles.' },
  { id: 'm-2', title: 'Wagyu Beef Ribeye Steak', category: 'Mains', price: 68.00, inStock: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', desc: 'A5 Japanese Wagyu served with roasted garlic puree.' },
  { id: 'm-3', title: 'Seared Pan Lobster Tail', category: 'Starters', price: 28.50, inStock: true, image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80', desc: 'Garlic butter poached lobster tail with micro herbs.' },
  { id: 'm-4', title: 'Artisanal Burrata Salad', category: 'Starters', price: 18.00, inStock: true, image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a80?auto=format&fit=crop&w=800&q=80', desc: 'Fresh heirloom tomatoes, pesto glaze, and burrata cheese.' },
  { id: 'm-5', title: 'Molten Chocolate Soufflé', category: 'Desserts', price: 14.00, inStock: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', desc: 'Dark Valrhona chocolate molten center with vanilla bean gelato.' },
  { id: 'm-6', title: 'Smoked Oak Old Fashioned', category: 'Beverages', price: 16.50, inStock: true, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', desc: 'Bourbon infused with bitters and flamed orange peel.' }
];

// App State Management
let menuItems = JSON.parse(localStorage.getItem('bistro_menu')) || initialMenuItems;
let reservationsList = JSON.parse(localStorage.getItem('bistro_bookings')) || [];
let cart = JSON.parse(localStorage.getItem('bistro_cart')) || [];
let isDarkMode = true;
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  renderCustomerMenu();
  renderAdminTable();
  renderAdminBookings();
  updateCartUI();
});

function saveMenuState() { localStorage.setItem('bistro_menu', JSON.stringify(menuItems)); }
function saveBookingsState() { localStorage.setItem('bistro_bookings', JSON.stringify(reservationsList)); }
function saveCartState() { localStorage.setItem('bistro_cart', JSON.stringify(cart)); }

// Mode Switcher: Customer Portal vs Client Admin Dashboard vs Settings
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

// Theme Switcher
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

// Customer Menu Render & Filter
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
  container.innerHTML = '';

  const filtered = menuItems.filter(item => {
    const matchCat = currentCategory === 'All' || item.category === currentCategory;
    const matchSearch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full py-12 text-center text-sub">No dishes found matching search criteria.</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = `menu-card card-bg rounded-2xl overflow-hidden border card-border flex flex-col justify-between ${!item.inStock ? 'opacity-60' : ''}`;
    card.innerHTML = `
      <div>
        <div class="relative h-48 overflow-hidden">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">${item.category}</span>
          ${!item.inStock ? '<span class="absolute top-3 right-3 bg-slate-950/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Out of Stock</span>' : ''}
        </div>
        <div class="p-5 space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="font-extrabold text-brand text-base">${item.title}</h3>
            <span class="text-rose-400 font-black text-base">$${item.price.toFixed(2)}</span>
          </div>
          <p class="text-xs text-sub leading-relaxed">${item.desc}</p>
        </div>
      </div>
      <div class="p-5 pt-0">
        <button onclick="addToCart('${item.id}')" ${!item.inStock ? 'disabled' : ''} class="w-full ${item.inStock ? 'bg-rose-500 hover:bg-rose-400' : 'bg-slate-800 cursor-not-allowed'} text-white font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2">
          <i class="fa-solid fa-plus"></i> ${item.inStock ? 'Add to Takeaway Cart' : 'Currently Unavailable'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Shopping Cart Drawer Engine
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
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
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
    row.className = 'flex justify-between items-center bg-slate-900/50 p-3 rounded-xl border card-border text-xs';
    row.innerHTML = `
      <div class="space-y-0.5">
        <h4 class="font-bold text-brand">${item.title}</h4>
        <p class="text-rose-400 font-bold">$${(item.price * item.qty).toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
        <button onclick="updateCartQty('${item.id}', -1)" class="w-6 h-6 text-brand font-bold flex items-center justify-center hover:bg-slate-700 rounded">-</button>
        <span class="font-bold text-brand text-xs px-1">${item.qty}</span>
        <button onclick="updateCartQty('${item.id}', 1)" class="w-6 h-6 text-brand font-bold flex items-center justify-center hover:bg-slate-700 rounded">+</button>
      </div>
    `;
    container.appendChild(row);
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  countBadge.textContent = totalQty;
  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

function handleCheckout() {
  if (cart.length === 0) {
    showToast('Cart is empty!', 'error');
    return;
  }

  cart = [];
  saveCartState();
  updateCartUI();
  toggleCartDrawer();
  showToast('Order placed successfully! Kitchen preparing your meal.', 'success');
}

// Table Booking System
function handleTableBooking(e) {
  e.preventDefault();

  const newBooking = {
    id: 'bk-' + Date.now(),
    name: document.getElementById('bookName').value,
    email: document.getElementById('bookEmail').value,
    date: document.getElementById('bookDate').value,
    time: document.getElementById('bookTime').value,
    guests: document.getElementById('bookGuests').value,
    notes: document.getElementById('bookNotes').value || 'None',
    status: 'Confirmed'
  };

  reservationsList.unshift(newBooking);
  saveBookingsState();
  renderAdminBookings();

  e.target.reset();
  showToast('Table Reservation Confirmed!', 'success');
}

// ADMIN DASHBOARD: MENU & BOOKINGS MANAGEMENT (CRUD)
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
    tr.className = 'hover:bg-slate-900/40 transition';
    tr.innerHTML = `
      <td class="p-4 flex items-center gap-3">
        <img src="${item.image}" class="w-10 h-10 object-cover rounded-xl">
        <div>
          <h4 class="font-bold text-brand text-xs">${item.title}</h4>
          <p class="text-[10px] text-sub truncate max-w-xs">${item.desc}</p>
        </div>
      </td>
      <td class="p-4 text-sub">${item.category}</td>
      <td class="p-4 font-bold text-rose-400">$${item.price.toFixed(2)}</td>
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
    price: parseFloat(document.getElementById('itemPrice').value),
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
    tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-sub">No table reservations recorded yet.</td></tr>`;
    return;
  }

  reservationsList.forEach(b => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-900/40 transition';
    tr.innerHTML = `
      <td class="p-4">
        <h4 class="font-bold text-brand text-xs">${b.name}</h4>
        <p class="text-[10px] text-sub">${b.email}</p>
      </td>
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

// Settings & Auth Handlers
function handleSettingsSave(e) {
  e.preventDefault();
  showToast('Restaurant operating settings updated!', 'success');
}

function handleAuthLogin(e) {
  e.preventDefault();
  closeModal('authModal');
  showToast('Logged in as Restaurant Manager', 'success');
}

// Modal Helpers
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }); }

// Toast System
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
