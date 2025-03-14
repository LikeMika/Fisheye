const lightboxContainer = document.getElementById("lightbox");
const lightbox = document.getElementById("modal-lightbox");
const lightboxMedia = document.getElementById("lightbox-media");
const lightboxTitle = document.getElementById("lightbox-title");
const prevButton = document.getElementById("btn-nav-left");
const nextButton = document.getElementById("btn-nav-right");
const closeButton = document.getElementById("close-modal");
const mainContainer = document.getElementById("main");


let mediaList = [];
let currentIndex = 0;
let firstname = "";

function openLightbox(index, mediaAll, photographerName) {
    
    firstname = photographerName;
    mediaList = mediaAll;
    currentIndex = index;
    console.log("index is: "+index);
    updateLightbox();
    lightboxContainer.classList.add("visible");
    lightbox.setAttribute('aria-hidden', 'false');
    mainContainer.setAttribute('aria-hidden', 'true');
    mainContainer.setAttribute('inert', 'true');
    
}

function updateLightbox() {
    
    const media = mediaList[currentIndex];
    lightboxMedia.innerHTML = "";

    if (media.image) {
        const img = document.createElement("img");
        img.src = `assets/photograph/${firstname}/${media.image}`;
        img.setAttribute("alt", "Photo "+media.title);
        lightboxMedia.appendChild(img);
    } else if (media.video) {
        const video = document.createElement("video");
        video.src = `assets/photograph/${firstname}/${media.video}`;
        video.setAttribute("alt", "Video "+media.title);
        video.controls = true;
        video.autoplay = false;
        lightboxMedia.appendChild(video);
    }

    lightboxTitle.textContent = media.title;
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = mediaList.length - 1;
    if (currentIndex >= mediaList.length) currentIndex = 0;
    updateLightbox();
}

prevButton.addEventListener("click", () => navigateLightbox(-1));
nextButton.addEventListener("click", () => navigateLightbox(1));
closeButton.addEventListener("click", closeLightbox);

// Fermeture quand clic en dehors de la zone
lightboxContainer.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});

// Fermeture quand on presse Entrer sur la croix
closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        closeLightbox();
    }
  });
  

function closeLightbox() {
    mainContainer.removeAttribute('inert');
    lightboxContainer.classList.remove("visible");
    mainContainer.setAttribute('aria-hidden', 'false');
   
}
// Gestion du clavier
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") navigateLightbox(-1);
    if (event.key === "ArrowRight") navigateLightbox(1);
});

