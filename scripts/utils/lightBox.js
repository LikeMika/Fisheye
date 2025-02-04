const left = document.getElementById("first");
const right = document.getElementById("last");


function displayMedia() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
}

function closeMedia() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.position = 'relative';
    document.body.style.top = `${window.scrollY}px`;
}
