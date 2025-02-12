let totalLikes = 0;
let mediaArray = [];
let photographerName = '';
const totalLikesContainer = document.getElementById('total-likes');

const sortSelect = document.getElementById('sort-options');
const mediaContainer = document.getElementById('photograph-media');

// Variable pour suivre l'ordre du tri (ascendant ou descendant)
let sortOrder = {
    popularity: true, // true = croissant, false = décroissant
    title: true
};

function MediaTemplate(media, name) {
    mediaArray = media;
    photographerName = name;
    getUserMediaDOM();
}

function getUserMediaDOM() {
    mediaContainer.innerHTML = "";
    let newTotalLikes = 0;

    mediaArray.forEach((item, index) => {
        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");

        if (!item.initialLikes) {
            item.initialLikes = item.likes;
        }
        newTotalLikes += item.likes;

        let preview;
        if (item.image) {
            const img = document.createElement("img");
            img.src = `/assets/photograph/${photographerName.split(' ')[0]}/${item.image}`;
            img.alt = item.title;
            preview = img;
            mediaElement.appendChild(img);
        } else if (item.video) {
            const video = document.createElement("video");
            video.src = `/assets/photograph/${photographerName.split(' ')[0]}/${item.video}`;
            video.controls = true;
            preview = video;
            mediaElement.appendChild(video);
        }
        preview.dataset.index = index;

        const mediaContentElement = document.createElement("div");
        mediaContentElement.classList.add("media-content");

        const title = document.createElement("h3");
        title.textContent = item.title;
        mediaContentElement.appendChild(title);

        const likeContainer = document.createElement("div");
        likeContainer.classList.add("like-container");

        const likeCount = document.createElement("span");
        likeCount.textContent = item.likes;
        likeCount.classList.add("like-count");

        const likeIcon = document.createElement("i");
        likeIcon.classList.add("fa-regular", "fa-heart");
        likeIcon.style.cursor = "pointer";

        likeContainer.appendChild(likeCount);
        likeContainer.appendChild(likeIcon);
        mediaContentElement.appendChild(likeContainer);
        mediaElement.appendChild(mediaContentElement);
        mediaContainer.appendChild(mediaElement);

        likeIcon.addEventListener("click", () => addLike(item, likeCount, likeIcon));

        preview.addEventListener("click", () => openLightbox(index, mediaArray, photographerName));
    });

    totalLikes = newTotalLikes;
    totalLikesContainer.textContent = totalLikes;
}

function addLike(item, likeCountElement, likeIcon) {
    const isLiked = likeIcon.classList.contains('fa-solid');

    if (isLiked) {
        if (item.likes > item.initialLikes) {
            item.likes--;
            totalLikes--;
            likeIcon.classList.remove('fa-solid');
            likeIcon.classList.add('fa-regular');
        }
    } else {
        item.likes++;
        totalLikes++;
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
    }
        totalLikesContainer.textContent = totalLikes;
        likeCountElement.textContent = item.likes;
        likeCountElement.classList.toggle('liked');

}

function sortMedia(criteria) {
    //console.log("Picture photographer from sort: "+mediaArray);
    mediaArray.sort((a, b) => {
        if (criteria === 'popularity') {
            return sortOrder.popularity ? a.likes - b.likes : b.likes - a.likes;
        }
        /*if (criteria === 'date') {
            return sortOrder.date ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }*/
        if (criteria === 'title') {
            return sortOrder.title ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
    });

    sortOrder[criteria] = !sortOrder[criteria];

    getUserMediaDOM();
}

// Écouteur d'événement sur le menu déroulant pour trier les médias
sortSelect.addEventListener('change', function() {
    const selectedOption = this.value;
    sortMedia(selectedOption);
});