const button = document.querySelector('.btn');

button.addEventListener('mouseenter', () => {
    button.classList.add('hover');
});

button.addEventListener('mouseleave', () => {
    button.classList.remove('hover');
});