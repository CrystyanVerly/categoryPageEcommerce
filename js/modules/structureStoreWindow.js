import renderProductsMiniCart from "./renderProductsMiniCart.js";
import warningToast from "./warningToast.js";

export default function structureStoreWindow(eachItemAPI, container) {
  function cleanPrice(product) {
    const priceCleaned = product.toFixed(2).replace(/\./g, ",");
    return priceCleaned;
  }
  const liProduct = document.createElement("li");
  const innerLi = `
    <a class="product-img-container" href="#">
      <img src="${eachItemAPI.image}" alt="${eachItemAPI.name}"/>
    </a>
    <div class="product-description">
      <p class="product-name">
        ${eachItemAPI.name}
      </p>
      <strong class= "product-price">
        R$ ${cleanPrice(eachItemAPI.price)}
      </strong>
      <p class="product-installment">
        Até ${eachItemAPI.parcelamento[0]}x 
        de R$${cleanPrice(eachItemAPI.parcelamento[1])}
      </p>
    </div>
    <button type="button" class="product-btn-buy" >Comprar</button>
  `;

  liProduct.innerHTML = innerLi;
  liProduct.value = eachItemAPI.id;

  const button = liProduct.querySelector(".product-btn-buy");
  button.addEventListener("click", () => {
    renderProductsMiniCart(eachItemAPI.id);
    warningToast();
  });

  container.appendChild(liProduct);
  return liProduct;
}
