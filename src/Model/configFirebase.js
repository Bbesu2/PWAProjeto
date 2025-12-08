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

function safeSetLocal(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn("localStorage indisponível:", e);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    safeSetLocal("logadoUserID", user.uid);
   window.location.href = "PaginaInicial.html";
  }
});

    document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.getElementById("SubmitBtnCadastrar");
  const signInBtn = document.getElementById("SubmitBtnEntrar");

  // Cadastro
  if (signUpBtn) {
    signUpBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = document.getElementById("emailUser")?.value || "";
      const senha = document.getElementById("senhaUser")?.value || "";
      const apelido = document.getElementById("apelidoUser")?.value || "";
      const nome = document.getElementById("nomeUser")?.value || "";

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        const userData = { email, nome, apelido };
        console.log("Conta criada com sucesso!");

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);

        window.location.href = "Cadastro.html";
      } catch (error) {
        const code = error.code;
        if (code === "auth/email-already-in-use") {
          console.log("O e-mail registrado já está em uso");
        } else if (code === "auth/weak-password") {
          console.log("Senha fraca: use uma senha mais forte");
        } else if (code === "auth/invalid-email") {
          console.log("E-mail inválido");
        } else {
          console.error("Erro ao criar usuário:", code, error.message);
        }
      }
    });
  }

  // Login
  if (signInBtn) {
    signInBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = document.getElementById("emailUser")?.value || "";
      const senha = document.getElementById("senhaUser")?.value || "";

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login feito com sucesso");
        const user = userCredential.user;
        safeSetLocal("logadoUserID", user.uid);
        window.location.href = "PaginaInicial.html";
      } catch (error) {
        const code = error.code;
        if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
          console.log("Email ou senha incorreto");
        } else if (code === "auth/user-not-found") {
          console.log("Essa conta não existe");
        } else if (code === "auth/network-request-failed") {
          console.log("Falha de rede: verifique sua conexão");
        } else {
          console.error("Erro no login:", code, error.message);
        }
      }
    });
  }
});
