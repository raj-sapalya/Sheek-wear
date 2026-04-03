// ===== CUSTOM CURSOR (SAFE VERSION) =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('button, a, .coord-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}


// ===== SIZE SELECT =====
function selectSize(btn) {
  const allSizes = btn.parentElement.querySelectorAll('.size-btn');
  allSizes.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}


// ===== CART SYSTEM =====
let cart = [];

document.querySelectorAll('.btn-explore').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.coord-item');

    const name = item.querySelector('.coord-name').innerText;
    const price = item.querySelector('.coord-price').innerText;
    const sizeEl = item.querySelector('.size-btn.active');

    const size = sizeEl ? sizeEl.innerText : "M";

    cart.push({ name, price, size });

    updateCart();
  });
});


function updateCart() {
  const cartBox = document.getElementById('cartBox');
  const cartItems = document.getElementById('cartItems');

  cartBox.style.display = "block";
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty</li>";
    return;
  }

  cart.forEach((p, index) => {
    const li = document.createElement('li');
    li.innerText = `${p.name} (${p.size}) - ${p.price}`;

    cartItems.appendChild(li);
  });

  document.querySelector('.nav-links li:last-child a').innerText = `Cart (${cart.length})`;
}


// ===== TOGGLE CART =====
function toggleCart() {
  const cartBox = document.getElementById('cartBox');

  if (!cartBox) return;

  cartBox.style.display =
    cartBox.style.display === "block" ? "none" : "block";
}