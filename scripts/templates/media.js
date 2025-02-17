let totalLikes = 0;
let mediaArray = [];
let photographerName = '';
const totalLikesContainer = document.getElementById('total-likes');
const selectClassHandle = document.getElementById('select-origin');
const upDown = document.getElementById('updown');

//const sortSelect = document.getElementById('sort-options');
const mediaContainer = document.getElementById('photograph-media');

// Variable pour suivre l'ordre du tri (ascendant ou descendant)
let sortOrder = {
    popularity: true, // true = croissant, false = décroissant
    title: true
};

//on stock dans un objet le status de l'icon heart
let likedMedia = {};

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
        mediaElement.setAttribute('aria-label', 'Photo de '+photographerName+' portant le nom de '+item.title+' avec un total de '+newTotalLikes+ 'likes')

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
            video.controls = false;
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
        likeIcon.classList.add("fa-heart");
        likeIcon.style.cursor = "pointer";

        // On définit la classe de l'icon en fonction de l'objet likeMedia
        if (likedMedia[item.title]) {
            likeIcon.classList.add("fa-solid");
        } else {
            likeIcon.classList.add("fa-regular");
        }

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

// Toggle dropdown visibility
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
  
  // Handle option selection
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
  
  // Close the dropdown if the user clicks outside of it
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
  