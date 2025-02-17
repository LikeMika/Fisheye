//Mettre le code JavaScript lié à la page photographer.html
let params = new URL(document.location).searchParams;
let idPhotographer = parseInt(params.get("id"));


async function getPhotographerById(idPhotographer) {
    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        const photographers = data.photographers;

        const photographer = photographers.find(p => p.id === idPhotographer);
        
        return photographer;
    } catch (error) {
        console.error('Error fetching photographer data:', error);
    }
}

async function getPhotographerMediaById(idPhotographer) {
    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        const pictures = data.media;
        const picturesPhotographer = pictures.filter(d => d.photographerId === idPhotographer);
        console.log(picturesPhotographer);
        return picturesPhotographer;
    } catch (error) {
        console.error('Error fetching photographer data:', error);
    }
}


async function displayData(photographer) {
    const existingContainer = document.getElementById('photograph-header-container'); // Use the existing container
    const photographerSection = document.querySelector(".photograph-header");
    const pricingSection = document.querySelector(".bottom-widget");
        const photographerModel = photographerTemplate(photographer);
        const userPageDOM = photographerModel.getUserPageDOM(existingContainer);
        const userPricingDOM = photographerModel.getUserPricingDOM(pricingSection);
        photographerSection.appendChild(userPageDOM);
        pricingSection.appendChild(userPricingDOM);
}

async function displayMedia(picturesPhotographer) {
    const photographer  = await getPhotographerById(idPhotographer);
    MediaTemplate(picturesPhotographer, photographer.name.split(' ')[0]); 
}

async function init() {
    const photographer  = await getPhotographerById(idPhotographer);
    const picturesPhotographer = await getPhotographerMediaById(idPhotographer);
    displayMedia(picturesPhotographer);
    displayData(photographer);
}

init();


