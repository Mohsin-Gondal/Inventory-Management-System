console.log("new Stock Script Loaded");
let addCategoryForm = document.querySelector('#addCategoryForm');
let addProductForm = document.querySelector('#addProductForm');
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
addCategoryForm.addEventListener('submit', AJAX_Request);
addProductForm.addEventListener('submit', AJAX_Request);