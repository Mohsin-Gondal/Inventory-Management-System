let searchDiv = document.querySelector('.search-div');
let search_input = searchDiv.querySelector('input');
search_input.addEventListener('keyup', async (e) => {
    let old_active_aside_btn = document.querySelector('.navigation button[data-nav-control="true"]');
    if (search_input.value.length > 0) {
        focusButton(Buttons);
        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch(`/products/${search_input.value}`);
        let DOM = await response.text();
        MAIN.innerHTML = DOM;

        let script = document.createElement('script');
        script.setAttribute('src', '/js/dashboardAddDelete.js');
        body.appendChild(script);

        loader.remove();
        let backward_bav_btn = document.querySelector('#backward-nav');
        backward_bav_btn.onclick = (e) => {
            old_active_aside_btn.dispatchEvent(new Event('click'));
            search_input.value = '';
        }
    } else {
        old_active_aside_btn.dispatchEvent(new Event('click'));
    }
});