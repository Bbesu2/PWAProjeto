import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB31IZTdVVqvpR42akBqg1MethvAozL_20",
  authDomain: "projetopwa-1c79a.firebaseapp.com",
  projectId: "projetopwa-1c79a",
  storageBucket: "projetopwa-1c79a.appspot.com",
  messagingSenderId: "262652544848",
  appId: "1:262652544848:web:da4b58af50dbdfccd28e55",
  measurementId: "G-SQJPC0BCWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cadastro
const singUp = document.getElementById('SubmitBtnCadastrar');
singUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailUser').value;
  const senha = document.getElementById('senhaUser').value;
  const apelido = document.getElementById('apelidoUser').value;
  const nome = document.getElementById('nomeUser').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = { email, nome, apelido };
      alert('Conta criada com sucesso!');
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, userData);
    })
    .then(() => {
      window.location.href = './Cadastro.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('O e-mail registrado já está em uso');
      } else {
        alert('Incapaz de criar o usuário', error);
      }
    });
});

// Login
const signIn = document.getElementById('SubmitBtnEntrar');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('emailUser').value;
  const senha = document.getElementById('senhaUser').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      alert('Login feito com sucesso');
      const user = userCredential.user;
      localStorage.setItem('logadoUserID', user.uid);
      window.location.href = './PaginaInicial.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        alert('Essa conta não existe');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Senha incorreta');
      } else if (errorCode === 'auth/invalid-email') {
        alert('Email inválido');
      } else {
        alert('Erro ao entrar:', error);
      }
    });
});
