
console.log("new Stock Script Loaded");
async function initNewStockLogic() {
    console.log("Adding Logic in New Stock Page");
    let addCategoryForm = document.querySelector('#addCategoryForm');
    let addProductForm = document.querySelector('#addProductForm');
    let addStockForm = document.querySelector('#addStockForm');
    let categorySelect = document.querySelector('#categorySelect');
    let forms = document.querySelector('form');

    async function AJAX_Request(e) {
        e.preventDefault();
        let formData = new FormData(this);
        let actionURL = this.getAttribute('action');
        let urlEncodedData = new URLSearchParams(formData).toString();
        try {
            let response = await fetch(actionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData,
            });
            let result = await response.json();
            console.log(result);
        } catch (err) {
            console.log(err);
        }
        this.reset();
    }
    function formatDateShort(dateObj) {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        const date = new Date(dateObj); // works with Date object, or date string like "2027-08-11"
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    addCategoryForm.addEventListener('submit', AJAX_Request);
    addProductForm.addEventListener('submit', AJAX_Request);
    let newProductInStockCard = document.querySelector('#newProductInStockCard');
    let prodcutSelect = newProductInStockCard.querySelector('#productsSelection');
    let supplierSelect = document.querySelector('#supplierSelect');
    let productsInStock = [];
    let stockProducts = document.querySelector('.stock-products');
    let addToStockBtn = document.querySelector('#addToStockBtn');
    let QuantityRecieved = document.querySelector('#QuantityRecieved');
    let saveStockBtn = document.querySelector('#saveStockBtn');
    addToStockBtn.addEventListener('click', async (e) => {
        try {
            let response = await fetch(`/product/${prodcutSelect.value}`);
            let product = await response.json();
            product.quantityRecieved = QuantityRecieved.value;
            productsInStock.push(product);
            console.log(productsInStock);
            stockProducts.innerHTML = ``;
            for (const product of productsInStock) {
                let card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('width-100');
                card.classList.add('mt-1');
                card.setAttribute('data-pro-id', product.ProductID);
                card.innerHTML = `
                            <div class="card-top justify-start g-1">
                                <button class="btn btn-secondary-outline">${product.C_NAME}</button>
                                <p class="btn btn-secondary-outline align-self-start fs-normal-1">${product.quantityRecieved} Units</p>
                                <p class="flex-grow-1"></p>
    
                                <p class="card-bottom-header flex-justalign-between-col">
                                    <b>${product.Price}$/Unit</b>
                                    <b>EXP:${formatDateShort(product.ExpiryDate)}</b>
                                </p>
                            </div>
                            <div class="card-bottom flex-end justify-between">
                                <h1 class="card-bottom-value">${product.Name}</h1>
                                <button id="deleteProductFromStockBtn" class="btn btn-secondary btn-svg">
                                    <svg id="deleteProductFromStockBtn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                        fill="currentColor">
                                        <path
                                            d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
        
        `;
                stockProducts.appendChild(card);
            }

        } catch (er) {
            console.log(er.message);
            return;
        }


    });
    stockProducts.addEventListener('click', (e) => {
        let card = e.target.closest('.card');
        if (!card) return;

        let id = Number(card.getAttribute('data-pro-id')); // convert to number
        console.log(id);

        productsInStock = productsInStock.filter((value) => {
            console.log('Comparing:', value.ProductID, 'with', id);
            return value.ProductID !== id;
        });
        card.remove();
    });

    saveStockBtn.addEventListener('click', async (e) => {
        try {
            console.log(productsInStock);
            await fetch('/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: productsInStock,
                    supplier: supplierSelect.value,
                })
            });
            productsInStock = [];
            stockProducts.innerHTML = ``;
            console.log("Setting Empty the DIV");

            addStockForm.reset();
            newStockBtn.dispatchEvent(new Event('click'));
        } catch (er) {
            console.log(er.message);
        }
    })
    async function getSuppliers() {
        try {
            let response = await fetch('/suppliers');
            let result = await response.json();
            return result;
        } catch (er) {
            console.log(er);
            return er
        }
    }
    async function getProducts() {
        try {
            let response = await fetch('/products');
            let products = await response.json();
            return products;
        } catch (er) {
            console.log(er.message);
            return er;
        }

    }
    async function setProductsInSelect() {
        let products = await getProducts();
        console.log(products);
        for (const product of products) {
            let option = document.createElement('option');
            option.value = product.ProductID;
            option.innerHTML = product.Name;
            prodcutSelect.appendChild(option);
        }
    }
    async function setSuppliersInSelect() {
        let suppliers = await getSuppliers();
        console.log(suppliers);
        for (const supplier of suppliers) {
            let option = document.createElement('option');
            option.value = supplier.SupplierID;
            option.innerHTML = supplier.Name;
            supplierSelect.appendChild(option);
        }
    }
    async function setCategoriesInSelect() {
        categorySelect.innerHTML = ``;
        let categories = await fetch('/categories');
        categories = await categories.json();
        for (const cat of categories) {
            let option = document.createElement('option');
            option.value = cat.CategoryID;
            option.innerHTML = cat.Name;
            categorySelect.appendChild(option);
        }
    }
    setProductsInSelect();
    setSuppliersInSelect();
    setCategoriesInSelect();
}
