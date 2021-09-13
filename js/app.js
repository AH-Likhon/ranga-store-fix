// #f0f4ff

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // console.log(product);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("col");
    // div.classList.add("h-100");
    div.innerHTML = `
      <div id="single-product" class="single-product card h-100">
          <div class="text-center">
              <img class="product-image card-img-fluid mt-5" src=${image}></img>
          </div>

          <div class="card-body text-center">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-text">Category: ${product.category}</p>

            <div class="d-flex justify-content-around">
            <h5 class="text-danger">${product.rating.rate} <i class="fas fa-star filled"></i><i class="fas fa-star empty"></i><i class="fas fa-star-half-alt"></i><span class="text-danger"> (${product.rating.count})</span></h5>
            </div>

            <h2>Price: $ ${product.price}</h2>
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
            <button id="details-btn" class="btn btn-danger">Details</button>
          </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  // console.log(converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  // console.log(total);
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
  updateTotal();
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");

  // const deliverCahrgeValue = getInputValue("delivery-charge");
  // const totalTaxValue = getInputValue("total-tax");

  // console.log(deliverCahrgeValue);
  // console.log(totalTaxValue);
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
