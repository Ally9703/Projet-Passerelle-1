// SECTION DES ELEMENTS
let images = document.querySelectorAll('img');
let vie = document.querySelector('.laVie');
let scoreFinale = document.querySelector('.resultatFinal');
let result = document.querySelector('.span');
let buttons = document.querySelectorAll('.button');
let gagner = document.querySelector('.gagnerLaPartie');
let perd = document.querySelector('.perdue');
let hiddenWord = document.querySelectorAll('.hiddenWord');
let laVide = 11;
vie.textContent = laVide;
let index = -1; 


// LES MOTS ALEATOIRE A GENERER

const mots = [
    'TELEVISION', 'GARAGE', 'RESTAURANT', 'SANDWICH',
    'BISCUIT', 'ELEPHANT', 'CROCODILE', 'HAMSTER',
    'TRAMWAY', 'TAXI', 'AMBULANCE', 'SCOOTER', 'PRESIDENT',
    'ABSTENTION', 'ABSTINENCE', 'ACCESSIBLE', 'HUMOUR',
    'IDIOT', 'ESSENCE', 'IMPORTANT', 'INTERNET', 'INTERNATIONAL',
    'MATHS', 'POLICE', 'SIMPLE', 'SPORT', 'IMAGINATION',
    'VIOLET', 'ROSE', 'LEGAL'
];

var randomWord = Math.floor(Math.random() * mots.length);
var wordOut = mots[randomWord]
var wordTab = [...wordOut];

hiddenWord.forEach(word => {
  word.textContent = wordOut.toUpperCase();
});


// Fonction si le joueur gagne ou perd + la fonction pour check si le joueur a trouvé les bonnes lettres:

function perd() {
  lose.style.transform = 'translateY(0%)';
}

function gagner() {
  win.style.transform = 'translateY(0%)';
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


// Generer un tiret pour chaque lettres:

var tableItem = [];

for (let i = 0; i < wordTab.length; i++) {
  const newElem = document.createElement("span");
  newElem.innerText = "_ ";
  fullWordResult.append(newElem); 
  newElem.classList.add("span");
  tableItem.push(newElem);
}


// Verfication pour chaque lettres:

buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttonClicked = btn.getAttribute('value'); 
            btn.disabled = true;

            if (wordTab.indexOf(buttonClicked) > -1) {
                btn.style.backgroundColor = '#75D701';
                
                for (let i = 0; i < wordTab.length; i++) {
                  if (buttonClicked === wordTab[i]) {
                    tableItem[i].textContent = buttonClicked.toUpperCase() + ' ';
                    tableItem[i] = buttonClicked;
                  
                  } 
                } 
              } else {
                btn.style.backgroundColor = '#f9320c';
                life--;
                index++;
                img[index].style.display = 'block';
              }
              lifeLeft.textContent = life; 

              if (life <= 0) {
              perd();
              }

              if (arrayEquals(tableItem, wordTab) == true) {
              gagner()
              }
             
             }); 
         });
      

// Ferification de l'input

form.addEventListener('submit', (e) => {

    e.preventDefault();
    console.log(input.value);

    if (!isNaN(input.value) || input.value == '') {
        input.style.border = '2px solid #f9320c';
        input.value = '';
    }else if (input.value != wordOut){
        input.style.border = '2px solid #f9320c';
        input.value = '';
        life--;
        index++
        img[index].style.display = 'block';
    }
    else {
        fullWordResult.textContent = wordOut.toUpperCase() + ' ';
        input.style.border = '2px solid #75D701';
        input.disabled = true;
        go.disabled = true;
        gagner();
    }

    if (life <= 0) {
      perd();
      }
    lifeLeft.textContent = life; 
});        