export default function valueOffPurchase() {
  const cepBTN = document.querySelector(".cep-container p");
  const offBTN = document.querySelector(".coupon-container p");

  const inputCEP = document.querySelector(".cep-input");
  const inputOFF = document.querySelector(".coupon-input");

  function appearInput() {
    const previousInput = this.previousElementSibling;
    this.style.display = "none";
    previousInput.classList.remove("hide");
  }

  cepBTN.addEventListener("click", appearInput);
  offBTN.addEventListener("click", appearInput);
}
