const items = [
  { id: 1, name: "Apple", price: 20 },
  { id: 2, name: "Bread", price: 70 },
  { id: 3, name: "Milk", price: 30 },
  { id: 4, name: "Eggs", price: 240 },
  { id: 5, name: "Cheese", price: 30 },
  { id: 5, name: "fish", price: 200 },
  { id: 5, name: "coke 1.5", price: 70 },
  { id: 5, name: "pork 1 kilo", price: 280 },
  { id: 5, name: "chicken 1 kilo", price: 270 },
  { id: 5, name: "beef 1 kilo", price: 300 },
  { id: 5, name: "hotdog 1 kilo", price: 80 },
];

let cart = [];
let total = 0;

// Load items into the store using `map()`
const itemList = document.getElementById("itemList");
itemList.innerHTML = items
  .map(
    (item) => `
      <li>
        ${item.name} - P${item.price.toFixed(2)}
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </li>
    `
  )
  .join("");

// Add item to the cart
function addToCart(itemId) {
  const item = items.find((i) => i.id === itemId);
  cart.push(item);
  total += item.price;

  updateCart();
}

// Update the cart display using `map()`
function updateCart() {
  const cartList = document.getElementById("cartList");
  const totalPrice = document.getElementById("totalPrice");

  cartList.innerHTML = cart
    .map(
      (item, index) => `
      <li>
        ${item.name} - ${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      </li>
    `
    )
    .join("");

  totalPrice.textContent = total.toFixed(2);
}

// Remove item from the cart
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);

  updateCart();
}

// Checkout process
const checkoutButton = document.getElementById("checkoutButton");
const paymentSection = document.querySelector(".payment");
const finalAmount = document.getElementById("finalAmount");
const payButton = document.getElementById("payButton");
const changeDisplay = document.getElementById("changeDisplay");

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  paymentSection.classList.remove("hidden");
  finalAmount.textContent = total.toFixed(2);
});

payButton.addEventListener("click", () => {
  const paymentInput = document.getElementById("paymentInput");
  const payment = parseFloat(paymentInput.value);

  if (!payment || payment < total) {
    alert(
      "Insufficient balance. What payment method do you prefer, cash or card?"
    );

    return;
  } else {
    alert("Paid successfully");
    const change = payment - total;
    changeDisplay.textContent = `Change: P${change.toFixed(2)}`;

    // Reset the cart and total
    cart = [];
    total = 0;

    updateCart();
    paymentInput.value = "";
    paymentSection.classList.add("hidden");
  }
});
