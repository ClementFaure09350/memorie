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

    //reglage du jeu
    const gameConfig = {
        distinctCards: 12, // nombre d'image differente
        timerDelay: 1000, // duree d'affichage des paires non marque
    }
    // objet litteral qui contient les infos de l'etat actuel de la partie
    const gameState = {
        arrFound: [], // liste des numeros deja decouvert
        arrFlipped: [], // liste temporaire des cartes retournees pendant une tentative
        canPlay: true, // flag qui empeche 
        tries: 0,// flag qui empeche  // nombre de tentative de la partie en court
        hiScore: 0, //hi-score actuel: 0 signifiera qu'il n'y en a pas encore
        timer: null //timer de retournement des cartes non matchéés
    };


    // Etapes de demarrage
    //recuperation de l'affichage du hi-score
    const storedHiScore = localStorage.getItem('memory-game-hiscore');
    //s'il n'en existe pas on le cree dans le stockage du navigateur
    if (storedHiScore === null) {
        localStorage.setItem('memory-game-hiscore', gameState.hiScore)
        //sinon on met a jour le gameState
    } else {
        gameState.hiScore = parseInt(storedHiScore, 10);
    }


    //ecouteur de click sur le bouton de remise a zero du hi-score
    elBtnResetScore.addEventListener(`click`, function () {

        //effacer le hi-score de la memoire
        localStorage.removeItem('memory-game-hiscore');

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
        <div class="card" data-num-card="[numCard]">
                <div class="card-back"></div>
                <div class="card-img" style="background-image:url('img/[numCard].webp')"></div>
            </div>
        */
        const elCard = document.createElement(`div`);
        elCard.classList.add(`card`);
        elCard.dataset.numCard = numCard;


        //on fabrique l'interieur de elCard
        let cardInnerHTML = `<div class="card-back"></div>`;
        cardInnerHTML += `<div class="card-img" style="background-image:url('img/${numCard}.webp')"></div>`;
        elCard.innerHTML = cardInnerHTML;

        //event listener pour le clic de la carte
        elCard.addEventListener(`click`, handlerCarteClick);


        return elCard;
    }


    // creer une fonction pour reinitialiser l'interface graphique 
    function initGame() {
        console.log("Initialisation du jeu");
        //remise a zero du current score
        gameState.tries = 0;
        elCurrentScore.textContent = gameState.tries;

        //remise a zero du final score
        elFinalScore.textContent = ``;

        //remise a zero de la liste des paires trouvees
        gameState.arrFound = [];

        //on vide la liste des cartes
        arrNumCards = [];
        //vidange du deck
        elDeck.innerHTML = ``;

        //afficher le hi-score
        elHiScore.textContent = gameState.hiScore > 0 ? gameState.hiScore : 'aucun';

        //generation aleatoire d'une liste de nombres en double
        for (let i = 1; i <= gameConfig.distinctCards; i++) {
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

    // Gestionnaire du click d'une carte
    function handlerCarteClick() {
        // console.log(`cliquée: `, this.dataset.numCard);
        //technique de "early return" :
        //on sort de la fonction si on n'a plus besoin d'executer la suite du code
        //on limite l'emboitement de plusieurs niveaux d'indentation typiquement
        // generes par des blocs if ... els les uns dans les autres
        //si on n'a pas le droit de retourner de cartes ou qu'elle est deja retourner ,on sort 
        if (!gameState.canPlay || this.classList.contains(`flipped`)) {
            console.log(`no no no`);
            return;
        }

        // on reinitialise le timer
        clearTimeout(gameState.timer);

        //console.log( `Cliqué: `, this.dataset.numCard);
        this.classList.add(`flipped`);

        //sion n'a pas deja retourner une carte
        if (!gameState.arrFlipped.length > 0) {
            gameState.arrFlipped.push(this);
            //console.log(gameState.arrFlipped);
            return;
        }

        //sinon on continue//on vide la liste des cartes
        arrNumCards = [];
        gameState.tries++;

        //on met a jour elCurrentScorers niveaux d'indentation typiquement
        // generes par des blocs if ... else les uns dans les autres
        //si on n'a pas le droit de retourner de cartes ou qu'elle est deja retourner ,on sort 
        elCurrentScore.textContent = gameState.tries

        //on recupere les numero des 2 cartes
        const numCard1 = gameState.arrFlipped[0].dataset.numCard;
        const numCard2 = this.dataset.numCard;

        //si les 2 cartes sont identiques
        if (numCard1 === numCard2) {
            //on ajoute le numero de la carte dans la liste des cartes trouvees
            gameState.arrFound.push(numCard1);
            //on vide arrFlipped pour la prochaine tentative
            gameState.arrFlipped = [];

            //si on a trouve toute les paires
            if (gameState.arrFound.length < gameConfig.distinctCards) {
                return;
            }

            //sinon
            //on met a jour le score final
            elFinalScore.textContent = gameState.tries;
            //on affiche la modal
            elModalWin.classList.remove('hidden');

            //gestion du hi-score
            //sur un test avec, on met d'abord le cas le plus frequent car s'il est vrai
            //l' autre test ne sera pas evalue car il n'aua aucun effet sur le resultat final
            //cela permet d'economiser le traitement inutile d'une comparaison
            //si aucun hi-score ou que le nombre de tentatives est meilleur que hi-score
            // => enregistrement du hi-score
            if (gameState.tries < gameState.hiScore || gameState.hiScore <= 0) {
                //on met a jour le gameState
                gameState.hiScore = gameState.tries;
                // on enregistre le nouveau score dans localStorage
                localStorage.setItem( 'memory-game-hiscore', gameState.hiScore );
            }

            return;

        };

        //on ajoute la carte actuelle a la liste de cartes retourner
        gameState.arrFlipped.push(this);

        //on desactive la possibilite de jouer d'autre carte
        gameState.canPlay = false;

        //on lance un timer qui remet les cartes en plac au bout d'un temps defini
        // dans une fonction fleche, la convention dit que un argument seul qui est
        //a coup sur "undefined" doit etre nomme "_"
        gameState.timer = setTimeout(_ => {
            //pour chaque carte retournee sur cette tentative
            for (let elCard of gameState.arrFlipped) {
                elCard.classList.remove('flipped');
            }

            //onretire la possibilite de retourner d'autres cartes
            gameState.canPlay = true;

            //on reinitialise la liste des carte
            gameState.arrFlipped = [];

        }, gameConfig.timerDelay);

    }

    // initialisation du jeu
    initGame();
}

// Mise en place d'un ecouteur pour ne lancer le code que lorsque le navigateur a termine de charger le DOM
document.addEventListener(`DOMContentLoaded`, handlerDomContentLoaded);
