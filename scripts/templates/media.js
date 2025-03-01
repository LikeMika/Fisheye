let totalLikes = 0;
let mediaArray = [];
let photographerName = '';
const totalLikesContainer = document.getElementById('total-likes');
const selectClassHandle = document.getElementById('select-origin');
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
        likeIcon.classList.add("fa-heart");
        likeIcon.style.cursor = "pointer";

        if (likedMedia[this.data.title]) {
            likeIcon.classList.add("fa-solid");
        } else {
            likeIcon.classList.add("fa-regular");
        }

        likeIcon.addEventListener("click", () => addLike(this.data, likeCount, likeIcon));

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
        img.dataset.index = this.index;

        img.addEventListener("click", () => openLightbox(this.index, mediaArray, this.photographerName));

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

document.querySelector('.select-selected').addEventListener('click', function() {
    upDown.nextElementSibling.classList.toggle('select-hide');
    if (selectClassHandle.classList.contains('clicked'))
    {
        this.classList.remove('clicked');
        upDown.src = 'assets/images/down.png';
    }
    else {
        this.classList.add('clicked');
        upDown.src = 'assets/images/up.png';
    }
    
  });
  
  //Fonction qui récupère l'option du trie pour lancer la fonction sortMedia
  document.querySelectorAll('.select-items div').forEach(function(item) {
    item.addEventListener('click', function() {
      if (!this.classList.contains('separator')) {
        document.querySelector('.select-selected').innerText = this.innerText;
        this.parentNode.classList.add('select-hide');
        const selectedOption = this.getAttribute('data-value');
        sortMedia(selectedOption);
      }
    });
  });
  
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.select-selected')) {
      const dropdowns = document.querySelectorAll('.select-items');
      selectClassHandle.classList.remove('clicked');
      upDown.src = 'assets/images/down.png';
      dropdowns.forEach(function(dropdown) {
        if (!dropdown.classList.contains('select-hide')) {
          dropdown.classList.add('select-hide');
        }
      });
    }
  });
  