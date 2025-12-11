import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { 
  getAuth, 
  onAuthStateChanged, 
  updateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc, 
  deleteDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB31IZTdVVqvpR42akBqg1MethvAozL_20",
  authDomain: "projetopwa-1c79a.firebaseapp.com",
  projectId: "projetopwa-1c79a",
  storageBucket: "projetopwa-1c79a.firebasestorage.app",
  messagingSenderId: "262652544848",
  appId: "1:262652544848:web:da4b58af50dbdfccd28e55",
  measurementId: "G-SQJPC0BCWX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("Nenhum usuário logado.");
    window.location.href = "./Cadastro.html";
    return;
  }

  console.log("Usuário logado:", user.email);

  const form = document.getElementById("userUpdateForm");
  const cancelBtn = document.getElementById("cancelUpdate");
  const deleteBtn = document.getElementById("deleteAccount");

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      document.getElementById("novoNomeUser").value = data.nome ?? "";
      document.getElementById("novoApelidoUser").value = data.apelido ?? "";
      document.getElementById("novoEmailUser").value = user.email ?? data.email ?? "";
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }

  cancelBtn?.addEventListener("click", () => {
    window.location.href = "./Usuario.html";
  });

  deleteBtn?.addEventListener("click", async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await user.delete();
      alert("Conta excluída com sucesso!");
      window.location.href = "./Cadastro.html";
    } catch (error) {
      console.error("Erro ao excluir:", error);
      if (error.code === "auth/requires-recent-login") {
        const senha = prompt("Digite sua senha para confirmar exclusão:");
        if (senha) {
          const cred = EmailAuthProvider.credential(user.email, senha);
          await reauthenticateWithCredential(user, cred);
          await user.delete();
          await deleteDoc(doc(db, "users", user.uid));
          alert("Conta excluída com sucesso!");
          window.location.href = "./Cadastro.html";
        } else {
          alert("Exclusão cancelada.");
        }
      } else {
        alert("Erro ao excluir conta: " + error.message);
      }
    }
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const novoNome = document.getElementById("novoNomeUser").value.trim();
    const novoApelido = document.getElementById("novoApelidoUser").value.trim();
    const novoEmail = document.getElementById("novoEmailUser").value.trim();

    try {
      const docRef = doc(db, "users", user.uid);

      const updates = {};
      if (novoNome) updates.nome = novoNome;
      if (novoApelido) updates.apelido = novoApelido;

      if (Object.keys(updates).length > 0) {
        await setDoc(docRef, updates, { merge: true });
      }


      // Ignora essa parte, isso aqui era para atualizar email, mas não tive tempo para configurar e preferi só deixar aqui, caso eu atualize o doc ja ta o codigo pronto
      if (novoEmail && novoEmail !== user.email) {
        const confirmar = confirm(`Deseja realmente alterar seu e‑mail para ${novoEmail}?`);
        if (confirmar) {
          try {
            await updateEmail(user, novoEmail);
            await setDoc(docRef, { email: novoEmail }, { merge: true });
            console.log("E‑mail atualizado com sucesso!");
          } catch (err) {
            if (err.code === "auth/requires-recent-login") {
              const senha = prompt("Digite sua senha para confirmar:");
              if (senha) {
                const cred = EmailAuthProvider.credential(user.email, senha);
                await reauthenticateWithCredential(user, cred);
                await updateEmail(user, novoEmail);
                await setDoc(docRef, { email: novoEmail }, { merge: true });
                console.log("E‑mail atualizado com sucesso!");
              } else {
                alert("Alteração de e‑mail cancelada.");
              }
            } else {
              throw err;
            }
          }
        }
      }

      alert("Dados atualizados com sucesso!");
      window.location.href = "./Usuario.html"; 
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar: " + error.message);
    }
  });
});
