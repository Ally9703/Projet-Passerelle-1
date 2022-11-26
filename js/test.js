const els = {
    score :null,
    answer:null,
    choices:null,
};

let choises = [];
let word = '';
let wordMapping = [];
let choicesMapping =[];
let scoreCount = 0;
let maxScore = 8;

const words = [
    'JAVASCRIPT',
    'STYLESHEET',
    'LANGUAGE'
];

const init = () =>{

    // Attach elements
    els.score = document.querySelector('#score');
    els.answer =  document.querySelector('#answer');
    els.choices = document.querySelector('#choices');   
    // console.log('Initialisation');

    // Pick word
    word = pickword();
    
    //      -Create word mapping
    wordMapping = getWordMapping(word);
    // console.log('wordMapping', wordMapping);
    // Generate choises
    choices = generateChoices();

    //      - create choises mapping
    choicesMapping = getChoicesMapping(choices);
    // console.log(choisesMapping);

    // Display word
    displayWord(wordMapping);
    // Display choises
    displayChoices(choicesMapping);
    // Display scrore
    displayScore();
    // Listen Events
    //      - mouse envents
    els.choices.addEventListener('click', ({target}) =>{
        // envent: MouseEvent.target
        if(target.matches('li')){
            checkLetter(target.innerHTML);
        }
    });

    //      - keyborad events
    document.addEventListener('keydown', ({keyCode}) =>{
        // console.log("key", keyCode);
        const letter = String.fromCharCode(keyCode);
        // console.log('letter', letter);
        if(keyCode >= 65 && keyCode <=90){
            checkLetter(letter);
        }
    });

};


    // Check letter
     //     - if not in word: add score
    //      - if is word : display letter
    //      - end Game
    //         -if score == max: lose Game
    //         - if letter are visible : winGame 


const checkLetter = (letter) =>{
    console.log(letter);
    let isLetterInWord = false;
    wordMapping.forEach((letterMapping) =>{
        if(letterMapping.letter === letter){
            letterMapping.isVisible === true;
        }
    });
};

const displayChoices = (choicesMapping) => {
    const choicesHtml = choicesMapping.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class=" ">${letterMapping.letter}</li>`;
        };
    });
    
    els.choices.querySelector('ul').innerHTML = choicesHtml.join('');
};

const displayScore = () => {

    els.score.innerHTML = `<img src="img/00${scoreCount}.png" alt="hangman" />`;
};

const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li>_</li>`;
        }
    });

    els.answer.querySelector('ul').innerHTML = wordHtml.join('');
};


const generateChoices = () =>{
    const choices = [];
    for(let index = 65; index <= 90; index ++){
        choices.push(String.fromCharCode(index));
    }
    return choices;
};

const getChoicesMapping = (choices) =>{
    const choicesMapping = choices.map((letter) =>{
        return {
            letter,
            isChosen : false,
        };
    });
    return choicesMapping;
};

// const getWordMapping = (word) =>{
//     const wordArr = word.split('');
//     // console.log('word', word);
//     // console.log('wordArr', wordArr);
//     const wordMapping = wordArr.map((letter) =>{
//         return {
//             letter,
//             isVisible:false,
//         };
//     });
//     return wordMapping;
// };

const getWordMapping = (word) => {
    const wordArr = word.split('');
    // console.log('word', word);
    // console.log('wordArr', wordArr);
    const wordMapping = wordArr.map((letter, index) => {
        let isVisible = false;
        if (index === 0 || index == wordArr.length - 1) {
            isVisible = true;
        }

        return {
            letter,
            isVisible
        };
    });
    return wordMapping;
};

const pickword = () =>{
    const randomIndex = getRandomInit(0, words.length - 1); 
    return words[randomIndex];
};

window.addEventListener('load', () =>{
    init();
});

// Same as #1 
// windows.onload = init
// Same as #2
// Windows.addEvenLister('load', init);
// Same as #3


const getRandomInit = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};