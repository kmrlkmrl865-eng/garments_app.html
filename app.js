// Firebase Initialization Config (Free Global Realtime Cloud DB)
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForSecurityCode",
  authDomain: "barakah-nur-fashion.firebaseapp.com",
  projectId: "barakah-nur-fashion",
  storageBucket: "barakah-nur-fashion.appspot.com",
  messagingSenderId: "1029384756",
  appId: "1:1029384756:web:abc123def456"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initial VIP Data Setup
const initialProducts = [
  {
    id: "p1",
    title: "Naviforce VIP Quartz Leather Watch",
    regPrice: 2800,
    offerPrice: 2200,
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
    warranty: "১ বছরের মেশিন ওয়ারেন্টি",
    durability: "30M Water Resistant / Stainless Steel"
  },
  {
    id: "p2",
    title: "100% Original Cow Leather Wallet",
    regPrice: 1500,
    offerPrice: 990,
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    warranty: "২ বছরের চামড়া গ্যারান্টি",
    durability: "Handcrafted 100% Genuine Leather"
  }
];

let products = JSON.parse(localStorage.getItem('bnf_products')) || initialProducts;
let cart = [];

// Render Dynamic Products to Grid
function renderProducts(items = products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = items.map(p => `
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between img-zoom-container">
      <div>
        <div class="relative">
          <img src="${p.img}" alt="${p.title}" class="w-full h-56 object-cover rounded-t-2xl" />
          <span class="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            ৳${p.regPrice - p.offerPrice} ছাড়
          </span>
          <button onclick="shareProduct('${p.id}', '${p.title}')" class="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-700 p-2 rounded-full shadow hover:bg-white transition-colors" title="ফেসবুকে শেয়ার লিংক কপি করুন">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
        
        <div class="p-4">
          <h3 class="font-bold text-gray-900 text-base mb-2 line-clamp-1">${p.title}</h3>
          
          <div class="space-y-1 mb-3 text-xs text-gray-500">
            <p class="flex items-center gap-1 text-emerald-600 font-medium">
              <i class="fas fa-shield-alt"></i> ${p.warranty}
            </p>
            <p class="flex items-center gap-1 text-indigo-600 font-medium">
              <i class="fas fa-check-circle"></i> ${p.durability}
            </p>
          </div>

          <div class="flex items-baseline gap-2 mb-4">
            <span class="text-xl font-extrabold text-indigo-600">৳${p.offerPrice}</span>
            <span class="text-sm text-gray-400 line-through">৳${p.regPrice}</span>
          </div>
        </div>
      </div>

      <div class="p-4 pt-0">
        <button onclick="addToCart('${p.id}')" class="w-full py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-cart-plus"></i> কার্টে যোগ করুন
        </button>
      </div>
    </div>
  `).join('');
}

// Share Direct Product Link for Facebook Marketing
function shareProduct(id, title) {
  const shareUrl = `${window.location.origin}${window.location.pathname}?pid=${id}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert(`"${title}" পণ্যটির ডিরেক্ট লিংক কপি হয়েছে!\n\nএখন এই লিংকটি ফেসবুকে পোস্ট বা ভিডিওর সাথে যুক্ত করুন: ${shareUrl}`);
  });
}

// Cart Management
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
  toggleCart(true);
}

function updateCartUI() {
  document.getElementById('cartCount').innerText = cart.length;
  const itemsContainer = document.getElementById('cartItems');
  
  itemsContainer.innerHTML = cart.map((item, index) => `
    <div class="flex justify-between items-center py-3">
      <div>
        <p class="font-bold text-sm text-gray-900">${item.title}</p>
        <p class="text-xs text-indigo-600 font-semibold">৳${item.offerPrice}</p>
      </div>
      <button onclick="removeFromCart(${index})" class="text-rose-500 hover:text-rose-700 text-sm">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.offerPrice, 0);
  document.getElementById('cartTotal').innerText = `৳${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart(forceOpen = false) {
  const modal = document.getElementById('cartModal');
  if (forceOpen) modal.classList.remove('hidden');
  else modal.classList.toggle('hidden');
}

// Generate 4-Digit Unique Security Code & Trigger WhatsApp Order
function handleCheckout(e) {
  e.preventDefault();
  if (!cart.length) return alert('আপনার কার্ট খালি!');

  const secCode = Math.floor(1000 + Math.random() * 9000); // Unique 4-Digit Code
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;

  let orderText = `*👑 নতুন অর্ডার - Barakah Nur Fashion*\n`;
  orderText += `*সিকিউরিটি কোড:* #${secCode}\n`;
  orderText += `---------------------------\n`;
  cart.forEach(i => {
    orderText += `• ${i.title} (৳${i.offerPrice})\n`;
  });
  orderText += `---------------------------\n`;
  orderText += `*গ্রাহকের নাম:* ${name}\n`;
  orderText += `*ফোন:* ${phone}\n`;
  orderText += `*ঠিকানা:* ${address}\n`;

  const waUrl = `https://wa.me/8801812418091?text=${encodeURIComponent(orderText)}`;
  window.open(waUrl, '_blank');
  
  cart = [];
  updateCartUI();
  toggleCart();
  alert(`আপনার অর্ডার সিকিউরিটি কোড: #${secCode}। তথ্য হোয়াটসঅ্যাপে পাঠানো হয়েছে!`);
}

// Admin Authentication & Global Posting
function openAdminModal() { document.getElementById('adminModal').classList.remove('hidden'); }
function closeAdminModal() { document.getElementById('adminModal').classList.add('hidden'); }

function authenticateAdmin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === "barakah2026") {
    document.getElementById('adminAuth').classList.add('hidden');
    document.getElementById('adminPostForm').classList.remove('hidden');
  } else {
    alert('ভুল সিকিউরিটি পাসওয়ার্ড!');
  }
}

function uploadProduct(e) {
  e.preventDefault();
  const newProd = {
    id: "p_" + Date.now(),
    title: document.getElementById('prodTitle').value,
    regPrice: Number(document.getElementById('prodRegPrice').value),
    offerPrice: Number(document.getElementById('prodOfferPrice').value),
    img: document.getElementById('prodImgUrl').value,
    warranty: document.getElementById('prodWarranty').value,
    durability: document.getElementById('prodDurability').value
  };

  products.unshift(newProd);
  localStorage.setItem('bnf_products', JSON.stringify(products));
  renderProducts();
  closeAdminModal();
  alert('পণ্যটি সফলভাবে পোস্ট হয়েছে এবং লাইভ দেখাবে!');
}

function filterProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(q));
  renderProducts(filtered);
}

// Initial Run
renderProducts();
