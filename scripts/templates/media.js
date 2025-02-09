let totalLikes = 0;
const totalLikesContainer = document.getElementById('total-likes');

function MediaTemplate(media, name) {
    const { id, photographerId, title, image, likes, date, priceMedia } = media;
    const firstname = name.split(' ')[0];
    totalLikes = 0;
        function getUserMediaDOM(mediaContainer) {
            media.forEach((item, index) => {
            const mediaElement = document.createElement('div');
            mediaElement.classList.add('media-item');
            console.log("item"+item);

            if (!item.initialLikes) {
                item.initialLikes = item.likes;
            }
            item.initialLikes = item.likes;
            totalLikes += item.likes;
            
            if (item.image) {
                const img = document.createElement('img');
                img.src = `/assets/photograph/${firstname}/${item.image}`;
                img.alt = item.title;
                //img.classList = "image";
                //img.setAttribute("onclick", `showMedia('${img.src}')`);
                preview = img;
                mediaElement.appendChild(img);
            } else if (item.video) {
                const video = document.createElement('video');
                video.src = `assets/photograph/${firstname}/${item.video}`;
                video.controls = true;
                mediaElement.appendChild(video);
                preview = video;
            }
            preview.dataset.index = index;
            const mediaContentElement = document.createElement('div');
            mediaContentElement.classList.add('media-content');
            const title = document.createElement('h3');
            title.textContent = item.title;
            mediaContentElement.appendChild(title);
    
            const likeContainer = document.createElement('div');
            likeContainer.classList.add('like-container');
            //likes.textContent = `${item.likes}`;
            //const mediaLikes = item.likes;

            const likeCount = document.createElement('span');
            likeCount.textContent = item.likes;
            likeCount.classList.add('like-count');

            const likeIcon = document.createElement('i');
            likeIcon.classList.add('fa-regular', 'fa-heart');
            likeIcon.style.cursor = 'pointer';

            mediaContentElement.appendChild(likeContainer);
            likeContainer.appendChild(likeCount);
            likeContainer.appendChild(likeIcon);
            

            totalLikesContainer.textContent = totalLikes;
            mediaElement.appendChild(mediaContentElement);
            mediaContainer.appendChild(mediaElement);

            likeIcon.addEventListener("click", () => addLike(item, likeCount, likeIcon, totalLikes));

            preview.addEventListener("click", () => openLightbox(index, media, firstname));
            
        });

        }

        return { id, photographerId, title, image, likes, date, priceMedia, getUserMediaDOM }
    
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