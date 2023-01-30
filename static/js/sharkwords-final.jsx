const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const Word = (props) => {
  const charDivs = [];
  for (const [i, letter] of Object.entries(props.word)) {
    let letterOrBlank = null; ///null represents a blank
    if (props.guessedLetters.includes(letter)) { //if the letter is in the list of guessed letters
      displayLetter = letter; // fill in the blank with that letter
    }

    charDivs.push(
      <div key={i} className="letter-box"> 
        {letterOrBlank} 
      </div>,
    );
  }

  return <section className="word-container">{charDivs}</section>;
};

const Letters = (props) => {     // React object for entire keyboard of letters, receives props from instantiation/parent
  const letterBtns = [];
  for (const letter of ALPHABET) {    // for loop over ALPHABET
    letterBtns.push(      //pushing buttons into letterBtns to be added to the DOM, 1 for each letter in alphabet
      <button
        type="button"
        key={letter}
        disabled={props.disableAll || props.guessedLetters.includes(letter)}
        onClick={() => props.handleGuessLetter(letter)}  // onClick is in place of event handler, add function you want to occur (handleGuessLetter)
                      // props = {'guessedLetter': guessedLetters, 'handleGuessLetter': guessLetter func}
      >             
        {letter}    
      </button>,
    );
  }

  return <section className="letter-buttons">{letterBtns}</section>;
};

const Sharkwords = (props) => {
  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [numWrong, setNumWrong] = React.useState(0);
  const [numCorrect, setNumCorrect] = React.useState(0);

  const guessLetter = (guessedLetter) => {   // function (like method), updates everything when letter is guessed
    if (!props.word.includes(guessedLetter)) {   // if letter is NOT in props.word
      setNumWrong((currentNumWrong) => currentNumWrong + 1);  // update currentNumWrong with setNumWrong function (callback function is optional here)
    } else {
      for (const letter of props.word) {
        if (letter === guessedLetter) {
          setNumCorrect((currentNumCorrect) => currentNumCorrect + 1);
        }
      }
    }

    setGuessedLetters((prevLetters) => [...prevLetters, guessedLetter]);   /// ... operator creates a copy of list, adds new guess to new list
  };

  const hasWon = numCorrect === props.word.length;
  const hasLost = numWrong > 5;
  return (
    <div>
      {hasWon ? (
        <a id="win" href="/sharkwords-final">
          Congratulations! 🥳 You won! Click here to play again.
        </a>
      ) : null}
      <section id="shark-img">
        {hasLost ? (
          <a id="win" href="/sharkwords-final">
            Game over :( Click here to play again
          </a>
        ) : (
          <img src={`/static/images/guess${numWrong}.png`} alt={`${numWrong}-guesses-wrong`} />
        )}
      </section>
      <Word word={props.word} guessedLetters={guessedLetters} />
      <Letters
        guessedLetters={guessedLetters}
        handleGuessLetter={guessLetter}  // passing the function from the parent to the child AS A PROP
        disableAll={hasWon || hasLost}
      />
    </div>
  );
};
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

// Math.random() gives us a random number between 0 and 1
// we multiply it by the length of the list to get a random
// index in the list and then round down since it may be a decimal
const word = WORDS[Math.floor(Math.random() * WORDS.length)];

ReactDOM.render(<Sharkwords word={word} />, document.querySelector('#root'));
