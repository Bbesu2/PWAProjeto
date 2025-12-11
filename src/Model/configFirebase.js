import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Cadastro
const singUp = document.getElementById('SubmitBtnCadastrar');
singUp.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('emailUser').value;
  const senha = document.getElementById('senhaUser').value;
  const apelido = document.getElementById('apelidoUser').value;
  const nome = document.getElementById('nomeUser').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    const userData = { email, nome, apelido };
    await setDoc(doc(db, "users", user.uid), userData);
    alert('Conta criada com sucesso!');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('O e-mail registrado já está em uso');
    } else {
      alert('Incapaz de criar o usuário: ' + error.message);
    }
  }
});

// Login
// Login
const signIn = document.getElementById('SubmitBtnEntrar');
signIn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('emailUser').value.trim();
  const senha = document.getElementById('senhaUser').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    console.log('Login feito com sucesso');
    localStorage.setItem('logadoUserID', user.uid);
    window.location.href = 'PaginaInicial.html'; 

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      alert('Essa conta não existe');
    } else if (error.code === 'auth/wrong-password') {
      alert('Senha incorreta');
    } else if (error.code === 'auth/invalid-email') {
      alert('Email inválido');
    } else {
      alert('Erro ao entrar: ' + error.message);
    }
  }
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário autenticado:", user.email, user.uid);
    if (window.location.pathname.includes("Cadastro.html") || 
        window.location.pathname.includes("Cadastro.html")) {
      window.location.href = "./PaginaInicial.html";
    }
  } else {
    console.log("Nenhum usuário logado");
    if (window.location.pathname.includes("PaginaInicial.html")) {
      window.location.href = "./Cadastro.html";
    }
  }
});
