// let inputtedCash = document.getElementById("cash");
let changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
// let cash = inputtedCash.value;
let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let displayPrice = document.querySelector(".price-screen");
displayPrice.textContent = `Price: ${price}`;

// // Denominations in cents for easier calculations
// const currencyUnit = [
//   ["PENNY", 0.01],
//   ["NICKEL", 0.05],
//   ["DIME", 0.1],
//   ["QUARTER", 0.25],
//   ["ONE", 1],
//   ["FIVE", 5],
//   ["TEN", 10],
//   ["TWENTY", 20],
//   ["ONE HUNDRED", 100],
// ];

function checkCashRegister() {
  let inputtedCash = document.getElementById("cash");
  let cash = inputtedCash.value;
  let cashInt = parseFloat(cash);

  // Calculate total cash in drawer (cid)
  let change = Number((cashInt - price).toFixed(2));
  let totalCid = Number(
    cid.reduce((total, sum) => total + sum[1], 0).toFixed(2)
  );
  console.log(typeof cashInt);
  console.log(typeof price);
  // Some checks
  if (cashInt < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashInt === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  } else if (cash.value === "") {
    return;
  }

  if (change > totalCid) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const denominationNames = [
    "ONE HUNDRED",
    "TWENTY",
    "TEN",
    "FIVE",
    "ONE",
    "QUARTER",
    "DIME",
    "NICKEL",
    "PENNY",
  ];
  let changeArr = [];
  let cidCopy = [...cid];

  for (let i = 0; i < denominations.length; i++) {
    let totalDenom = 0;
    while (
      change >= denominations[i] &&
      cidCopy[cidCopy.length - 1 - i][1] > 0
    ) {
      cidCopy[cidCopy.length - 1 - i][1] = Number(
        (cidCopy[cidCopy.length - 1 - i][1] - denominations[i]).toFixed(2)
      );
      change = Number((change - denominations[i]).toFixed(2));
      totalDenom += denominations[i];
    }

    if (totalDenom > 0) {
      changeArr.push([denominationNames[i], totalDenom]);
    }
  }

  if (change > 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let remainingCid = cidCopy.reduce((total, sum) => total + sum[1], 0);
  if (remainingCid === 0) {
    changeDue.innerHTML =
      "Status: CLOSED " +
      changeArr.map((cash) => `${cash[0]}: $${cash[1].toFixed(2)}`).join(" ");
    cid = cid.map((denom) => [denom[0], 0]);
  } else {
    changeDue.innerHTML =
      "Status: <b>OPEN</b> <br><br>" +
      changeArr
        .map((cash) => `<b>${cash[0]}</b>: $${cash[1].toFixed(2)} <br>`)
        .join(" ");
    cid = cidCopy;
  }
}

purchaseBtn.addEventListener("click", (event) => event.preventDefault());
purchaseBtn.addEventListener("click", checkCashRegister);

// When ENTER KEY is pressed to continue
// cash.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//   }
// });
