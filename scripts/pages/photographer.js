//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let idPhotographer = parseInt(params.get("id"));

async function getPhotographerById(idPhotographer) {
    try {
        const response = await fetch('/data/photographers.json');
        const data = await response.json();
        const photographers = data.photographers;

        // Find the photographer with the matching ID
        const photographer = photographers.find(p => p.id === idPhotographer);

        // Log and return the photographer
        console.log(photographer);
        return photographer;
    } catch (error) {
        console.error('Error fetching photographer data:', error);
    }
}

async function displayData(photographer) {
    const existingContainer = document.getElementById('photograph-header-container'); // Use the existing container
    const photographerSection = document.querySelector(".photograph-header");
        const photographerModel = photographerTemplate(photographer);
        const userPageDOM = photographerModel.getUserPageDOM(existingContainer);
        photographerSection.appendChild(userPageDOM);
}

async function init() {
    // Récupère les datas des photographes
    const photographer  = await getPhotographerById(idPhotographer);
    displayData(photographer);
}

init();


