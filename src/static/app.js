document.addEventListener("DOMContentLoaded", setup)

// --------------- QUERY SELECTORS ---------------

let productsContainer
let search 

// --------------- DATA MODEL ---------------

let products

// --------------- UTILITY FUNCTIONS ---------------

async function setup() {
	productsContainer = document.querySelector('.products-container')
	search = document.querySelector('.product-search')
	// START HERE
	// API Endpoint: GET /products
	// Returns: Array of product objects with id, title, price (in cents), and array of images
	
	// TODO: Fetch products from the API
	// BONUS: Add error handling for the fetch request
	try {
		const response = await fetch('/products', {method: 'GET'})
		if(!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}
			let unsortedProducts = await response.json()
			// TODO: Sort the products by price (low to high by default)
			// products = unsortedProducts.sort((a, b) => a.price - b.price)
			// BONUS: Use the refactored sorting function for dynamic sort order
			products = sortByPrice(unsortedProducts, 'asc')
			addProducts()

			// Add listener for when a user types in the search box
			search.addEventListener('keyup', addProducts)
	} catch (error) {
		console.error(error.message)
	}
}

const formatPrice = (price) => {
	// Format the price into the proper dollar amount
	return (price/100).toFixed(2)
}
// Initial sortByPrice function before using the refactored messyFunction
// const sortByPrice = (products) => {
// 	// Sort the products by price
// 	return products.sort((a, b) => a.price - b.price)
// }

// TODO: Implement search functionality
const filterProducts = () => {
	// Grab the current filter from the text box
	let filter = search.value

	// Filter through the products array and return the new array
	// toLowerCase is used to make the filter case-insensitive
	return products.filter((product) => product.title.toLowerCase().includes(filter.toLowerCase()))
}

// --------------- DOM UPDATING FUNCTIONS ---------------

const addProducts = () => {
	// Clear the current product selection
	productsContainer.innerHTML = ''
	// TODO: Render the products to the page in a responsive grid
	filterProducts().forEach(product => createProductTile(product))
}

const createProductTile = (product) => {
	// Create the div for the product
	const productTile = document.createElement('div')
	productTile.classList.add('product-tile')
	productTile.setAttribute('key', product.id)

	// Create the image element
	const productImage = document.createElement('img')
	productImage.classList.add('product-image')
	productImage.src = product.images[0].src
	productImage.alt = `${product.title} image`

	// Create the title element
	const productTitle = document.createElement('h3')
	productTitle.textContent = product.title

	// Create the price element
	const productPrice = document.createElement('p')
	productPrice.textContent = `$${formatPrice(product.price)}`

	// Append elements to the productTile div
	productTile.appendChild(productImage)
	productTile.appendChild(productTitle)
	productTile.appendChild(productPrice)

	// Append the productTile to the products container
	productsContainer.appendChild(productTile)
}

/**
 * Sorts an array of products by price in ascending or descending order.
 *
 * Your task is to refactor and improve this function:
 * - Make it clean, modern, and readable.
 * - Allow sorting in either "asc" or "desc" order using the `sortOrder` parameter.
 * - Ensure the output remains the same.
 * - A plus, but you do not need to use the messyFunction() function.
 *
 * Requirements:
 * - Refactor the code to use modern JavaScript syntax and best practices.
 * - Rename variables and functions to be more descriptive.
 * - Fill in the missing parts of the JSDoc comments.
 *
 * Feel free to leave comments explaining your thought process.
 *
 * @param {Array} products - Array of product objects, each with a `price` property.
 * @param {string} sortOrder - Either "asc" for ascending or "desc" for descending sort order.
 * @returns {Array} - A new array of products sorted by price in the specified order.
 */
function messyFunction(data1, data2) {
	let t = [];
	for (let i = 0; i < data1.length; i++) {
		t.push(data1[i]);
	}
	for (let i = 0; i < t.length; i++) {
		for (let j = i + 1; j < t.length; j++) {
			if ((data2 === "asc" && t[i].price > t[j].price) || (data2 === "desc" && t[i].price < t[j].price)) {
				let tmp = t[i];
				t[i] = t[j];
				t[j] = tmp;
			}
		}
	}
	return t;
}

// Step 1: Rename all everything so that it's readable.

// function firstSortByPrice(products, sortOrder) {
// 	let sortedProducts = [];
// 	for (let i = 0; i < products.length; i++) {
// 		sortedProducts.push(products[i]);
// 	}
// 	for (let i = 0; i < sortedProducts.length; i++) {
// 		for (let j = i + 1; j < sortedProducts.length; j++) {
// 			if ((sortOrder === "asc" && sortedProducts[i].price > sortedProducts[j].price) || (sortOrder === "desc" && sortedProducts[i].price < sortedProducts[j].price)) {
// 				let temp = sortedProducts[i];
// 				sortedProducts[i] = sortedProducts[j];
// 				sortedProducts[j] = temp;
// 			}
// 		}
// 	}
// 	return sortedProducts;
// }

// Step 2: Identified that the nested for loop performs a sort based on the sortOrder parameter to sort the array. Used a built in array method to simplify the entire function.

// function secondSortByPrice(products, sortOrder) {
// 	if(sortOrder === 'asc') {
// 		return products.sort((a, b) => a.price - b.price)
// 	}
// 	if(sortOrder === 'desc') {
// 		return products.sort((a, b) => b.price - a.price)
// 	}
// }

// Step 3: Ideally a shallow copy of the array is used instead of modifying the original array, and the double if statement can also be refactored.

function sortByPrice(products, sortOrder) {
	let direction = sortOrder === 'desc' ? -1 : 1
	return [...products].sort((productA, ProductB) => direction * (productA.price - ProductB.price))
}

