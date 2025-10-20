console.log('Ça marche !');
/*
<div class="card">
                <!-- div.card-back+div.card-img -->
                <div class="card-back"></div>
                <div class="card-img" style="background-image:url('img/8.webp')"></div>
            </div>
*/


function handlerDomContentLoaded() {
    // Le code du jeu
    console.log(`Le jeu demarre`)
}

// Mise en place d'un ecouteur pour ne lancer le code que lorsque le navigateur a termine de charger le DOM
document.addEventListener( `DOMContentLoaded`, handlerDomContentLoaded );
