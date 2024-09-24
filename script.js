// let inputtedCash = document.getElementById("cash");
let changeDue = document.getElementById("change-due");
let validPokémon = https://pokeapi-proxy.freecodecamp.rocks/api/pokemon
const purchaseBtn = document.getElementById("purchase-btn");

let displayPrice = document.querySelector(".price-screen");
displayPrice.textContent = `Price: ${price}`;

purchaseBtn.addEventListener("click", (event) => event.preventDefault());
purchaseBtn.addEventListener("click", checkCashRegister);

const fetchData = async () => {
  try {
    const res = await fetch(validPokémon);
    const data = await res.json();
    // showLatestPosts(data);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
