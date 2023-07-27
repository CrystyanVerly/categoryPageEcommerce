export default function inputSizeStructure(getAllProductsFromLS) {
  const inputSizeContainer = document.querySelector(
    ".container-filter-by-sizes .form-filter"
  );

  function arrUniquesSizesOrdered(array) {
    const specificItems = array.flatMap((item) => item.size);
    const arrWithOutRepet = [...new Set(specificItems)];

    const sizesOrder = [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "U",
      "36",
      "38",
      "40",
      "42",
      "44",
      "46",
    ];

    arrWithOutRepet.sort(
      (a, b) => sizesOrder.indexOf(a) - sizesOrder.indexOf(b)
    );

    return arrWithOutRepet;
  }

  arrUniquesSizesOrdered(getAllProductsFromLS).forEach((letter) => {
    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = letter;
    inputLabel.classList.add("label-sizes");

    const innerInputSizeLabel = `
      <input
        type="checkbox"
        name="size"
        id=${letter}
        class="input-size input-filter"
        value=${letter}
      />
      <span class="letter-size">${letter}</span>
    `;

    inputLabel.innerHTML = innerInputSizeLabel;

    inputSizeContainer.appendChild(inputLabel);
  });
}
