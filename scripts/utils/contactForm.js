const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const error = document.querySelector(".formData");
const modal = document.getElementById("contact_modal");
const modalBlock = document.querySelector(".modal");
const modalTitle = document.getElementById("title-contact");
const modalClose = document.getElementById("close-contact-modal");

let verifChamp = false;

function verifierChamp(champ) {
    const valeurChamp = champ.value.trim();
     // Variable Regex pour valider une adresse email
     const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Si le champ est vide, on modifie le css pour afficher l'état d'erreur et on modifie la valeur de la variable de controle
    if (champ.value === "" || valeurChamp.length < 2 || (champ.type === "email" && !regexEmail.test(valeurChamp))) {
      champ.parentElement.setAttribute('data-error-visible', 'true');
      verifChamp = true;
    }
    else {
      champ.parentElement.setAttribute('data-error-visible', 'false');
      if (verifChamp)
      {
        verifChamp = true;
      }
      else
      {
        verifChamp = false;
      }
  
    }
  }

function displayModal() {
    modalBlock.setAttribute('aria-hidden', 'false');
    mainContainer.setAttribute('aria-hidden', 'true');
	  modal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    mainContainer.setAttribute('inert', 'true');
}

function closeModal() {
    mainContainer.removeAttribute('inert');
    modalBlock.setAttribute('aria-hidden', 'true');
    mainContainer.setAttribute('aria-hidden', 'false');
    modal.style.display = "none";
    document.body.style.position = 'relative';
    document.body.style.top = `${window.scrollY}px`;
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

modalClose.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    closeModal();
  }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    verifChamp = false;
    verifierChamp(firstName);
    verifierChamp(lastName);
    verifierChamp(email);
    verifierChamp(message);
    if (!verifChamp) 
        {
          console.log("Prenom: "+firstName.value+'\n'+" Nom:"+lastName.value+'\n'+" Email:"+email.value+'\n'+" Message:"+message.value);
        }
    else {
        console.log("Formulaire non valide");
    }
})