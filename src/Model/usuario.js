  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
    import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
  
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

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const logadoUserID=localStorage.getItem('logadoUserID');
    if(logadoUserID){
        console.log(user);
        const docRef = doc(db, "users", logadoUserID);
        getDoc(docRef)
            .then((docSnap)=>{
                if(docSnap.exists()){
                    const userData=docSnap.data();
                    document.getElementById('LogadoApelidoUser').innerText=userData.apelido;
                    document.getElementById('LogadoNomeUser').innerText=userData.nome;
                    document.getElementById('LogadoEmailUser').innerText=userData.email;
                }
                else{
                    console.log('nenhum documento encontrado combinando id')
                }
                })
                .catch((error)=>{
                    console.log("Erro ao pegar o documento", error);
                })
            }else{
                    console.log("Id do usuario não encontrado no armazenamento local");
                }
    })