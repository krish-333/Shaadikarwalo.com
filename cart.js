// cart.js

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCartItem(name, price) {
  let cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  renderCart(); // Will not fail if not defined
}

function renderCart() {
  const cartList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (!cartList || !cartTotal || !cartCount) return;

  let cart = getCart();
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price.toLocaleString()}
      <button onclick="removeFromCart(${index})" style="margin-left:10px; background:#ff4d4d; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Remove</button>`;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}
