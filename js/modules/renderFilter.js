import structureInputColorFilter from "./structureInputColorFilter.js";
import structureInputSizeFilter from "./structureInputSizeFilter.js";

export default function renderFilter() {
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));

  function renderingInputColorFilter() {
    const allColorsOrderedAPI = getAllProductsFromLS
      .map((product) => product.color)
      .sort();
    const allColorsInAPI = [...new Set(allColorsOrderedAPI)];

    allColorsInAPI.forEach((color) => {
      structureInputColorFilter(color);
    });
  }

  if (getAllProductsFromLS.length > 0) {
    renderingInputColorFilter();
    structureInputSizeFilter(getAllProductsFromLS);
  }
}
