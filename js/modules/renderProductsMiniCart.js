import structureProductsMiniCart from "./structureProductsMiniCart.js";

export default function renderProductsMiniCart(productId) {
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));
  const ulModalProduct = document.querySelector(".shopping-cart-list");
  let arrBoughtProducts =
    JSON.parse(localStorage.getItem("boughtProducts")) || [];

  const shoppingBagCont = document.querySelector(".count-added-products");
  const modalShoppingCartAmount = document.querySelector(".amount-items-cart");

  let countBag = Number(shoppingBagCont.innerText);
  const subTotalPurchased = document.querySelector(".total-price-purchase");
  let subTotalNumber = parseFloat(
    subTotalPurchased.innerText.replace(",", ".")
  );

  const arrQuantityStock =
    JSON.parse(localStorage.getItem("quantityStock")) || [];

  function cleanPrice(product) {
    const priceCleaned = product.toFixed(2).replace(/\./g, ",");
    return priceCleaned;
  }

  function addCountToBag() {
    countBag++;
    shoppingBagCont.innerText = countBag;
    modalShoppingCartAmount.innerText = countBag;
  }

  function removeCountFromBag() {
    countBag--;
    shoppingBagCont.innerText = countBag;
    modalShoppingCartAmount.innerText = countBag;
  }

  function updatePriceOnIncrement(productPrice) {
    subTotalNumber += productPrice;
    subTotalPurchased.innerText = cleanPrice(subTotalNumber);
  }

  function updatePriceOnDecrement(productPrice) {
    subTotalNumber -= productPrice;
    subTotalPurchased.innerText = cleanPrice(subTotalNumber);
  }

  function setBoughtItemsInLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const processedIds = new Set();

  getAllProductsFromLS.forEach((product) => {
    const boughtProductID = product.id;
    const boughtProductPrice = product.price;
    if (
      !processedIds.has(boughtProductID) &&
      Number(productId) === Number(boughtProductID) &&
      !ulModalProduct.querySelector(`#cart-item-${boughtProductID}`)
    ) {
      if (!arrBoughtProducts.some((item) => item.id === boughtProductID)) {
        arrBoughtProducts.push(product);
      }
      processedIds.add(boughtProductID);

      setBoughtItemsInLS("boughtProducts", arrBoughtProducts);
      addCountToBag();
      updatePriceOnIncrement(boughtProductPrice);
    }
  });

  if (arrBoughtProducts.length > 0) {
    arrBoughtProducts.forEach((bought) => {
      const boughtProductID = bought.id;
      const boughtProductPrice = bought.price;

      if (!ulModalProduct.querySelector(`#cart-item-${boughtProductID}`)) {
        if (arrQuantityStock.length > 0) {
          arrQuantityStock.forEach((stock) => {
            const quantityID = stock.id;
            if (boughtProductID === quantityID) {
              structureProductsMiniCart(bought, ulModalProduct, stock);
            }
          });
        }
      }
      const minusBTN = document.querySelector(
        `#decrement-item-${boughtProductID}`
      );
      const plusBTN = document.querySelector(
        `#increment-item-${boughtProductID}`
      );
      const amountItemsWished = document.querySelector(
        `#item-${boughtProductID}`
      );
      let numAmountWished = Number(amountItemsWished.innerText);

      const removeItemBTN = document.querySelector(
        `.fa-trash-can[value="${boughtProductID}"]`
      );

      const priceProductMiniCart = document.querySelector(
        `#price-${boughtProductID}`
      );

      const quantityStock = document.querySelector(
        `#quantity-item-${boughtProductID}`
      );
      const quantityStockFormatted = Number(
        quantityStock.innerText.replace(" disponíveis", "").trim()
      );

      function maximumAmountStock() {
        if (numAmountWished === quantityStockFormatted) {
          quantityStock.classList.add("maximum");
        }
        if (numAmountWished !== quantityStockFormatted) {
          quantityStock.classList.remove("maximum");
        }
      }

      function removeProductFromCart(itemInCartToRemove) {
        itemInCartToRemove.remove();

        processedIds.delete(boughtProductID);
        removeCountFromBag();

        arrBoughtProducts = arrBoughtProducts.filter(
          (item) => item.id !== boughtProductID
        );

        updatePriceOnDecrement(boughtProductPrice * numAmountWished);
        setBoughtItemsInLS("boughtProducts", arrBoughtProducts);
      }

      function handlePriceProduct() {
        const calculatedPrice = numAmountWished * boughtProductPrice;
        priceProductMiniCart.innerText = `R$ ${cleanPrice(calculatedPrice)}`;
      }

      function incrementAmount() {
        numAmountWished++;
        amountItemsWished.innerText = numAmountWished;
        handlePriceProduct();
        updatePriceOnIncrement(boughtProductPrice);
        maximumAmountStock();
      }

      function decrementAmount() {
        if (numAmountWished > 0) {
          numAmountWished--;
          amountItemsWished.innerText = numAmountWished;
          handlePriceProduct();
          updatePriceOnDecrement(boughtProductPrice);
        }
        if (numAmountWished < 1) {
          const itemInCartToRemove = minusBTN.closest(".cart-item");
          removeProductFromCart(itemInCartToRemove);
          handlePriceProduct();
          updatePriceOnDecrement(boughtProductPrice * numAmountWished);
        }
        maximumAmountStock();
      }

      function amountProductMiniCart() {
        minusBTN.addEventListener("click", decrementAmount);
        plusBTN.addEventListener("click", () => {
          if (numAmountWished < quantityStockFormatted) {
            incrementAmount();
          }
        });
      }

      if (
        removeItemBTN &&
        amountItemsWished &&
        numAmountWished &&
        priceProductMiniCart &&
        minusBTN &&
        plusBTN
      ) {
        amountProductMiniCart();
        maximumAmountStock();

        removeItemBTN.addEventListener("click", function () {
          const itemInCartToRemove = this.closest(".cart-item");
          removeProductFromCart(itemInCartToRemove);
        });
      }
    });
  }

  window.onbeforeunload = function () {
    localStorage.removeItem("boughtProducts");
  };
}
