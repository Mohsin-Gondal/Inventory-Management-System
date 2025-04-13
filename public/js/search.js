let searchDiv = document.querySelector('.search-div');
let search_input = searchDiv.querySelector('input');
let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');
search_input.addEventListener('keyup', async (e) => {
    if (search_input.value.length > 0) {
        focusButton(Buttons);
        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch(`/products/${search_input.value}`);
        let DOM = await response.text();
        MAIN.innerHTML = DOM;
        loader.remove();
    } else {
        old_active_aside_btn.dispatchEvent(new Event('click'));
    }
});