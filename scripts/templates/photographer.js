function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
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
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}