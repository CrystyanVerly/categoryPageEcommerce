export default function accordionResponsiveFilter() {
  const containerAccordion = document.querySelectorAll(
    ".title-filter-container"
  );

  const accordionColorsContainer = document.querySelector(
    ".accordion-container"
  );

  if (containerAccordion && accordionColorsContainer) {
    containerAccordion.forEach((container) => {
      container.nextElementSibling.classList.add("inactive");
      accordionColorsContainer.classList.add("inactive");

      container.addEventListener("click", (e) => {
        const formBelowAccordion = container.nextElementSibling;
        formBelowAccordion.classList.toggle("inactive");

        const arrowAccordion = container.querySelector("img");
        if (arrowAccordion || e.target === arrowAccordion) {
          arrowAccordion.classList.toggle("toRotate");
        }

        if (container.classList.contains("colors")) {
          accordionColorsContainer.classList.toggle("inactive");
        }
      });
    });
  }
}
