const API_URL = 'https://sheetdb.io/api/v1/opatp0bwwki0q'; // Replace YOUR_SHEETDB_ID with your SheetDB ID

async function fetchProduct() {
  const productNumber = document.getElementById('productNumber').value.trim();
  const productInfoDiv = document.getElementById('productInfo');

  // Clear previous results
  productInfoDiv.innerHTML = '';
  productInfoDiv.style.display = "none";

  if (!productNumber) {
    alert("Please enter a product number!");
    return;
  }

  try {
    // Fetch data from the API
    const response = await fetch(`${API_URL}/search?number=${productNumber}`);
    const data = await response.json();

    if (data.length === 0) {
      productInfoDiv.style.display = "block";
      productInfoDiv.innerHTML = `<p>No product found with number: ${productNumber}</p>`;
      return;
    }

    // Extract product details
    const product = data[0];
    const { name, image, metal, price } = product;

    // Generate product card HTML
    productInfoDiv.style.display = "block";
    productInfoDiv.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Image URL:</strong> <a href="${image}" target="_blank">${image}</a></p>
      <p>Type of Metal: ${metal}</p>
      <p>Price: $${price}</p>
    `;
  } catch (error) {
    alert("Failed to fetch product details. Please try again later.");
    console.error(error);
  }
}
