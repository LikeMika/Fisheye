function photographerTemplate(data, media) {
    const { name, id, portrait, city, country, tagline, price } = data;
    console.log(data);
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const urlPhotographer = document.createElement('a');
        urlPhotographer.setAttribute("href","photographer.html?id="+id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de "+name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const div = document.createElement('div');
        div.className = "subtitle";
        const location = document.createElement('p');
        location.className = "geo";
        location.textContent = city+", "+country;
        const slogan = document.createElement('p');
        slogan.className = "tag";
        slogan.textContent = tagline;
        const priceDisplay = document.createElement('p');
        priceDisplay.className = "price";
        priceDisplay.textContent = price+"€/jour";
        div.appendChild(location);
        div.appendChild(slogan);
        div.appendChild(priceDisplay);
        urlPhotographer.appendChild(img);
        urlPhotographer.appendChild(h2);
        article.appendChild(urlPhotographer);
        article.appendChild(div);
        return (article);
    }
    function getUserPageDOM(container) {
        const div = document.createElement('div');
        div.className = "photographerInfo";
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.className = "geo";
        location.textContent = city+", "+country;
        const slogan = document.createElement('p');
        slogan.className = "tag";
        slogan.textContent = tagline;
        div.appendChild(h2);
        div.appendChild(location);
        div.appendChild(slogan);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Portrait de "+name);
        container.appendChild(div);
        container.appendChild(img);
        return container;
    }
    
    function getUserPricingDOM(pricingContainer) {
        const divPricing = document.createElement('div');
        divPricing.className = "pricing";
        divPricing.textContent = price+"€ / jour";
        pricingContainer.appendChild(divPricing);
        return pricingContainer;
    }

    function showTotalLikes(likesContainer, total)
    {
        const pLikes = document.createElement('p');
        pLikes.className = "likes";
        pLikes.textContent = total;
        likesContainer.appendChild(pLikes);
        section.appendChild(likesContainer);
    }

    return { name, id, picture, city, country, tagline, price, getUserCardDOM, getUserPageDOM, getUserPricingDOM, showTotalLikes }
}