export default async function fetchStock() {
  let allStock;
  try {
    const url = "http://localhost:5001/stock";
    const data = await fetch(url);
    const dataJSON = await data.json();
    allStock = dataJSON;

    localStorage.setItem("quantityStock", JSON.stringify(allStock));

    return allStock;
  } catch (error) {
    console.log(error);
  }

  return allStock;
}
