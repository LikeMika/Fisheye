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
    
            const title = document.createElement('h3');
            title.textContent = item.title;
            mediaElement.appendChild(title);
    
            const likes = document.createElement('p');
            likes.textContent = `${item.likes} likes`;
            mediaElement.appendChild(likes);
    
            const price = document.createElement('p');
            price.textContent = `Price: $${item.price}`;
            mediaElement.appendChild(price);
    
            mediaContainer.appendChild(mediaElement);
        });
        }
        return { title, image, likes, date, priceMedia, getUserMediaDOM }
    
    
}