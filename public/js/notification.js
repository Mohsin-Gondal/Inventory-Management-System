let notificationButton = document.querySelector('#notification-btn');
let notficationPanel = document.querySelector('.notification-panel');
let notfications = document.querySelector('.notifications');
let panelWidth = notficationPanel.offsetWidth;
console.log(panelWidth);
let is_open = false;
notificationButton.addEventListener('click', (e) => {
    if (is_open) {
        notficationPanel.style.transform = `translateX(${panelWidth}px)`;
        notificationButton.classList.toggle('active-btn-svg');
        notficationPanel.dispatchEvent(new Event('focus'));
    } else {
        notficationPanel.style.transform = `translateX(0px)`;
        notificationButton.classList.toggle('active-btn-svg');
    }
    is_open = !is_open;
});
notficationPanel.addEventListener('mouseleave',(e)=>{
    e.stopPropagation();
    notificationButton.dispatchEvent(new Event('click'));
})

async function loadNotifications() {
    let response = await fetch('/notifications');
    let notifications = await response.text();
    let notifications_div = document.querySelector('.notification-panel .notifications');
    notifications_div.innerHTML = notifications;
    // let btn = document.querySelector('#deleteNotificationBtn');
    let FORMs = document.querySelectorAll('#notificationDeleteForm');
    for (const FORM of FORMs) {
        FORM.addEventListener('submit', async (e) => {
            e.preventDefault();
            let formData = new FormData(FORM);
            let actionUrl = FORM.getAttribute('action');
            try {

                response = await fetch(actionUrl, {
                    method: 'post',
                    body: formData,
                });
                notifications_div.innerHTML = ``;
                loadNotifications();
            } catch (err) {
                console.log(err);
            }
        });
    }
}
loadNotifications();
