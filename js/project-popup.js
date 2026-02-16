const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-desc');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        popupTitle.textContent = link.dataset.title;
        popupDesc.textContent = link.dataset.desc;
        popup.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
