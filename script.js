const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 1350,
    category: "celulares",
    image: "IMG/15.avif"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 720,
    category: "celulares",
    image: "IMG/s23.png"
  },
  {
    id: 3,
    name: "AirPods Pro Original",
    price: 180,
    category: "accesorios",
    image: "IMG/airpods.jpg"
  },
  {
    id: 4,
    name: "Cargador Fast Charge",
    price: 25,
    category: "accesorios",
    image: "IMG/cargador.png"
  }
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

function renderProducts(list) {
  productsContainer.innerHTML = "";
  list.forEach(p => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <p>${item.name} - $${item.price}
      <button onclick="removeItem(${index})">❌</button></p>
    `;
  });

  totalEl.textContent = total;
  cartCount.textContent = cart.length;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function showCategory(cat) {
  if (cat === "all") {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.category === cat));
  }
}

function searchProduct() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  renderProducts(products.filter(p =>
    p.name.toLowerCase().includes(value)
  ));
}

/* WHATSAPP CHECKOUT */
function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let message = "Hola Safe Mobile 👋%0AQuiero comprar:%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - $${item.price}%0A`;
    total += item.price;
  });

  message += `%0A🧾 Total: $${total}%0A%0AGracias!`;

  const phone = "18090000000"; // 👈 CAMBIA AL NÚMERO REAL
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

renderProducts(products);
