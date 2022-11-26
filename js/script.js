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

// Déclaration des variables 

let choix        = [];
let mot          = '';
let motMappage   = [];
let choixMappage = [];

// LES METHODES 
const initialisation = () =>{
    // console.log('Savoir en permennace dans la console que tout va bien');

    // Selection des éléments
    elements.scrore     = document.querySelector('#scrore');
    elements.reponse    = document.querySelector('#reponse');
    elements.choix      = document.querySelector('#choix');

    // Choisir le mot
    mot = choixDuMot();
    // console.log('mot à deviner', mot);

    // Générer le choix qui est avec les lettre de l'alphabet
    choix = generChoix();
    // console.log(choix);

    // créer un mappage de mot
    motMappage = obtenirMotMappage(mot);
    // console.log('motMappage', motMappage);

    // créer un mappage de choix
    choixMappage = obtenirChoixMappage(choix);
    // console.log(choixMappage);

    // Afficher les mots
    afficherMot(motMappage);
    // Afficher le choix
    afficherChoix(choixMappage);

};


// Affichage de mot et de choix
const afficherChoix = (choixMappage) => {
    const choixHtml = choixMappage.map((lettreMappage) => {
        if (lettreMappage.estChoisi === false) {
            return `<li>${lettreMappage.letter}</li>`;
        } else {
            return `<li class="desactiver">${lettreMappage.lettre}</li>`;
        };
    });
    
    elements.choix.querySelector('ul').innerHTML = choixHtml.join('');
};

const afficherMot   = (motMappage) => {
    
    const motHtml  =  motMappage.map((lettreMappage) =>{
        if(lettreMappage.estVisible === true){
            return ` <li>${lettreMappage.lettre}</li>`;
        }else{
            return `<li>_</li>`;
        }
      
    });
    // console.log('motHtml', motHtml);
    elements.reponse.querySelector('ul').innerHTML = motHtml;

    
};

// la méthode choixDuMot
const choixDuMot = () =>{
    const generIndexDuMot = generMotAleatoire(0, motsADeviner.length-1);
    return motsADeviner[generIndexDuMot];
};

const obtenirMotMappage = (mot) =>{
    const motArr = mot.split('');
    // console.log('mot', mot);
    // console.log('motArr', motArr);
    const motMappage = motArr.map((lettre) =>{
        return {
            lettre,
            estVisible:false
        };
    });
    return motMappage;
};

let generChoix = () =>{
    const choix = [];
    for(let index = 65; index <= 90; index ++){
        choix.push(String.fromCharCode(index));
    };
    return choix;
};

const obtenirChoixMappage = (choix) =>{
    choixMappage = choix.map((lettre) =>{
        return{
            lettre,
            estChoisi : false
        };
    });
    return choixMappage;
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