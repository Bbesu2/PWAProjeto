import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  const logadoUserID = localStorage.getItem("logadoUserID");
  if (logadoUserID) {
    try {
      const docRef = doc(db, "users", logadoUserID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("LogadoApelidoUser").innerText = userData.apelido || "";
        document.getElementById("LogadoNomeUser").innerText = userData.nome || "";
        document.getElementById("LogadoEmailUser").innerText = userData.email || "";
      } else {
        console.log("Nenhum documento encontrado com esse ID");
      }
    } catch (error) {
      console.error("Erro ao pegar o documento:", error);
    }
  } else {
    console.log("Id do usuário não encontrado no localStorage");
  }
});
