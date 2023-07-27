import fetchProducts from "./fetchProducts.js";
import structureStoreWindow from "./structureStoreWindow.js";
import orderFilter from "./orderFilter.js";

export default async function renderProducts() {
  const getAllProductsFromLS = await fetchProducts();
  let getProductsRenderedFromLS =
    JSON.parse(localStorage.getItem("productsRendered")) || [];
  const ulProduct = document.querySelector(".products-list");
  let amountProductsToShow;

  const innerClientScreenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  if (innerClientScreenWidth > 565) amountProductsToShow = 9;
  else amountProductsToShow = 4;

  function renderingStoreWindow() {
    if (getProductsRenderedFromLS.length > 0) {
      getProductsRenderedFromLS = getAllProductsFromLS.slice(
        0,
        amountProductsToShow
      );
    }

    localStorage.setItem(
      "productsRendered",
      JSON.stringify(getProductsRenderedFromLS)
    );

    for (let i = 0; i < amountProductsToShow; i++) {
      structureStoreWindow(getAllProductsFromLS[i], ulProduct);
    }
  }

  localStorage.setItem("amountProductsToShow", amountProductsToShow);
  renderingStoreWindow();
  orderFilter();
}
