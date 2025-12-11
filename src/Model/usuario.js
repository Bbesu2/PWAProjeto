import { auth, db } from "./configFirebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();

        const apelidoEl = document.getElementById("LogadoApelidoUser");
        if (apelidoEl) apelidoEl.innerText = userData.apelido || "";

        const nomeEl = document.getElementById("LogadoNomeUser");
        if (nomeEl) nomeEl.innerText = userData.nome || "";

        const emailEl = document.getElementById("LogadoEmailUser");
if (emailEl) {
  const emailFromFirestore =
    typeof userData.email === "string" ? userData.email.trim() : "";

  const emailFromAuth =
    typeof user.email === "string" ? user.email.trim() : "";

  emailEl.innerText = emailFromFirestore || emailFromAuth || "";
}

      } else {
        console.log("Nenhum documento encontrado com esse ID");
      }
    } catch (error) {
      console.error("Erro ao pegar o documento:", error);
    }
  } else {
    console.log("Nenhum usuário logado");
  }
});
