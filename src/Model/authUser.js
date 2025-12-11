import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("nenhuma conta encontrada");
      window.location.href = "./Cadastro.html";
    } else {
      console.log("Usuário autenticado:", user.email);
    }
  });