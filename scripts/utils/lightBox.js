const lightboxContainer = document.getElementById("lightbox");
const lightbox = document.getElementById("modal-lightbox");
const lightboxMedia = document.getElementById("lightbox-media");
const lightboxTitle = document.getElementById("lightbox-title");
const prevButton = document.getElementById("btn-nav-left");
const nextButton = document.getElementById("btn-nav-right");
const closeButton = document.getElementById("close");

let mediaList = [];
let currentIndex = 0;
let firstname = "";

//const mediaSelected = document.querySelector(".image");
//mediaSelected.addEventListener("click", showMedia);

function showMedia(source) {
    console.log("la source est: "+source);

    const modal = document.getElementById("lightbox");
	modal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    const selectedMediaContainer = document.getElementById('live_media');
    //selectedMediaContainer.innerHTML = "";
    const imageSelected = document.createElement('img');
    imageSelected.setAttribute("src", source);
    imageSelected.setAttribute("alt", "test");
    selectedMediaContainer.appendChild(imageSelected);
}

function openLightbox(index, mediaAll, photographerName) {
    firstname = photographerName;
    mediaList = mediaAll;
    currentIndex = index;
    console.log("index is: "+index);
    updateLightbox();
    lightboxContainer.classList.add("visible");
    //lightboxContainer.style.display = "block";
}

function updateLightbox() {
    const media = mediaList[currentIndex];

    // Clear previous content
    lightboxMedia.innerHTML = "";

    if (media.image) {
        const img = document.createElement("img");
        img.src = `/assets/photograph/${firstname}/${media.image}`;
        lightboxMedia.appendChild(img);
    } else if (media.video) {
        const video = document.createElement("video");
        video.src = media.video;
        video.controls = true;
        video.autoplay = true;
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

// Close when clicking outside of media
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});

// Gestion du clavier
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") navigateLightbox(-1);
    if (event.key === "ArrowRight") navigateLightbox(1);
});

function closeMedia() {
    //const modal = document.getElementById("lightbox");
    lightboxContainer.classList.remove("visible");
    document.body.style.position = 'relative';
    document.body.style.top = `${window.scrollY}px`;
}
