import renderProductsMiniCart from "./renderProductsMiniCart";

export default function persistingInMiniCart() {
  const arrBoughtProducts = JSON.parse(
    localStorage.getItem("boughtProducts")
  ) || { items: [], total: 0 };

  const shoppingBagCont = document.querySelector(".count-added-products");
  const modalShoppingCartAmount = document.querySelector(".amount-items-cart");
  const subTotalPurchased = document.querySelector(".total-price-purchase");

  function refreshCountInBagAndModal() {
    const quantityInMiniCart = arrBoughtProducts.items.length;
    shoppingBagCont.innerText = quantityInMiniCart;
    modalShoppingCartAmount.innerText = quantityInMiniCart;
  }

  function cleanPrice(product) {
    const priceCleaned = product.toFixed(2).replace(/\./g, ",");
    return priceCleaned;
  }

  if (arrBoughtProducts.items.length > 0) {
    arrBoughtProducts.items.forEach((product) => {
      const boughtProductID = product.id;
      const boughtProductPrice = product.price;
      const boughtProductAmount = product.amountWished;

      renderProductsMiniCart(boughtProductID);
      refreshCountInBagAndModal();

      const amountItemsWished = document.querySelector(
        `#item-${boughtProductID}`
      );
      const priceProductMiniCart = document.querySelector(
        `#price-${boughtProductID}`
      );

      amountItemsWished.innerText = boughtProductAmount;
      const calculatedPrice = boughtProductAmount * boughtProductPrice;

      priceProductMiniCart.innerText = `R$ ${cleanPrice(calculatedPrice)}`;
      subTotalPurchased.innerText = `${cleanPrice(arrBoughtProducts.total)}`;
    });
  }
}
