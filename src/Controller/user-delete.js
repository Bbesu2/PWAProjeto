import { auth, db } from "../Model/configFirebase.js";
import { 
  onAuthStateChanged, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("Nenhum usuário logado.");
    return;
  }

  console.log("Usuário logado:", user.email);

  const deleteBtn = document.getElementById("deleteAccount");
  console.log("Botão encontrado:", deleteBtn);

  deleteBtn?.addEventListener("click", async () => {
    const confirmar = confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirmar) return;

    try {
      // exclui documento primeiro
      await deleteDoc(doc(db, "users", user.uid));
      console.log("Documento excluído do Firestore");

      // depois exclui conta
      await user.delete();
      console.log("Conta excluída do Auth");

      alert("Conta excluída com sucesso!");
      window.location.href = "./Cadastro.html";
    } catch (error) {
      console.error("Erro ao excluir:", error);

      if (error.code === "auth/requires-recent-login") {
        const senha = prompt("Digite sua senha para confirmar exclusão:");
        if (senha) {
          try {
            const cred = EmailAuthProvider.credential(user.email, senha);
            await reauthenticateWithCredential(user, cred);

            await deleteDoc(doc(db, "users", user.uid));
            await user.delete();

            alert("Conta excluída com sucesso!");
            window.location.href = "./Cadastro.html";
          } catch (err) {
            alert("Erro ao excluir conta: " + err.message);
          }
        } else {
          alert("Exclusão cancelada.");
        }
      } else {
        alert("Erro ao excluir conta: " + error.message);
      }
    }
  });
});
