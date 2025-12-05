const btnHambuguer = document.querySelector('.btn-nav');
const navLinks = document.getElementById('nav-links');
const icon = document.querySelector('.btn-nav i');

btnHambuguer.addEventListener('click', ()=>{
    navLinks.classList.toggle('show')
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
})