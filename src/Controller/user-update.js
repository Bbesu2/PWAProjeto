import { auth, db } from "../Model/configFirebase.js";
import { 
  onAuthStateChanged, 
  updateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { 
  setDoc, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

async function carregarDadosUsuario(user) {
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    console.log("snap.exists:", snap.exists());
    if (snap.exists()) {
      const data = snap.data();
      console.log("Dados carregados:", data);

      document.getElementById("novoNomeUser").value = data.nome ?? "";
      document.getElementById("novoApelidoUser").value = data.apelido ?? "";
      document.getElementById("novoEmailUser").value = user.email ?? data.email ?? "";
    }
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("Nenhum usuário logado.");
    window.location.href = "./Cadastro.html";
    return;
  }

  console.log("Usuário logado:", user.email);

  await carregarDadosUsuario(user);
});


  cancelBtn?.addEventListener("click", () => {
    window.location.href = "./Usuario.html";
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
