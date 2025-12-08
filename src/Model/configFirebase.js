import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, inMemoryPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB31IZTdVVqvpR42akBqg1MethvAozL_20",
    authDomain: "projetopwa-1c79a.firebaseapp.com",
    projectId: "projetopwa-1c79a",
    storageBucket: "projetopwa-1c79a.firebasestorage.app",
    messagingSenderId: "262652544848",
    appId: "1:262652544848:web:da4b58af50dbdfccd28e55",
    measurementId: "G-SQJPC0BCWX"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


async function configurePersistence() {
  try {
    await setPersistence(auth, browserSessionPersistence);
    console.log("Persistência: sessão");
  } catch (err) {
    console.warn("Sessão indisponível, caindo para memória:", err.code, err.message);
    await setPersistence(auth, inMemoryPersistence);
    console.log("Persistência: memória (sem salvar sessão)");
  }
}
configurePersistence();

    
  const singUp= document.getElementById('SubmitBtnCadastrar');
 singUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('emailUser').value;
    const senha = document.getElementById('senhaUser').value;
    const apelido = document.getElementById('apelidoUser').value;
    const nome = document.getElementById('nomeUser').value;

    const auth = getAuth();
    const db=getFirestore();


    //Criacao de usario - registando usuario
      createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            nome: nome,
            apelido : apelido
        };
        console.log('Conta criada com sucesso!');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='Cadastro.html';
        })
        .catch((error)=>{
            console.error("Erro ao escrever o", error);

    })

    .catch((error)=>{
        const errorCode= error.code;
        if(errorCode=='auth/email-already-in-use'){
            console.log('O e-mail registrado ja esta em uso');
        }
        else{
            console.log('Incapz de criar o usuario');}
    })
  })
});

    //Entrando na conta - login do usuario
     const signIn=document.getElementById('SubmitBtnEntrar');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('emailUser').value;
    const senha=document.getElementById('senhaUser').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,senha)
    .then((userCredential)=>{
        console.log('Login feito com sucesso');
        const user=userCredential.user;
        localStorage.setItem('logadoUserID', user.uid);
        window.location.href='PaginaInicial.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            console.log('Email ou senha incorreto');
        }
        else{
            console.log('essa Conta não existe');
        }
    })
 })

 
