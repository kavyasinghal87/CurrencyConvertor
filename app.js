const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const arrow = document.querySelector(".arrow i");
const fromSelect = document.querySelector(".from");
const toSelect = document.querySelector(".to");

window.addEventListener("load", function () {
  updateExchangeRate();
});

arrow.addEventListener("click", function () {
  let tempValue = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempValue;

  let fromImg = document.querySelector(".from img");
  let toImg = document.querySelector(".to img");
  let tempSrc = fromImg.src;
  fromImg.src = toImg.src;
  toImg.src = tempSrc;
});

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", function (evt) {
    updateFlag(evt.target);
  });
}

const updateFlag = function (element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async function () {
  let amount = document.querySelector(".amount input");
  let amt = amount.value;
  if (amt === "" || amt < 1) {
    amt = 1;
    amount.value = "1";
  }
btn.addEventListener("click", async function (evt) {
  evt.preventDefault();
  updateExchangeRate();
});



  const URL = `${BASE_URL}/${fromCurr.value}`;
  let response = await fetch(URL);

  let data = await response.json();

  let rate = data.rates[toCurr.value];
//   console.log(data.rates);
  
  console.log(rate);

  let totalVal = amt * rate;

  msg.innerText = `${amt} ${fromCurr.value} = ${totalVal} ${toCurr.value}`;
};
