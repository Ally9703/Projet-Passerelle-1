const elements = {
    score  : null,
    reponse: null,
    choix: null
};


let choix = [];
let mot = '';
let motMappage = [];
let choixMappage = [];
let compterScore = 0;
let scoreMax = 8;

const mots = [
    'TELEVISION',
    'GARAGE',
    'RESTAURANT',
    'SANDWICH',
    'BISCUIT',
    'ELEPHANT',
    'CROCODILE',
    'HAMSTER',
    'TRAMWAY',
    'TAXI',
    'AMBULANCE',
    'SCOOTER',
    'PRESIDENT',
    'ABSTENTION',
    'ABSTINENCE',
    'ACCESSIBLE',
    'HUMOUR',
    'IDIOT',
    'ESSENCE',
    'IMPORTANT',
    'INTERNET',
    'INTERNATIONAL',
    'MATHS',
    'POLICE',
    'SIMPLE',
    'SPORT',
    'IMAGINATION',
    'VIOLET',
    'ROSE',
    'LEGAL'
];


const init = () => {
    // console.log('>> #init');

    // Attach elements
    elements.score = document.querySelector('#score');
    elements.reponse = document.querySelector('#reponse');
    elements.choix = document.querySelector('#choix');

    // Choisir mot
    mot = choisirMot();
    // console.log('mot', mot);
    //  - créer mot mappage
    motMappage = obtenirMotMappage(mot);
    console.log('motMappage', motMappage);
    // Generer choix
    choix = genererChoix();
    // console.log(choix);
    //  - créer choix mappage
    choixMappage = genererChoixMappage(choix);
    // console.log(choixMappage);
    // Afficher mot
    afficherMot(motMappage);
    // Afficher choix
    afficherChoix(choixMappage);
    // Display score
    // afficherScore();
    // Listen events
    //    - mouse events
    elements.choix.addEventListener('click', ({ target }) => {
        // evt:MouseEvent evt.target => { target }
        if (target.matches('li')) {
            verifierLettre(target.innerHTML);
        } 
    });
    //    - keyboard events
    document.addEventListener('keydown', ({ keyCode }) => {
        // evt:KeyboardEvent evt.keyCode => { keyCode }
        // console.log('keyCode', keyCode);
        const lettre = String.fromCharCode(keyCode);
        // console.log('lettre', lettre);
        if (keyCode >= 65 && keyCode <= 90) {
            verifierLettre(lettre);
        }
    });

};

    // chequer lettre
    //  - si n'est unmot: ajouter score
    //  - if in mot: display lettre
    //  - finJeux
    //     - if score == max: loseGame
    //     - if lettre are visible: gagnerJeux
const verifierLettre = (lettre) => {
    console.log(lettre);
    let estLettreDansMot = false;
    let estToutLettreTouvrer = true;
    // console.log('isLetterWord before loop', estLettreDansMot);
    motMappage.forEach((lettreMappage) => {
        // console.log('lettreMappage.lettre', lettreMappage.lettre);
        if (lettreMappage.lettre === lettre) {
            lettreMappage.estVisible = true;
            estLettreDansMot = true;
        }
        if (!lettreMappage.estVisible) {
            estToutLettreTouvrer = false;
        }
    });
    choixMappage.forEach((lettreMappage) => {
        if (lettreMappage.lettre === lettre) {
            lettreMappage.estChoisi = true;
        }
    });
    afficherChoix(choixMappage);
    if (estLettreDansMot === true) {
        afficherMot(motMappage);
    } else {
        compterScore++;
        afficherScore();
    }

    if (compterScore === scoreMax) {
        finJeux();
    }
    if (estToutLettreTouvrer) {
        gagnerJeux();
    }
    // console.log('isLetterWord after loop', estLettreDansMot);
};

const finJeux = () => {
    motMappage.forEach(w => w.estVisible = true);
    afficherMot(motMappage);
    document.querySelector('#contenue').style.backgroundColor = 'red';

    elements.choix.innerHTML = `<h1>Tu as perdu !</h1>`;
};
const gagnerJeux = () => {
    document.querySelector('#contenue').style.backgroundColor = 'green';
    elements.choix.innerHTML = `<h1>Félicitation tu as gagné la parties!</h1>`;
}


window.addEventListener('load', () => {
    init();
});

const afficherChoix = (choixMappage) => {
    const choixHtml = choixMappage.map((lettreMappage) => {
        if (lettreMappage.estChoisi === false) {
            return `<li>${lettreMappage.lettre}</li>`;
        } else {
            return `<li class="disabled">${lettreMappage.lettre}</li>`;
        }
    });
    elements.choix.querySelector('ul').innerHTML = choixHtml.join('');
};

const afficherScore = () => {
    // elements.score.innerHTML = `${compterScore} / ${scoreMax}`;
    elements.score.innerHTML = `<img src="images/00${compterScore}.png" alt="hangman" />`;
};

const afficherMot = (motMappage) => {
    const motHtml = motMappage.map((lettreMappage) => {
        if (lettreMappage.estVisible === true) {
            return `<li>${lettreMappage.lettre}</li>`;
        } else {
            return `<li>_</li>`;
        }
    });

    elements.reponse.querySelector('ul').innerHTML = motHtml.join('');
};

const genererChoix = () => {
    const choix = [];
    for(let index = 65; index <= 90; index++) {
        choix.push(String.fromCharCode(index));
    }
    return choix;
};

const genererChoixMappage = (choix) => {
    const choixMappage = choix.map((lettre) => {
        return {
            lettre,
            estChoisi: false
        };
    });
    return choixMappage;
};

const obtenirMotMappage = (mot) => {
    const wordArr = mot.split('');
    // console.log('mot', mot);
    // console.log('wordArr', wordArr);
    const motMappage = wordArr.map((lettre, index) => {
        let estVisible = false;
        if (index === 0 || index == wordArr.length - 1) {
            estVisible = true;
        }

        return {
            lettre,
            estVisible
        };
    });
    return motMappage;
};

const choisirMot = () => {
    const indexAléatoire = obtenirMotAleatoir(0, mots.length - 1);

    return mots[indexAléatoire];
};


const obtenirMotAleatoir = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}