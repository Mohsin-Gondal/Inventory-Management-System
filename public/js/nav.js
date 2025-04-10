let Buttons = document.querySelectorAll('.navigation .aside-btn');
let main_loader_container = document.querySelector('.main-main .loader-container');
let MAIN = document.querySelector('.main-main');
let Dashboard = document.querySelector('#idashboard');
for (const Button of Buttons) {
    Button.addEventListener('click', () => {
        for (const btn of Buttons) {
            btn.classList.remove('active-asi-btn');
        }
        Button.classList.add('active-asi-btn');
    });
}
let [Dashboard_btn, DamagedStock_btn, ExpiredStock_btn, LowStock_btn] = Buttons;
Dashboard_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/dashboard');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    
    loader.remove();
});
DamagedStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/damaged');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    
    loader.remove();
});
ExpiredStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/expired');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    
    loader.remove();
});
LowStock_btn.addEventListener('click', async (e) => {
    // main_loader_container.classList.remove('display-none');
    let loader = createLoader();
    MAIN.appendChild(loader);
    let response = await fetch('/partial/low');
    let DOM = await response.text();
    MAIN.innerHTML = DOM;
    
    loader.remove();
});
