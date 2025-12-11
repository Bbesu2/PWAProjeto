import { auth, db } from "./configFirebase.js";
import {signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
    

     const SairBtn=document.getElementById('SairBtn');

  SairBtn.addEventListener('click',()=>{
    localStorage.removeItem('logadoUserID');
    signOut(auth)
    .then(()=>{
        window.location.href='./Cadastro.html';
    })
    .catch((error)=>{
        console.error('Erro ao deslogar:', error);
    })
  })