console.log('Ça marche !');


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

    //variables de fonctionnement du jeu
    let arrNumCards = [];


    // Etapes de demarrage

    //ecouteur de click sur le bouton de remise a zero du hi-score
    elBtnResetScore.addEventListener(`click`, function () {
        // TODO: effacer le hi-score de la memoire

        // on reinitialise l'affichage
        elHiScore.textContent = `Aucun`;
    });

    //Ecouteur de click
    elBtnPlayAgain.addEventListener(`click`, function () {
        //effacer le hi-score de la mamoire

        //on cache la modale de victoire
        elModalWin.classList.add(`hidden`);

        //on reinitialise le jeu
        initGame()
    })

    //fonction utilitaire de melange de tableau
    function shuffleArray(arr) {
        // on recupere l'index max de arr
        let idMax = arr.length - 1;

        //boucle de lecture inverser du tableau
        while (idMax > 0) {
            //generation d'un index aleatoire de 0 a (idMax - 1)
            let idRandom = Math.floor(Math.random() * idMax);

            //on recupere les valeurs associees aux 2 indices
            let valueAtMax = arr[idMax];
            let valueAtRandom = arr[idRandom];

            //on echange les places des 2 valeurs dans le tableau
            arr[idMax] = valueAtRandom;
            arr[idRandom] = valueAtMax;

            //forme courte, moins lisible
            //on donne a gauche une liste de position dans le tableau
            //et a droite la liste des valeur dans le meme ordre a associer
            //[ arr[idMax], arr[idRandom] ] = [ valueAtRandom, valueAtMax ];

            //on decremente l'idMax avec lequel on travail
            idMax--;
        }
    }

    //generation du DOM d'une carte
    function getCardDom(numCard) {
        /*
        <div class="card">
                <div class="card-back"></div>
                <div class="card-img" style="background-image:url('img/[numCard].webp')"></div>
            </div>
        */
        const elCard = document.createElement(`div`);
        elCard.classList.add(`card`);

        //on fabrique l'interieur de elCard
        let cardInnerHTML = `<div class="card-back"></div>`;
        cardInnerHTML += `<div class="card-img" style="background-image:url('img/${numCard}.webp')"></div>`;
        elCard.innerHTML = cardInnerHTML;

        //TODO: temporaire, event listener pour le clic de la carte
        elCard.addEventListener(`click`, function () {
            elCard.classList.toggle(`flipped`);
        });

        return elCard;
    }

    // creer une fonction pour reinitialiser l'interface graphique 
    function initGame() {
        console.log("Initialisation du jeu");
        //remise a zero du current score
        elCurrentScore.textContent = 0;

        //remise a zero du final score
        elFinalScore.textContent = ``;

        //vidange du deck
        elDeck.innerHTML = ``;

        //generation aleatoire d'une liste de nombres en double
        for (let i = 1; i <= 12; i++) {
            //on ajoute deux fois i ala fin du tableau
            arrNumCards.push(i, i);
        }
        //liste avant melange
        console.log(arrNumCards)

        //on melange les cartes
        shuffleArray(arrNumCards);
        //liste apres melange
        console.log(arrNumCards);

        //on parcours la liste pour fabriquer les cartes et les afficher

        //Boucle pour parcourir un tableau => for( ... ; ... ; ... )
        // for(let i = 0; i < arrNumCards.length; i ++){
        //    console.log( arrNumCards[i] );
        //}
        //Boucle pour parcourir un tableau dans son integralite => for( ... in ... )
        //for (let i in arrNumCards) {
        //    console.log(arrNumCards[i]);
        //}
        //boucle pour parcourir un tableau dans son integralite => Array.forEach()
        //arrNumCards.forEach((numCard) => { console.log(numCard); });

        //Boucle pour parcourir un tableau dans son integralite => for( ... of ... )
        for (let numCard of arrNumCards) {
            const elCard = getCardDom(numCard);
            elDeck.append(elCard);
        }

    }
    
    // initialisation du jeu
    initGame();


}

// Mise en place d'un ecouteur pour ne lancer le code que lorsque le navigateur a termine de charger le DOM
document.addEventListener(`DOMContentLoaded`, handlerDomContentLoaded);
