export default function structureInputFilter(eachColorAPI) {
  const inputColorContainer = document.querySelector(
    ".container-filter-by-colors .form-filter"
  );

  const inputLabel = document.createElement("label");
  inputLabel.htmlFor = eachColorAPI;
  inputLabel.classList.add("label-input-filter");

  const innerInputColorLabel = `
    <input type="checkbox"
      name="color"
      id="${eachColorAPI}"
      class="input-color input-filter"
      value="${eachColorAPI}"
    />
    <span class="checkmark"></span>
    ${eachColorAPI}
  `;

  inputLabel.innerHTML = innerInputColorLabel;

  const existingLabels = Array.from(inputColorContainer.childNodes);
  const labelExists = existingLabels.some((node) =>
    node.isEqualNode(inputLabel)
  );

  if (!labelExists) {
    inputColorContainer.appendChild(inputLabel);
  }
}
