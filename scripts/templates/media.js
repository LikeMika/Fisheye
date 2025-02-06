function MediaTemplate(media, name) {
    const { id, photographerId, title, image, likes, date, priceMedia } = media;
    const firstname = name.split(' ')[0];
    let totalLikes = 0;
        function getUserMediaDOM(mediaContainer) {
            media.forEach((item, index) => {
            const mediaElement = document.createElement('div');
            mediaElement.classList.add('media-item');
            console.log("item"+item);
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
    
            const likes = document.createElement('p');
            //likes.textContent = `${item.likes}`;
            const mediaLikes = item.likes;
            likes.innerHTML = `${mediaLikes} <i class="fa-regular fa-heart"></i>`;
            mediaContentElement.appendChild(likes);
            totalLikes = totalLikes + mediaLikes;

            mediaElement.appendChild(mediaContentElement);
            mediaContainer.appendChild(mediaElement);
            preview.addEventListener("click", () => openLightbox(index, media, firstname));
            
        });

        }

        return { id, photographerId, title, image, likes, date, priceMedia, getUserMediaDOM }
    
    
}