export default function toggleModalFilter() {
  const filterLeftBTN = document.querySelector(".filterLeftBTN");
  const filterLeftContainer = document.querySelector(".section-filter-left");
  const closeModalFilterLeft = document.querySelector(
    ".close-modal-filter.filterLeft"
  );
  const modalOverLay = document.querySelector(".modal-overlay");
  const innerClientScreenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  function openModalFilterLeft() {
    filterLeftContainer.style.animation = "openModalFilter 0.3s forwards";
    filterLeftContainer.classList.add("open");
    modalOverLay.classList.add("open");
  }

  function closeModalResponsiveFilterLeft() {
    filterLeftContainer.style.animation = "closeModalFilter 0.3s forwards";

    setTimeout(() => {
      filterLeftContainer.style.animation = "";
      filterLeftContainer.display = "none";
      filterLeftContainer.classList.remove("open");
      modalOverLay.classList.remove("open");
    }, 300);
  }

  function closeOnOutsideClick(e) {
    if (
      e.target !== filterLeftContainer &&
      !filterLeftContainer.contains(e.target)
    ) {
      closeModalResponsiveFilterLeft();
    }
  }

  if (innerClientScreenWidth <= 588) {
    modalOverLay.addEventListener("click", closeOnOutsideClick);
    filterLeftBTN.addEventListener("click", openModalFilterLeft);
    closeModalFilterLeft.addEventListener(
      "click",
      closeModalResponsiveFilterLeft
    );
  }
}
