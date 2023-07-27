export default function accordionColors() {
  const inputColorContainer = document.querySelectorAll(
    ".container-filter-by-colors .form-filter"
  );
  const inputColorElements = document.querySelectorAll(
    ".container-filter-by-colors .form-filter label"
  );

  function inactiveAfterFifthElement() {
    for (let i = 0; i < inputColorElements.length; i++) {
      if (i > 4) {
        inputColorElements[i].classList.toggle("inactive");
      }
    }
  }

  if (inputColorElements && inputColorElements.length > 5) {
    const containerAccordion = document.createElement("div");
    containerAccordion.classList.add("accordion-container");

    const accordionBTN = document.createElement("a");
    accordionBTN.setAttribute("href", "#");
    accordionBTN.innerText = "Ver todas as cores";

    const accordionArrow = document.createElement("img");
    accordionArrow.setAttribute("src", "../../img/arrow.svg");
    accordionArrow.setAttribute("alt", "accordion's arrow to see all collors");

    accordionBTN.appendChild(accordionArrow);
    containerAccordion.appendChild(accordionBTN);

    inactiveAfterFifthElement();

    function toggleListColors(e) {
      e.preventDefault();
      inputColorElements.forEach((label, index) => {
        if (index > 4) {
          label.classList.toggle("inactive");
        }
      });
      accordionArrow.classList.toggle("toRotate");
    }
    containerAccordion.addEventListener("click", toggleListColors);

    inputColorContainer[inputColorContainer.length - 1].after(
      containerAccordion
    );
  }
}
