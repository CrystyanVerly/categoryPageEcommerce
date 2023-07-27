import structureStoreWindow from "./structureStoreWindow.js";

export default function loadMoreProducts() {
  const loadMoreButton = document.querySelector(".btn-load-more");
  const ulProduct = document.querySelector(".products-list");
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));
  const getProductsRenderedFromLS = JSON.parse(
    localStorage.getItem("productsRendered")
  );
  let amountProductsToShow = parseInt(
    10,
    localStorage.getItem("amountProductsToShow")
  );

  function resetProductsRendered() {
    ulProduct.innerHTML = "";
  }

  function addToProducteRendered() {
    const startRenderingIndex = getProductsRenderedFromLS.length;

    for (let i = startRenderingIndex; i < amountProductsToShow; i++) {
      if (i >= getAllProductsFromLS.length) {
        break;
      }

      getProductsRenderedFromLS.push(getAllProductsFromLS[i]);
    }

    localStorage.setItem(
      "productsRendered",
      JSON.stringify(getProductsRenderedFromLS)
    );
  }

  function renderingStoreWindow() {
    resetProductsRendered();

    addToProducteRendered();

    for (let i = 0; i < amountProductsToShow; i++) {
      structureStoreWindow(getAllProductsFromLS[i], ulProduct);
    }
  }

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

  function loadMoreLogic(e) {
    e.preventDefault();

    const remainingProducts =
      getAllProductsFromLS.length - amountProductsToShow;

    if (remainingProducts > 3) {
      if (amountProductsToShow % 2 === 0) {
        amountProductsToShow += 2;
      } else {
        amountProductsToShow += 3;
      }
    } else if (remainingProducts > 0) {
      amountProductsToShow += remainingProducts;
    } else {
      noMoreProducts();
      return;
    }

    if (amountProductsToShow >= getAllProductsFromLS.length) noMoreProducts();
    else moreProducts();
    renderingStoreWindow();
    localStorage.setItem("amountProductsToShow", amountProductsToShow);
  }

  loadMoreButton.addEventListener("click", loadMoreLogic);
}
