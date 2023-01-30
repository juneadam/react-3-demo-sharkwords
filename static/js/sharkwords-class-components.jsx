'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const Word = (props) => {
  const charDivs = [];
  for (const [i, letter] of Object.entries(props.word)) {
    let displayLetter = null;
    if (props.guessedLetters.includes(letter)) {
      displayLetter = letter;
    }

    charDivs.push(
      <div key={i} className="letter-box">
        {displayLetter}
      </div>,
    );
  }

  return <section className="word-container">{charDivs}</section>;
};

const Letters = (props) => {
  const letterBtns = [];
  for (const letter of ALPHABET) {
    const handleClick = () => {
      props.handleGuessLetter(letter);
    };

    const shouldDisable = props.guessedLetters.includes(letter) || props.disableAll;

    letterBtns.push(
      <button type="button" key={letter} disabled={shouldDisable} onClick={handleClick}>
        {letter}
      </button>,
    );
  }

  return <section className="letter-buttons">{letterBtns}</section>;
};

class Sharkwords extends React.Component {
  constructor(props) {
    super(props);

    // this.props.word -> word user needs to guess

    this.state = {
      guessedLetters: [],
      numWrong: 0,
      isGameOver: false,
    };

    this.guessLetter = this.guessLetter.bind(this);
  }

  isGameWin() {
    const uniqueLetters = new Set(this.props.word);
    const guessedLetters = new Set(this.state.guessedLetters);

    let countMatches = 0;
    for (const letter of uniqueLetters) {
      if (guessedLetters.has(letter)) {
        countMatches += 1;
      }
    }

    return countMatches === uniqueLetters.size;
  }

  guessLetter(letter) {
    if (!this.props.word.includes(letter)) {
      this.setState((prevState) => {
        if (prevState.numWrong === 5) {
          return {
            isGameOver: true,
          };
        }

        return {
          numWrong: prevState.numWrong + 1,
        };
      });
    }

    this.setState((prevState) => ({
      guessedLetters: prevState.guessedLetters + [letter],
    }));
  }

  render() {
    let playAgain = null;

    if (this.state.isGameOver && !this.gameWin()) {
      playAgain = <div id="play-again">The shark got you! Click here to play again.</div>;
    }

    return (
      <div>
        <section id="shark-img">
          <img
            src={`/static/images/guess${this.state.numWrong}.png`}
            alt={`${this.state.numWrong}-guesses-wrong`}
          />
        </section>

        {playAgain}

        <Word word={this.props.word} guessedLetters={this.state.guessedLetters} />

        <Letters
          guessedLetters={this.state.guessedLetters}
          handleGuessLetter={this.guessLetter}
          disableAll={this.state.isGameOver}
        />
      </div>
    );
  }
}

ReactDOM.render(<Sharkwords word="hello" />, document.querySelector('#root'));
