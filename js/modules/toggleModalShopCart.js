export default function toggleModalShopCart() {
  const modalShoppingCartContainer = document.querySelector(
    ".modal-shopping-cart-container"
  );
  const shoppingBagContainer = document.querySelector(
    ".container-count-added-products"
  );
  const modalShoppingCartCloseBTN = document.querySelector(
    ".amount-items-cart-container img"
  );
  const modalOverLay = document.querySelector(".modal-overlay");

  function closeModalShoppingCart() {
    if (modalShoppingCartContainer.classList.contains("open")) {
      modalShoppingCartContainer.style.animation =
        "closeShoppingCart 0.3s forwards";
    }

    setTimeout(() => {
      modalShoppingCartContainer.style.animation = "";
      modalShoppingCartContainer.style.display = "none";
      modalShoppingCartContainer.classList.remove("open");
      modalOverLay.classList.remove("open");
    }, 300);
  }

  function openModalShoppingCart(e) {
    e.preventDefault();
    modalShoppingCartContainer.style.animation =
      "openShoppingCart 0.3s forwards";
    modalShoppingCartContainer.style.display = "block";
    modalShoppingCartContainer.classList.add("open");
    modalOverLay.classList.add("open");
  }

  function closeOnOutsideClick(e) {
    if (
      e.target !== modalShoppingCartContainer &&
      !modalShoppingCartContainer.contains(e.target)
    ) {
      closeModalShoppingCart();
    }
  }

  shoppingBagContainer.addEventListener("click", openModalShoppingCart);
  modalShoppingCartCloseBTN.addEventListener("click", closeModalShoppingCart);
  modalOverLay.addEventListener("click", closeOnOutsideClick);
}
