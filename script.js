// let inputtedCash = document.getElementById("cash");
let changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let displayPrice = document.querySelector(".price-screen");
displayPrice.textContent = `Price: ${price}`;

purchaseBtn.addEventListener("click", (event) => event.preventDefault());
purchaseBtn.addEventListener("click", checkCashRegister);

// When ENTER KEY is pressed to continue
// cash.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//   }
// });
