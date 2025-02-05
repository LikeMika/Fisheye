const left = document.getElementById("first");
const right = document.getElementById("last");

//const mediaSelected = document.querySelector(".image");
//mediaSelected.addEventListener("click", showMedia);

function showMedia(source) {
    console.log("la source est: "+source);
    const modal = document.getElementById("lightbox");
	modal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    const selectedMediaContainer = document.getElementById('live_media');
    const imageSelected = document.createElement('img');
    imageSelected.setAttribute("src", source);
    imageSelected.setAttribute("alt", "test");
    selectedMediaContainer.appendChild(imageSelected);
}

function closeMedia() {
    const modal = document.getElementById("lightbox");
    modal.style.display = "none";
    document.body.style.position = 'relative';
    document.body.style.top = `${window.scrollY}px`;
}
