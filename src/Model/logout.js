
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
    
  
  const firebaseConfig = {
    apiKey: "AIzaSyB31IZTdVVqvpR42akBqg1MethvAozL_20",
    authDomain: "projetopwa-1c79a.firebaseapp.com",
    projectId: "projetopwa-1c79a",
    storageBucket: "projetopwa-1c79a.firebasestorage.app",
    messagingSenderId: "262652544848",
    appId: "1:262652544848:web:da4b58af50dbdfccd28e55",
    measurementId: "G-SQJPC0BCWX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();

     const SairBtn=document.getElementById('SairBtn');

  SairBtn.addEventListener('click',()=>{
    localStorage.removeItem('logadoUserID');
    signOut(auth)
    .then(()=>{
        window.location.href='Cadastro.html';
    })
    .catch((error)=>{
        console.error('Erro ao deslogar:', error);
    })
  })