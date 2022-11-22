// DECLARATION DES ELEMENTS

const elements = {
    scrore  : null,
    reponse : null,
    choix   : null
};

// Tavleau des mots à deviner
const motsADeviner = [

    'ALLIANCE',
    'LOUIS',
    'FRANCE'    
];

let choix = [];
let mot = '';

// LES METHODES 
const initialisation = () =>{
    console.log('Savoir en permennace dans la console que tout va bien');

    // Selection des éléments
    elements.scrore     = document.querySelector('#scrore');
    elements.reponse    = document.querySelector('#reponse');
    elements.choix      = document.querySelector('#choix');

    // Choisir le mot
    mot = choixDuMot();
    console.log('mot à deviner', mot);

    // Générer le choix qui est avec les lettre de l'alphabet
    choix = generChoix();
    console.log(choix);

};

// la méthode choixDuMot
const choixDuMot = () =>{
    const generIndexDuMot = generMotAleatoire(0, motsADeviner.length-1);
    return motsADeviner[generIndexDuMot];
};

let generChoix = () =>{
    const choix = [];
    for(let index = 65; index <= 90; index ++){
        choix.push(String.fromCharCode(index));
    };
    return choix;
};



window.addEventListener('load', () =>{
    initialisation();
});


// La fonction pour générer le mot aléatoire
const generMotAleatoire = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};