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

let mot = '';

const init = () =>{
    console.log('>> Tout va bien continuer votre projet');

    // Selection des éléments
    elements.scrore     = document.querySelector('#scrore');
    elements.reponse    = document.querySelector('#reponse');
    elements.choix      = document.querySelector('#choix');

    // Choisir le mot
    mot = choixDuMot();
    console.log('mot à deviner', mot);

};

// la fonction choixDuMot
const choixDuMot = () =>{
    const generIndexDumot = generMotAleatoire(0, mot.length - 1);
    return motsADeviner[generIndexDumot];
};


window.addEventListener('load', () =>{
    init();
});


// La fonction pour générer le mot aléatoire
const generMotAleatoire = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random () * (max - min + 1)) + min;
}
