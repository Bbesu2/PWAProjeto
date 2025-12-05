const cadastrarBtn = document.getElementById('cadastrarBtn');
const entrarBtn = document.getElementById('entrarBtn');
const entrarForm = document.getElementById('entrar');
const cadastrarForm = document.getElementById('cadastrar');

cadastrarBtn.addEventListener('click', () => {
  entrarForm.style.display = "none";  
  cadastrarForm.style.display = "block"; 
});

entrarBtn.addEventListener('click', () => {
  cadastrarForm.style.display = "none";   
  entrarForm.style.display = "block";   
});
