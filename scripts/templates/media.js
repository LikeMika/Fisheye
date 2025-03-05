let totalLikes = 0;
let mediaArray = [];
let photographerName = '';
const totalLikesContainer = document.getElementById('total-likes');
const selectClassHandle = document.getElementById('select-origin');
const selectItems = document.querySelectorAll('.select-items div');
const upDown = document.getElementById('updown');

const mediaContainer = document.getElementById('photograph-media');

// Variable pour suivre l'ordre du tri (ascendant ou descendant)
let sortOrder = {
    popularity: true, // true = croissant, false = décroissant
    title: true
};

//on stock dans un objet le status de l'icon heart
let likedMedia = {};

class MediaFactory {
    static createMediaItem(mediaData, photographerName, index) {
        if (mediaData.image) {
            return new ImageMedia(mediaData, photographerName, index);
        } else if (mediaData.video) {
            return new VideoMedia(mediaData, photographerName, index);
        } else {
            console.log("format non supporté");
        }
    }
}

class BaseMedia {
    constructor(data, photographerName, index) {
        this.data = data;
        this.photographerName = photographerName;
        this.index = index;
    }

    createCommonContent() {
        const mediaContentElement = document.createElement("div");
        mediaContentElement.classList.add("media-content");

        const title = document.createElement("h3");
        title.textContent = this.data.title;

        const likeContainer = document.createElement("div");
        likeContainer.classList.add("like-container");

        const likeCount = document.createElement("span");
        likeCount.textContent = this.data.likes;
        likeCount.classList.add("like-count");

        const likeIcon = document.createElement("i");
        likeIcon.setAttribute('tabindex', "0");
        likeIcon.classList.add("fa-heart");
        likeIcon.style.cursor = "pointer";

        if (likedMedia[this.data.title]) {
            likeIcon.classList.add("fa-solid");
        } else {
            likeIcon.classList.add("fa-regular");
        }

        likeIcon.addEventListener("click", () => addLike(this.data, likeCount, likeIcon));
        likeIcon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                addLike(this.data, likeCount, likeIcon);
            }
        });

        likeContainer.appendChild(likeCount);
        likeContainer.appendChild(likeIcon);

        mediaContentElement.appendChild(title);
        mediaContentElement.appendChild(likeContainer);

        return mediaContentElement;
    }
}

class ImageMedia extends BaseMedia {
    createMediaElement() {
        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");
        mediaElement.setAttribute('aria-label', `Photo de ${this.photographerName} portant le nom de ${this.data.title}`);

        const img = document.createElement("img");
        img.src = `assets/photograph/${this.photographerName.split(' ')[0]}/${this.data.image}`;
        img.alt = `Photo ${this.data.title}`;
        img.setAttribute("tabindex", "0");
        img.dataset.index = this.index;

        img.addEventListener("click", () => openLightbox(this.index, mediaArray, this.photographerName));
        img.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                openLightbox(this.index, mediaArray, this.photographerName);
            }
        });

        mediaElement.appendChild(img);
        mediaElement.appendChild(this.createCommonContent());

        return mediaElement;
    }
}

class VideoMedia extends BaseMedia {
    createMediaElement() {
        const mediaElement = document.createElement("div");
        mediaElement.classList.add("media-item");
        mediaElement.setAttribute('aria-label', `Vidéo de ${this.photographerName} portant le nom de ${this.data.title}`);

        const video = document.createElement("video");
        video.src = `assets/photograph/${this.photographerName.split(' ')[0]}/${this.data.video}`;
        video.controls = false;
        video.dataset.index = this.index;

        video.addEventListener("click", () => openLightbox(this.index, mediaArray, this.photographerName));
        video.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                openLightbox(this.index, mediaArray, this.photographerName);
            }
        });

        mediaElement.appendChild(video);
        mediaElement.appendChild(this.createCommonContent());

        return mediaElement;
    }
}


function MediaTemplate(media, name) {
    mediaArray = media;
    photographerName = name;
    getUserMediaDOM();
}

function getUserMediaDOM() {
    mediaContainer.innerHTML = "";
    let newTotalLikes = 0;

    mediaArray.forEach((item, index) => {
        if (!item.initialLikes) {
            item.initialLikes = item.likes;
        }
        newTotalLikes += item.likes;

        const mediaItem = MediaFactory.createMediaItem(item, photographerName, index);
        const mediaElement = mediaItem.createMediaElement();

        mediaContainer.appendChild(mediaElement);
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
            likedMedia[item.title] = false;
            likeIcon.classList.remove('fa-solid');
            likeIcon.classList.add('fa-regular');
        }
    } else {
        item.likes++;
        totalLikes++;
        likedMedia[item.title] = true;
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
    }
        totalLikesContainer.textContent = totalLikes;
        likeCountElement.textContent = item.likes;
        likeCountElement.classList.toggle('liked');

}

function sortMedia(criteria) {
    mediaArray.sort((a, b) => {
        if (criteria === 'popularity') {
            return sortOrder.popularity ? a.likes - b.likes : b.likes - a.likes;
        }
        if (criteria === 'date') {
            return sortOrder.date ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        }
        if (criteria === 'title') {
            return sortOrder.title ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
    });

    sortOrder[criteria] = !sortOrder[criteria];
    selectClassHandle.classList.remove('clicked');
    getUserMediaDOM();
}

  const selectSelected = document.querySelector('.select-selected');
  
  selectClassHandle.setAttribute('tabindex', '0');
  selectItems.forEach(item => {
    if (!item.classList.contains('separator')) { //on évite le focus sur le separator
        item.setAttribute('tabindex', '0');
    }
});


function toggleDropdown() {
    const dropdown = selectClassHandle.nextElementSibling.nextElementSibling;
    const isOpen = !dropdown.classList.contains('select-hide');

    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    selectClassHandle.classList.add('clicked');
    upDown.src = 'assets/images/up.png';
    selectClassHandle.nextElementSibling.nextElementSibling.classList.remove('select-hide');
}

function closeDropdown() {
    selectClassHandle.classList.remove('clicked');
    upDown.src = 'assets/images/down.png';
    selectClassHandle.nextElementSibling.nextElementSibling.classList.add('select-hide');
}

function selectItem(item) {
    if (!item.classList.contains('separator')) {
        selectClassHandle.innerText = item.innerText;
        closeDropdown();
        sortMedia(item.getAttribute('data-value'));
    }
}

// Ouverture du tri
selectClassHandle.addEventListener('click', toggleDropdown);

// Ouverture du tri via clavier
selectClassHandle.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown();
    }
});

// Selection du tri via click et clavier
selectItems.forEach(function(item) {
    item.addEventListener('click', function() {
        selectItem(this);
    });

    item.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            selectItem(this);
        }
    });
});

// Fermeture du tri au click en dehors
window.addEventListener('click', function(event) {
    if (!event.target.closest('.custom-select')) {
        closeDropdown();
    }
});