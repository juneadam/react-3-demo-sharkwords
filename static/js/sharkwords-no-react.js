const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let correctGuesses = 0;
// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('.letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  for (const div of letterDivs) {
    div.innerHTML = letter;
    correctGuesses += 1;
  }
  if (correctGuesses === word.length) {
    document.querySelector('#win').style.display = 'block';
  }
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

  document
    .querySelector('#shark-img img')
    .setAttribute('src', `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
      button.disabled = true;
    }

    document.querySelector('#play-again').style.display = 'block';
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/more/sharkwords-no-react';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // Math.random() gives us a random number between 0 and 1
  // we multiply it by the length of the list to get a random
  // index in the list and then round down since it may be a decimal
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  createDivsForChars(word);
  generateLetterButtons();

  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.addEventListener('click', (event) => {
      const clickedBtn = event.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.textContent;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter, word);
      } else {
        handleWrongGuess(letter);
      }
    });
  }

  document.querySelector('#play-again').addEventListener('click', resetGame);
  document.querySelector('#win').addEventListener('click', resetGame);
})();
