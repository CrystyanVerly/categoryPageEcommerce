export default function outSideClick(element, events, callback) {
  const outside = "data-outside";

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      cleanup();
      callback();
    }
  }

  function cleanup() {
    events.forEach((event) => {
      document.removeEventListener(event, handleOutsideClick);
    });
    element.removeAttribute(outside);
  }

  if (!element.hasAttribute(outside)) {
    events.forEach((event) => {
      setTimeout(() => {
        document.addEventListener(event, handleOutsideClick);
      });
    });
    element.setAttribute(outside, "");
  }

  return cleanup;
}
