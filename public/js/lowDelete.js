// var addToDamagedBtns = document.querySelectorAll('button[id="addToDamagedBtn"]');
// for (const btn of addToDamagedBtns) {
//     btn.addEventListener('click', async () => {
//         let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');

//         focusButton(Buttons);
//         let loader = createLoader();
//         MAIN.appendChild(loader);
//         let response = await fetch(`/partial/new-damaged/${btn.dataset.prod}`);
//         let DOM = await response.text();
//         MAIN.innerHTML = DOM;
//         // let script = document.createElement('script');
//         // script.setAttribute('src','/js/damagedpop.js');
//         // body.appendChild(script);
//         loader.remove();
//         setupDynamicFormSubmission_for_Update(old_active_aside_btn);

//         console.log(btn.dataset.prod);
//     });
// }
// var deleteBtns = document.querySelectorAll('#deleteProductBtn');
// for (const btn of deleteBtns) {
//     btn.addEventListener('click', async () => {
//         let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');

//         focusButton(Buttons);
//         let loader = createLoader();
//         MAIN.appendChild(loader);
//         let response = await fetch(`/partial/delete-product/${btn.dataset.prod}`);
//         let DOM = await response.text();
//         MAIN.innerHTML = DOM;
//         // let script = document.createElement('script');
//         // script.setAttribute('src','/js/damagedpop.js');
//         // body.appendChild(script);
//         loader.remove();
//         setupDynamicFormSubmission_for_Delete(old_active_aside_btn);

//         console.log(btn.dataset.prod);
//     });
// }
console.log("Low File Loaded");
