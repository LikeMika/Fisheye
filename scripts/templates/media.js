function MediaTemplate(media, name) {
    const { title, image, likes, date, priceMedia } = media;
    const firstname = name.split(' ')[0];
    
        function getUserMediaDOM(mediaContainer) {
            media.forEach(item => {
            const mediaElement = document.createElement('div');
            mediaElement.classList.add('media-item');
            console.log("item"+item);
            if (item.image) {
                const img = document.createElement('img');
                img.src = `/assets/photograph/${firstname}/${item.image}`;
                img.alt = item.title;
                mediaElement.appendChild(img);
            } else if (item.video) {
                const video = document.createElement('video');
                video.src = `assets/photograph/${firstname}/${item.video}`;
                video.controls = true;
                mediaElement.appendChild(video);
            }
            const mediaContentElement = document.createElement('div');
            mediaContentElement.classList.add('media-content');
            const title = document.createElement('h3');
            title.textContent = item.title;
            mediaContentElement.appendChild(title);
    
            const likes = document.createElement('p');
            //likes.textContent = `${item.likes}`;
            likes.innerHTML = `${item.likes} <i class="fa-regular fa-heart"></i>`;
            mediaContentElement.appendChild(likes);

            mediaElement.appendChild(mediaContentElement);
            mediaContainer.appendChild(mediaElement);
        });
        }
        return { title, image, likes, date, priceMedia, getUserMediaDOM }
    
    
}