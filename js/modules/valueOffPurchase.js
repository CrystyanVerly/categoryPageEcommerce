export default function valueOffPurchase() {
  const cepBTN = document.querySelector(".cep-container p");
  const offBTN = document.querySelector(".coupon-container p");

  function appearInput() {
    const previousInput = this.previousElementSibling;
    this.style.display = "none";
    previousInput.classList.remove("hide");
  }

  cepBTN.addEventListener("click", appearInput);
  offBTN.addEventListener("click", appearInput);
}
