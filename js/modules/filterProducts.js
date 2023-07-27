import structureStoreWindow from "./structureStoreWindow.js";
import orderFilter from "./orderFilter.js";
import toggleModalFilter from "./toggleModalFilter.js";

export default function filterProducts() {
  const loadMoreButton = document.querySelector(".btn-load-more");
  const inputToSelect = document.querySelectorAll(".input-filter");
  const productsDOM = document.querySelector(".products-list");
  const sorryNotFound = document.querySelector(".noProductFound");
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));
  const amountProductsToShow = parseInt(
    10,
    localStorage.getItem("amountProductsToShow")
  );

  function noMoreProducts() {
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "Não há mais produtos";
    loadMoreButton.classList.add("black-and-white-button");
  }

  function moreProducts() {
    loadMoreButton.disabled = false;
    loadMoreButton.textContent = "Carregar Mais";
    loadMoreButton.classList.remove("black-and-white-button");
  }

  function handleMutationInputs() {
    const getInputsValuesFromLS = JSON.parse(
      localStorage.getItem("checkedItems")
    );
    const allPricesAPI = getAllProductsFromLS.map((product) => product.price);

    let filteredElementsToLS = [];

    function checkPriceInRange(price, valueInputPrice) {
      const arrPriceRange = [];
      valueInputPrice.forEach((group) => {
        const [min, max] = group.split(",").map(Number);
        if (price >= min && price <= max) {
          arrPriceRange.push(price);
        } else {
          arrPriceRange.push(-1);
        }
      });
      return arrPriceRange;
    }

    const arrValuesInputColors = [];
    const arrValuesInputSizes = [];
    const arrValuesInputPrices = [];

    Object.keys(getInputsValuesFromLS).forEach((key) => {
      const item = getInputsValuesFromLS[key];

      if (item.type === "color") arrValuesInputColors.push(...item.value);

      if (item.type === "size" && !arrValuesInputSizes.includes(item.value))
        arrValuesInputSizes.push(...item.value);

      if (item.type === "price") {
        allPricesAPI.forEach((priceAPI) => {
          arrValuesInputPrices.push(...checkPriceInRange(priceAPI, item.value));
        });
      }
    });

    function resetProductsRendered() {
      productsDOM.innerHTML = "";
    }

    const handleFilters = () => {
      const filterLogicValidation = getAllProductsFromLS.filter((product) => {
        const verifyArrFilteredColor = arrValuesInputColors.includes(
          product.color
        );

        const verifyArrFilteredSize = product.size.some((item) =>
          arrValuesInputSizes.includes(item)
        );

        const verifyArrFilteredPrice = arrValuesInputPrices.includes(
          product.price
        );

        const arrColorsFilteredLEN = arrValuesInputColors.length;
        const arrSizesFilteredLEN = arrValuesInputSizes.length;
        const arrPricesFilteredLEN = arrValuesInputPrices.length;

        if (
          verifyArrFilteredColor ||
          verifyArrFilteredSize ||
          verifyArrFilteredPrice
        ) {
          // color exchange others
          if (
            arrColorsFilteredLEN > 0 &&
            arrSizesFilteredLEN === 0 &&
            arrPricesFilteredLEN === 0
          ) {
            return verifyArrFilteredColor;
          }

          if (
            arrColorsFilteredLEN > 0 &&
            arrSizesFilteredLEN > 0 &&
            arrPricesFilteredLEN === 0
          ) {
            return verifyArrFilteredColor && verifyArrFilteredSize;
          }

          if (
            arrColorsFilteredLEN > 0 &&
            arrSizesFilteredLEN === 0 &&
            arrPricesFilteredLEN > 0
          ) {
            return verifyArrFilteredColor && verifyArrFilteredPrice;
          }

          // size exchange others
          if (
            arrSizesFilteredLEN > 0 &&
            arrColorsFilteredLEN === 0 &&
            arrPricesFilteredLEN === 0
          ) {
            return verifyArrFilteredSize;
          }

          if (
            arrSizesFilteredLEN > 0 &&
            arrColorsFilteredLEN === 0 &&
            arrPricesFilteredLEN > 0
          ) {
            return verifyArrFilteredSize && verifyArrFilteredPrice;
          }

          if (
            arrPricesFilteredLEN > 0 &&
            arrColorsFilteredLEN === 0 &&
            arrSizesFilteredLEN === 0
          ) {
            return verifyArrFilteredPrice;
          }

          if (
            arrSizesFilteredLEN > 0 &&
            arrColorsFilteredLEN > 0 &&
            arrPricesFilteredLEN > 0 &&
            verifyArrFilteredSize &&
            verifyArrFilteredColor &&
            verifyArrFilteredPrice
          ) {
            return true;
          }
        } else {
          return false;
        }

        return (
          verifyArrFilteredColor &&
          verifyArrFilteredSize &&
          verifyArrFilteredPrice
        );
      });

      return filterLogicValidation;
    };

    resetProductsRendered();

    handleFilters().forEach((el) => {
      structureStoreWindow(el, productsDOM);
      filteredElementsToLS = filteredElementsToLS.concat(el);
    });
    localStorage.setItem(
      "productsRendered",
      JSON.stringify(filteredElementsToLS)
    );

    orderFilter();

    function notFoundWarning() {
      const checkBoxInputs = document.querySelectorAll(".form-filter input");
      let amountCheckeds = checkBoxInputs.length;

      for (let i = 0; i < checkBoxInputs.length; i++) {
        if (checkBoxInputs[i].type === "checkbox") {
          if (checkBoxInputs[i].checked) {
            amountCheckeds++;
          } else {
            amountCheckeds--;
          }
        }
      }
      const hasChildren = productsDOM.hasChildNodes();
      const inactiveClass = "inactive";

      if (amountCheckeds > 0 && !hasChildren) {
        sorryNotFound.classList.remove(inactiveClass);
        noMoreProducts();
      }

      if (amountCheckeds > 0 && hasChildren) {
        sorryNotFound.classList.add(inactiveClass);
        moreProducts();
      }

      if (amountCheckeds === 0 && !hasChildren) {
        sorryNotFound.classList.add(inactiveClass);

        for (let i = 0; i < amountProductsToShow; i++) {
          structureStoreWindow(getAllProductsFromLS[i], productsDOM);
        }
        moreProducts();
      }

      if (amountCheckeds > 0) noMoreProducts();
    }
    notFoundWarning();
    toggleModalFilter();
  }

  const observerInputs = new MutationObserver(handleMutationInputs);
  inputToSelect.forEach((input) => {
    observerInputs.observe(input, { attributes: true });
  });
}
