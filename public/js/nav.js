let script_added = false;
let Buttons = document.querySelectorAll('.navigation .aside-btn');
let main_loader_container = document.querySelector('.main-main .loader-container');
let MAIN = document.querySelector('.main-main');
let Dashboard = document.querySelector('#idashboard');
function focusButton(Buttons, focus) {
    for (const btn of Buttons) {
        btn.classList.remove('active-asi-btn');
    }
    if (focus)
        focus.classList.add('active-asi-btn');
    // for (const Button of Buttons) {
    //     Button.addEventListener('click', () => {
    //         for (const btn of Buttons) {
    //             btn.classList.remove('active-asi-btn');
    //         }
    //         Button.classList.add('active-asi-btn');
    //     });
    // }
}
let [Dashboard_btn, DamagedStock_btn, ExpiredStock_btn, LowStock_btn] = Buttons;
Dashboard_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, Dashboard_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/dashboard');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;

    let script = document.createElement('script');
    script.setAttribute('src', '/js/toolsDB.js');
    body.appendChild(script);
    script_added = true;
    loader.remove();


    let newStockBtn = document.querySelector('#newStockBtn');
    newStockBtn.addEventListener('click', async () => {
        focusButton(Buttons);
        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch('/partial/new');
        let DOM = await response.text();
        MAIN.innerHTML = DOM;

        loader.remove();
    });
});
DamagedStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, DamagedStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/damaged');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;

    loader.remove();
});
ExpiredStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, ExpiredStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/expired');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;

    loader.remove();
});
LowStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, LowStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/low');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;

    loader.remove();
});
Dashboard_btn.dispatchEvent(new Event('click'));