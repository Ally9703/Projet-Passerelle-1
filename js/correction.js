// SECTION DES ELEMENTS

let img = document.querySelectorAll('img');
let comptage = document.querySelector('.decompteur');
let afficherMotAleatoire = document.querySelector('.motAleatoire');
let result = document.querySelector('.span');
let buttons = document.querySelectorAll('.button');
let vaincre = document.querySelector('.gagner');
let perdue = document.querySelector('.perdre');
let cacherLeMot = document.querySelectorAll('.motcacher');
let decompteurVies = 11;
comptage.textContent = decompteurVies;
let index = -1; 


// GENER DES MOTS ALEATOIRE

const mots = [  
  'garage',
  'taxi',
  'ambulance',
  'president',
  'humour',
  'idiot',
  'maths',
  'police',
  'simple',
  'sport',
  'imagination',
  'violet',
  'rose',
  'legal'
];

const motALeatoire = Math.floor(Math.random() * mots.length);
const motALaSortie = mots[motALeatoire]
var taperMot = [...motALaSortie];

// TRANSFORMATION DU MOT GENERER EN MAJUSCULE 
cacherLeMot.forEach(mot => {
  mot.textContent = motALaSortie.toUpperCase();
});


// LES DEUX FONCTIONS GAGNER ER PERDRE 

function perdreLaPartie() {
  perdue.style.transform = 'translateY(0%)';
}

function gagnerLaPartie() {
  vaincre.style.transform = 'translateY(0%)';
}

function tableauVaut(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


// Generer un tiret pour chaque lettres:

var tableauElements = [];

for (let i = 0; i < taperMot.length; i++) {
  const nouvelleElement = document.createElement("span");
  nouvelleElement.innerText = " _ ";
  afficherMotAleatoire.append(nouvelleElement); 
  nouvelleElement.classList.add("span");
  tableauElements.push(nouvelleElement);
}


// VERIFICATION DES LETTRES

buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttonClicked = btn.getAttribute('value'); 
            btn.disabled = true;

            if (taperMot.indexOf(buttonClicked) > -1) {
                btn.style.backgroundColor = '#75D701';
                
                for (let i = 0; i < taperMot.length; i++) {
                  if (buttonClicked === taperMot[i]) {
                    tableauElements[i].textContent = buttonClicked.toUpperCase() + ' ';
                    tableauElements[i] = buttonClicked;
                  
                  } 
                } 
              } else {
                btn.style.backgroundColor = '#f9320c';
                decompteurVies--;
                index++;
                img[index].style.display = 'block';
              }
              comptage.textContent = decompteurVies; 

              if (decompteurVies <= 0) {
              perdreLaPartie();
              }

              if (tableauVaut(tableauElements, taperMot) == true) {
              gagnerLaPartie()
              }
             
             }); 
         });
      
