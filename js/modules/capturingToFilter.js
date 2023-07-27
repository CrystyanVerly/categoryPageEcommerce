export default function capturingToFilter(selector) {
  const chosenInput = [...document.querySelectorAll(selector)];
  const checkedItems = [
    { type: "color", value: [] },
    { type: "size", value: [] },
    { type: "price", value: [] },
  ];

  chosenInput.forEach((input) => {
    input.addEventListener("change", function () {
      const inputIsChecked = () => {
        this.toggleAttribute("checked");
      };
      inputIsChecked();

      const inputType = this.name;
      const inputValue = this.value;

      const existingItem = checkedItems.find((item) => item.type === inputType);

      if (this.checked && !existingItem.value.includes(inputValue)) {
        existingItem.value.push(inputValue);
      } else {
        const index = existingItem.value.indexOf(inputValue);
        if (index !== -1) {
          existingItem.value.splice(index, 1);
        }
      }

      const toLocalStorage = () => {
        localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
      };

      toLocalStorage();
    });
  });
}
