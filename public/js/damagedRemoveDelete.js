var addToDamagedBtns = document.querySelectorAll('button[id="removeFromDamagedBtn"]');
for (const btn of addToDamagedBtns) {
    btn.addEventListener('click', async () => {
        let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');
        let backward_bav_btn = document.querySelector('#backward-nav');
        backward_bav_btn.onclick = (e) => {
            old_active_aside_btn.dispatchEvent(new Event('click'));
        }
        focusButton(Buttons);
        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch(`/partial/remove-from-damaged/${btn.dataset.prod}`);
        let DOM = await response.text();
        MAIN.innerHTML = DOM;
        // let script = document.createElement('script');
        // script.setAttribute('src','/js/damagedpop.js');
        // body.appendChild(script);
        loader.remove();
        setupDynamicFormSubmission_for_Remove_Damaged(old_active_aside_btn);

        console.log(btn.dataset.prod);
    });
}
var deleteBtns = document.querySelectorAll('#deleteProductBtn');
for (const btn of deleteBtns) {
    btn.addEventListener('click', async () => {
        let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');
        let backward_bav_btn = document.querySelector('#backward-nav');
        backward_bav_btn.onclick = (e) => {
            old_active_aside_btn.dispatchEvent(new Event('click'));
        }
        focusButton(Buttons);
        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch(`/partial/delete-damaged-product/${btn.dataset.prod}`);
        let DOM = await response.text();
        MAIN.innerHTML = DOM;
        // let script = document.createElement('script');
        // script.setAttribute('src','/js/damagedpop.js');
        // body.appendChild(script);
        loader.remove();
        setupDynamicFormSubmission_for_Delete_Damaged(old_active_aside_btn);

        console.log(btn.dataset.prod);
    });
}

console.log("Damaged File Loaded");
