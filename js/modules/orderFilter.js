import structureStoreWindow from "./structureStoreWindow.js";
import outSideClick from "./outSideClick.js";

export default function orderFilter() {
  const getAllProductsFromLS = JSON.parse(localStorage.getItem("AllProducts"));

  const getProductsRenderedFromLS = JSON.parse(
    localStorage.getItem("productsRendered")
  );
  const accordionBtn = document.querySelector(".accordion-btn");
  const accordionArrow = document.querySelector(".accordion-btn img");

  const accordionContent = document.querySelector(".accordion-content");
  const productsDOM = document.querySelector(".products-list");

  const closeModalFilterRight = document.querySelector(
    ".close-modal-filter.filterRight"
  );
  const modalOverLay = document.querySelector(".modal-overlay");

  const innerScreenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  function resetProductsRendered() {
    productsDOM.innerHTML = "";
  }

  function renderProducts(by) {
    if (!getProductsRenderedFromLS || getProductsRenderedFromLS.length === 0) {
      getAllProductsFromLS.sort(by).forEach((orderedProduct) => {
        structureStoreWindow(orderedProduct, productsDOM);
      });
    } else {
      getProductsRenderedFromLS.sort(by).forEach((orderedProduct) => {
        structureStoreWindow(orderedProduct, productsDOM);
      });
    }
  }

  function orderFilterChanged(event) {
    const selectedValue = event.target.value;

    function compareByID(a, b) {
      return a.id - b.id;
    }

    function compareByLatestRealeaseDate(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    }

    function compareForLowestPrice(a, b) {
      return a.price - b.price;
    }

    function compareForHigherPrice(a, b) {
      return b.price - a.price;
    }

    if (selectedValue === "orderBy") {
      resetProductsRendered();
      renderProducts(compareByID);
    }
    if (selectedValue === "newers") {
      resetProductsRendered();
      renderProducts(compareByLatestRealeaseDate);
    }
    if (selectedValue === "cheaper") {
      resetProductsRendered();
      renderProducts(compareForLowestPrice);
    }
    if (selectedValue === "expensive") {
      resetProductsRendered();
      renderProducts(compareForHigherPrice);
    }
  }

  function toggleArrow() {
    accordionArrow.classList.toggle("toRotate");
  }

  function toggleOverLayer() {
    modalOverLay.classList.toggle("open");
  }

  function toggleAccordion() {
    accordionContent.classList.toggle("hide");
    toggleArrow();

    if (innerScreenWidth <= 588) {
      accordionContent.style.animation = "openModalFilter 0.3s forwards";
    }
  }

  function closeModalResponsiveFilterRight() {
    accordionContent.style.animation = "closeModalFilter 0.3s forwards";

    setTimeout(() => {
      accordionContent.classList.add("hide");
      accordionContent.style.animation = "";
      toggleOverLayer();
    }, 300);
  }

  function handleAccordionClick() {
    if (accordionContent.classList.contains("hide")) {
      toggleAccordion();
      if (innerScreenWidth <= 588) {
        toggleOverLayer();
      }
      if (innerScreenWidth > 588) {
        outSideClick(
          accordionContent,
          ["click", "touchstart"],
          toggleAccordion
        );
      }
    }
  }

  function closeOnOutsideClick(e) {
    if (e.target !== accordionContent && !accordionContent.contains(e.target)) {
      closeModalResponsiveFilterRight();
    }
  }

  if (innerScreenWidth <= 588) {
    closeModalFilterRight.addEventListener(
      "click",
      closeModalResponsiveFilterRight
    );
    modalOverLay.addEventListener("click", closeOnOutsideClick);
  }

  accordionBtn.addEventListener("click", handleAccordionClick);

  const selectOptions = accordionContent.querySelectorAll("li");
  selectOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedValue = this.getAttribute("value");
      const event = { target: { value: selectedValue } };
      orderFilterChanged(event);
    });
  });
}
