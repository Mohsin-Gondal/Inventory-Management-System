// import { initNewStockPage } from './newStockHelper.js';
let newStockBtn = document.querySelector('#newStockBtn');
let script_;
let Buttons = document.querySelectorAll('.navigation .aside-btn');
let main_loader_container = document.querySelector('.main-main .loader-container');
let MAIN = document.querySelector('.main-main');
let Dashboard = document.querySelector('#idashboard');
function focusButton(Buttons, focus) {
    for (const btn of Buttons) {
        if (script_)
            script_.remove();
        btn.classList.remove('active-asi-btn');

    }
    if (focus) {
        focus.classList.add('active-asi-btn');
    }


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
    let last_script = document.querySelector('script:last-child');
    if (!(last_script.getAttribute('src') == '/js/dashboardAddDelete.js')) {
        let script = document.createElement('script');
        script.setAttribute('src', '/js/dashboardAddDelete.js');
        body.appendChild(script);
        script_ = script;
    }
    loader.remove();

    let old_active_aside_btn = document.querySelector('.navigation .active-asi-btn');

    newStockBtn = document.querySelector('#newStockBtn');
    newStockBtn.addEventListener('click', async () => {
        focusButton(Buttons);

        let backward_bav_btn = document.querySelector('#backward-nav');
        backward_bav_btn.onclick = (e) => {
            old_active_aside_btn.dispatchEvent(new Event('click'));
        }

        let loader = createLoader();
        MAIN.appendChild(loader);
        let response = await fetch('/partial/new');
        let DOM = await response.text();
        MAIN.innerHTML = DOM;
        initNewStockLogic();



        loader.remove();
    });
    for (const btn of Buttons) {
        btn.setAttribute('data-nav-control', false);
    }
    Dashboard_btn.setAttribute('data-nav-control', true);
});
DamagedStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, DamagedStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/damaged');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    let last_script = document.querySelector('script:last-child');
    if (!(last_script.getAttribute('src') == '/js/damagedRemoveDelete.js')) {
        let script = document.createElement('script');
        script.setAttribute('src', '/js/damagedRemoveDelete.js');
        body.appendChild(script);
        script_ = script;
    }
    loader.remove();
    for (const btn of Buttons) {
        btn.setAttribute('data-nav-control', false);
    }
    DamagedStock_btn.setAttribute('data-nav-control', true);
});
ExpiredStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, ExpiredStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/expired');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    let last_script = document.querySelector('script:last-child');
    if (!(last_script.getAttribute('src') == '/js/expiredDelete.js')) {
        let script = document.createElement('script');
        script.setAttribute('src', '/js/expiredDelete.js');
        body.appendChild(script);
        script_ = script;
    }
    loader.remove();
    for (const btn of Buttons) {
        btn.setAttribute('data-nav-control', false);
    }
    ExpiredStock_btn.setAttribute('data-nav-control', true);
});
LowStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    focusButton(Buttons, LowStock_btn);
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/low');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    let last_script = document.querySelector('script:last-child');
    if (!(last_script.getAttribute('src') == '/js/lowDelete.js')) {
        let script = document.createElement('script');
        script.setAttribute('src', '/js/lowDelete.js');
        body.appendChild(script);
        script_ = script;
    }

    loader.remove();
    for (const btn of Buttons) {
        btn.setAttribute('data-nav-control', false);
    }
    LowStock_btn.setAttribute('data-nav-control', true);
});
Dashboard_btn.dispatchEvent(new Event('click'));
