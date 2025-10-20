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

    // on recupere dans le DOM les elements avec lequels on souhaite interagir
    const elHiScore = document.getElementById(`hi-score`);
    const elBtnResetScore = document.getElementById(`btn-reset-score`);
    const elCurrentScore = document.getElementById(`current-score`);
    const elDeck = document.getElementById(`deck`);
    const elFinalScore = document.getElementById(`final-score`);
    const elModalWin = document.getElementById(`modal-win`);
    const elBtnPlayAgain = document.getElementById(`btn-play-again`);

    /* on peut declarer plusieur constante avec le meme "const"
    EX: const TOTO = 5, TRUC =10, MACHIN = 56;
    on peut l'ecrire de maniere plus jolie :
    const
        TOTO = 5,
        TRUC = 10,
        MACHIN = 56;
    */

    // Etape de demarrage
    // TODO: Recuperation et affichage du hi-score
    // TODO: Implementer les clicks sur les boutons fixes: elHiScore, elBtnPlayAgain

    //ecouteur de click sur le bouton de remise a zero du hi-score
    elBtnResetScore.addEventListener(`click`, function () {
        // TODO: effacer le hi-score de la memoire

        // on reinitialise l'affichage
        elHiScore.textContent = `Aucun`;
    });

    // creer une fonction pour reinitialiser l'interface graphique 
    function initGame() {
        console.log("Initialisation du jeu");

        //Ecouteur de click
        elBtnPlayAgain.addEventListener(`click`, function () {
            //effacer le hi-score de la mamoire

            //on cache la modale de victoire
            elModalWin.classList.add(`hidden`);

            //on reinitialise le jeu
            initGame()
        })



    }

    // initialisation du jeu
    initGame();

}

// Mise en place d'un ecouteur pour ne lancer le code que lorsque le navigateur a termine de charger le DOM
document.addEventListener(`DOMContentLoaded`, handlerDomContentLoaded);
