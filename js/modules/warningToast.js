export default function warningToast() {
  const toastContainer = document.querySelector(".toast-wrapper");
  const toastCloseBTN = document.querySelector(".close-toast-btn");
  let timeoutId;

  function openWarningToast() {
    toastContainer.classList.remove("hide");
    toastContainer.style.animation = "showToast 0.3s forwards";
  }
  openWarningToast();

  function closeWarningToast() {
    toastContainer.style.animation = "hideToast 0.3s forwards";

    setTimeout(() => {
      toastContainer.style.animation = "";
      toastContainer.classList.add("hide");
    }, 300);
  }

  function pauseToastCountdown() {
    clearTimeout(timeoutId);
  }

  function resumeToastCountdown() {
    timeoutId = setTimeout(() => {
      closeWarningToast();
    }, 2300);
  }

  timeoutId = setTimeout(() => {
    closeWarningToast();
  }, 2300);

  toastCloseBTN.addEventListener("click", () => {
    clearTimeout(timeoutId);
    closeWarningToast();
  });

  toastContainer.addEventListener("mouseenter", pauseToastCountdown);
  toastContainer.addEventListener("mouseleave", resumeToastCountdown);
}
