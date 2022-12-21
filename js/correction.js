// Salut le correcteur j'ai essayé d'ecrire un code simple a comprendrendre alors j'espers que se ne sera pas trop brouilons pour vous
// Appeler TT les elements du DOM que j'aurais besoins:

let img = document.querySelectorAll('img');
let lifeLeft = document.querySelector('.life');
let fullWordResult = document.querySelector('.result');
let result = document.querySelector('.span');
let buttons = document.querySelectorAll('.button');
let go = document.querySelector('.go')
let form = document.querySelector('.form');
let input = document.querySelector('.input');
let win = document.querySelector('.won');
let lose = document.querySelector('.lost');
let hiddenWord = document.querySelectorAll('.hiddenWord');
var life = 11;
lifeLeft.textContent = life;
var index = -1; 


// Generer un mot aleatoire:

const words = [  'angle', 'armoire', 'banc', 'bureau', 'cabinet', 'carreau', 'chaise', 'classe', 'coin', 'couloir', 'dossier', 'eau', 'escalier', 'lavabo', 'lecture', 'lit', 'marche', 'matelas', 'maternelle', 'meuble', 'mousse', 'mur', 'peluche', 'placard', 'plafond', 'porte', 'portemanteau', 'poubelle', 'radiateur', 'rampe','rideau', 'robinet', 'salle', 'savon', 'serrure', 'serviette', 'sieste', 'silence', 'sol', 'sommeil', 'sonnette', 'sortie', 'table', 'tableau', 'tabouret', 'tapis', 'tiroir', 'toilette', 'vitre'];

var randomWord = Math.floor(Math.random() * words.length);
var wordOut = words[randomWord]
var wordTab = [...wordOut];

hiddenWord.forEach(word => {
  word.textContent = wordOut.toUpperCase();
});


// Fonction si le joueur gagne ou perd + la fonction pour check si le joueur a trouvé les bonnes lettres:

function lost() {
  lose.style.transform = 'translateY(0%)';
}

function won() {
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
              lost();
              }

              if (arrayEquals(tableItem, wordTab) == true) {
              won()
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
        won();
    }

    if (life <= 0) {
      lost();
      }
    lifeLeft.textContent = life; 
});        