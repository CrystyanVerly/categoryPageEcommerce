import structureProductsMiniCart from "./structureProductsMiniCart.js";

export default function renderProductsMiniCart(productId) {
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));
  const ulModalProduct = document.querySelector(".shopping-cart-list");
  let arrBoughtProducts = JSON.parse(
    localStorage.getItem("boughtProducts")
  ) || { items: [], total: 0 };

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
    subTotalPurchased.innerText = cleanPrice(Number(subTotalNumber.toFixed(2)));
  }

  function updatePriceOnDecrement(productPrice) {
    subTotalNumber -= productPrice;
    subTotalPurchased.innerText = cleanPrice(Number(subTotalNumber.toFixed(2)));
  }

  function productExistsInItems(items, productId) {
    return items.some((item) => item.id === productId);
  }

  function setBoughtItemsInLS(key, value) {
    const arrBoughtProducts = JSON.parse(
      localStorage.getItem("boughtProducts")
    ) || {
      items: [],
      total: 0,
    };

    const newItems = value.items.filter(
      (product) => !productExistsInItems(arrBoughtProducts.items, product.id)
    );

    let newTotal = arrBoughtProducts.total;
    newItems.forEach((item) => {
      newTotal += item.price;
    });

    const object = {
      items: [...arrBoughtProducts.items, ...newItems],
      total: Number(newTotal.toFixed(2)),
    };

    localStorage.setItem(key, JSON.stringify(object));
  }

  getAllProductsFromLS.forEach((product) => {
    const boughtProductID = product.id;
    product.amountWished = 1;
    if (Number(productId) === Number(boughtProductID)) {
      if (
        !arrBoughtProducts.items.some((item) => item.id === boughtProductID) &&
        !ulModalProduct.querySelector(`#cart-item-${boughtProductID}`)
      ) {
        arrBoughtProducts.items.push(product);

        setBoughtItemsInLS("boughtProducts", arrBoughtProducts);
      }
    }
  });

  if (arrBoughtProducts.items.length > 0) {
    arrBoughtProducts.items.forEach((bought) => {
      const boughtProductID = bought.id;
      const boughtProductPrice = bought.price;
      const boughtProductAmount = bought.amountWished;

      if (!ulModalProduct.querySelector(`#cart-item-${boughtProductID}`)) {
        if (arrQuantityStock.length > 0) {
          arrQuantityStock.forEach((stock) => {
            const quantityID = stock.id;
            if (boughtProductID === quantityID) {
              structureProductsMiniCart(bought, ulModalProduct, stock);
              updatePriceOnIncrement(boughtProductPrice);
              addCountToBag();
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
      numAmountWished = boughtProductAmount;

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

      if (
        minusBTN &&
        plusBTN &&
        amountItemsWished &&
        removeItemBTN &&
        priceProductMiniCart &&
        quantityStock
      ) {
        function setItemInLS(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
        }
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
          removeCountFromBag();

          arrBoughtProducts.items = arrBoughtProducts.items.filter(
            (item) => item.id !== boughtProductID
          );

          updatePriceOnDecrement(boughtProductPrice * numAmountWished);
          arrBoughtProducts.total = Number(subTotalNumber.toFixed(2));

          setItemInLS("boughtProducts", arrBoughtProducts);
        }

        function handlePriceProduct() {
          const calculatedPrice = numAmountWished * boughtProductPrice;
          return (priceProductMiniCart.innerText = `R$ ${cleanPrice(
            calculatedPrice
          )}`);
        }

        function incrementAmount() {
          numAmountWished++;
          handlePriceProduct();
          updatePriceOnIncrement(boughtProductPrice);
          arrBoughtProducts.total = Number(subTotalNumber.toFixed(2));

          maximumAmountStock();
          bought.amountWished = numAmountWished;
          amountItemsWished.innerText = bought.amountWished;
          setItemInLS("boughtProducts", arrBoughtProducts);
        }

        function decrementAmount() {
          if (numAmountWished > 0) {
            numAmountWished--;
            handlePriceProduct();
            updatePriceOnDecrement(boughtProductPrice);
            bought.amountWished = numAmountWished;
            amountItemsWished.innerText = bought.amountWished;
            arrBoughtProducts.total = Number(subTotalNumber.toFixed(2));
            setItemInLS("boughtProducts", arrBoughtProducts);
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

        amountProductMiniCart();
        maximumAmountStock();

        removeItemBTN.addEventListener("click", function () {
          const itemInCartToRemove = this.closest(".cart-item");
          removeProductFromCart(itemInCartToRemove);
        });
      }
    });
  }
}
