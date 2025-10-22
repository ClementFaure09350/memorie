let nbParLevel = 9

// L'objet litteral respecte le format JSON
//- Pas de commentaire
//- Clés delimitees par des ""
//- Valeurs de type string entre ""
const gameConfig = {
    "distinctCards": nbParLevel, 
    "timerDelay": 1000,
    "themes": [
        {
            "slug": "default",
            "displayName": "Par defaut",
        },
        {
            "slug": "Mal-aux-yeux",
            "displayName": "Mal aux yeux",
        },
    ]
}