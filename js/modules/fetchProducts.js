export default async function fetchProducts() {
  let allProducts;
  try {
    const url = "http://localhost:5000/products";
    const data = await fetch(url);
    const dataJSON = await data.json();
    allProducts = dataJSON;

    localStorage.setItem("AllProducts", JSON.stringify(allProducts));

    return allProducts;
  } catch (erro) {
    console.log(erro);
  }

  return allProducts;
}
