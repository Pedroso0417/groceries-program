// Items list
const items = [
  { id: 1, name: "Apple", price: 20 },
  { id: 2, name: "Bread", price: 70 },
  { id: 3, name: "Milk", price: 30 },
  { id: 4, name: "Eggs", price: 240 },
  { id: 5, name: "Cheese", price: 30 },
  { id: 6, name: "Fish", price: 200 },
  { id: 7, name: "Coke 1.5L", price: 70 },
  { id: 8, name: "Pork 1 Kilo", price: 280 },
  { id: 9, name: "Chicken 1 Kilo", price: 270 },
  { id: 10, name: "Beef 1 Kilo", price: 300 },
  { id: 11, name: "Hotdog 1 Kilo", price: 80 }
];

let cart = [];
let total = 0;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const openModalBtn = document.getElementById('openModalBtn');
const itemList = document.getElementById('itemList');
const cartList = document.getElementById('cartList');
const totalPrice = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');
const paymentSection = document.querySelector('.payment');
const finalAmount = document.getElementById('finalAmount');
const payButton = document.getElementById('payButton');
const changeDisplay = document.getElementById('changeDisplay');

// Login Button Event
document.getElementById('loginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === "admin" && password === "admin123") { // Replace with your authentication logic
    console.log("Login successful!"); // For debugging
    loginForm.style.display = "none"; // Hide login form
    openModalBtn.style.display = "block"; // Show cart button
  } else {
    document.getElementById('loginError').textContent = "Invalid credentials!";
  }
});

// Open the modal
openModalBtn.addEventListener('click', () => {
  console.log("Opening modal..."); // Debugging
  document.getElementById('myModal').style.display = 'block';
  openModalBtn.style.display = "none"; // Hide cart button after opening modal
});

// Close the modal
document.querySelector('.close-button').addEventListener('click', () => {
  console.log("Closing modal..."); // Debugging
  document.getElementById('myModal').style.display = 'none';
  openModalBtn.style.display = "block"; // Show cart button when modal is closed
});

// Render items dynamically
itemList.innerHTML = items
  .map(item => `
    <li>
      ${item.name} - P${item.price.toFixed(2)} 
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    </li>
  `)
  .join("");

// Function to add item to the cart
function addToCart(itemId) {
  const item = items.find(i => i.id === itemId);
  cart.push(item);
  total += item.price;
  updateCart();
}

// Update the cart list
function updateCart() {
  cartList.innerHTML = cart
    .map((item, index) => `
      <li>
        ${item.name} - P${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      </li>
    `)
    .join("");
  totalPrice.textContent = total.toFixed(2);
}

// Remove item from the cart
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// Checkout functionality
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  paymentSection.classList.remove("hidden");
  finalAmount.textContent = total.toFixed(2);
});

// Payment functionality
payButton.addEventListener("click", () => {
  const paymentInput = document.getElementById("paymentInput");
  const payment = parseFloat(paymentInput.value);

  // Validation to ensure payment is valid
  if (isNaN(payment) || payment <= 0) {
    alert("Please enter a valid payment amount!");
    return;
  }

  if (payment < total) {
    alert("Insufficient funds. Please enter a higher amount.");
    return;
  }

  const change = payment - total;
  changeDisplay.textContent = `Change: P${change.toFixed(2)}`;

  // Reset cart and total after payment
  cart = [];
  total = 0;
  updateCart();
  paymentInput.value = "";
  paymentSection.classList.add("hidden");
  alert("Payment successful!");
});
