import productItems from "./productItems.js";

let productContainer = document.getElementById("products");

let renderAllContent = () => {
	productItems.forEach((product) => {
		// console.log(product);
		if (!document.getElementById(`${product.category}`)) {
			let categoryname = document.createElement("h2");
			productContainer.appendChild(categoryname);
			categoryname.innerHTML = `${product.category}`;
			let category = document.createElement("div");
			productContainer.appendChild(category);
			category.setAttribute("id", `${product.category}`);
			category.classList.add("productFlex");
		}	
		document.getElementById(`${product.category}`).innerHTML += `
        <div class="cardDesign">
        <h4>${product.brand}</h4>
        <h3>${product.title}</h3>
        <div class="imgContainer"><img src="${product.thumbnail}"></div>
        <p>${product.price} DKK</p>
        <button id="${product.id}" onclick="console.log(this.id)">Læg i kurv</button>
        </div>
        `;
	});
};
renderAllContent();
