let Buttons = document.querySelectorAll('.navigation .aside-btn');
let main_loader_container = document.querySelector('.main-main .loader-container');
let MAIN = document.querySelector('.main-main');
for (const Button of Buttons) {
    Button.addEventListener('click', () => {
        main_loader_container.classList.remove('display-none');
        for (const btn of Buttons) {
            btn.classList.remove('active-asi-btn');
        }
        Button.classList.add('active-asi-btn');
        setTimeout(() => {
            main_loader_container.classList.add('display-none');
        }, 1000);
    });
}

