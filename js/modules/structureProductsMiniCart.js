export default function structureProductsMiniCart(
  itemBoughtAPI,
  container,
  stockItem
) {
  function cleanPrice(product) {
    const priceCleaned = product.toFixed(2).replace(/\./g, ",");
    return priceCleaned;
  }

  const liBoughtProducts = document.createElement("li");
  const innerLiBoughtProducts = `
      <img
        src="${itemBoughtAPI.image}"
        class="img-bought-product"
        alt="${itemBoughtAPI.name}"
      />
      <div class="icon-del-item-container">
        <i class="fa-regular fa-trash-can" value="${itemBoughtAPI.id}"></i>
      </div>
      <div class="info-product-cart-container">
        <p class="name-product-shopping-cart">${itemBoughtAPI.name}</p>
        <div class="price-and-amountCTRL-container">
          <div class="price-stock-container">
            <span class="price-product" id="price-${itemBoughtAPI.id}">
              R$ ${cleanPrice(itemBoughtAPI.price)}
            </span>
            <span class="quantity-stock" id="quantity-item-${itemBoughtAPI.id}">
              ${stockItem.quantity} disponíveis
            </span>
          </div>
          <div class="add-or-remove-amount-container">
            <button type="button" class="amount-item-btn-ctrl" id="decrement-item-${
              itemBoughtAPI.id
            }">
              <img src="img/minus.svg" alt="minus item btn" />
            </button>
            <span class="amount-items-wished" id="item-${itemBoughtAPI.id}"> 
            ${itemBoughtAPI.amountWished} 
            </span>
            <button type="button" class="amount-item-btn-ctrl" id="increment-item-${
              itemBoughtAPI.id
            }">
              <img src="img/plus.svg" alt="plus item btn" />
            </button>
          </div>
        </div>
      </div>
    `;

  liBoughtProducts.innerHTML = innerLiBoughtProducts;
  liBoughtProducts.value = itemBoughtAPI.id;
  liBoughtProducts.id = `cart-item-${itemBoughtAPI.id}`;
  liBoughtProducts.classList.add(`cart-item`);

  container.appendChild(liBoughtProducts);
}
