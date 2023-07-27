import renderProducts from "./modules/renderProducts.js";
import fetchStock from "./modules/fetchStock.js";
import renderFilter from "./modules/renderFilter.js";
import capturingToFilter from "./modules/capturingToFilter.js";
import filterProducts from "./modules/filterProducts.js";
import toggleModalFilter from "./modules/toggleModalFilter.js";
import accordionColors from "./modules/accordionColors.js";
import loadMoreProducts from "./modules/loadMoreProducts.js";
import toggleModalShopCart from "./modules/toggleModalShopCart.js";
import accordionResponsiveFilter from "./modules/accordionResponsiveFilter.js";
import valueOffPurchase from "./modules/valueOffPurchase.js";

renderProducts().then(() => {
  fetchStock().then(() => {
    renderFilter();
    capturingToFilter(".input-filter");
    filterProducts();
    toggleModalFilter();
    accordionColors();
    loadMoreProducts();
    toggleModalShopCart();
    accordionResponsiveFilter();
    valueOffPurchase();
  });
});
