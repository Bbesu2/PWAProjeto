
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

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
        alert('Conta criada com sucesso!');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("Erro ao escrever o", error);

    })

    .catch((error)=>{
        const errorCode= error.code;
        if(errorCode=='auth/email-already-in-use'){
            alert('O e-mail registrado ja esta em uso');
        }
        else{
            alert('Incapz de criar o usuario');}
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
        alert('Login feito com sucesso');
        const user=userCredential.user;
        localStorage.setItem('logadoUserID', user.uid);
        window.location.href='PaginaInicial.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert('Email ou senha incorreto');
        }
        else{
            alert('essa Connta não existe');
        }
    })
 })
