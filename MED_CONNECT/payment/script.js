let cardNumInput = document.querySelector("#cardNum");

cardNumInput.addEventListener("keyup", () => {
  let cNumber = cardNumInput.value;
  cNumber = cNumber.replace(/\s/g, "");

  if (Number(cNumber)) {
    cNumber = cNumber.match(/.{1,4}/g);
    cNumber = cNumber.join(" ");
    cardNumInput.value = cNumber;
  }
});

function myFunction() {
  alert("Thankyou for Purchasing");
  window.location.href=("/SFTWR/MED_CONNECT/cart/store.html");
}
