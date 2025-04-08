let notificationButton = document.querySelector('#notification-btn');
let notficationPanel = document.querySelector('.notification-panel');
let notfications = document.querySelector('.notifications');
let panelWidth = notficationPanel.offsetWidth;
console.log(panelWidth);
let is_open = false;
notificationButton.addEventListener('click',(e)=>{
    if(is_open){
        notficationPanel.style.transform = `translateX(${panelWidth}px)`;
        notificationButton.classList.toggle('active-btn-svg');
    }else{
        notficationPanel.style.transform = `translateX(0px)`;
        notificationButton.classList.toggle('active-btn-svg');
    }
    is_open = !is_open;
});
// notificationButton.dispatchEvent(new Event('click'));
