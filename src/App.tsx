import { useEffect, useState } from 'react';
import { letters } from './helpers/letters';
import { HangImage } from './components/HangImage';
import './App.css'
import { getRandomWord } from './helpers/getRandomWord';

function App() {

  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0)
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  //Determine  if the person lost
  useEffect(() => { //Hooks
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts])

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if (currentHiddenWord === word) {
      setWon(true);
    }

  }, [hiddenWord])


  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    //console.log(hiddenWordArray);

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">

      {/*Images*/}
      <HangImage imageNumber={attempts} />

      {/*Hidden Word*/}
      <h3>{hiddenWord}</h3>

      {/*Attempt Counter*/}
      <h3>Attempts: {attempts}</h3>

      {/*Message if you lost*/}
      {
        (lose)
          ? <h2>You Lost, the word was: {word}</h2>
          : ''
      }

      {/*Message if you win*/}
      {
        (won)
          ? <h2>Congratulations, you won</h2>
          : ''
      }

      {/*Letter buttons*/}
      {
        letters.map((letter) => (
          <button
            onClick={() => checkLetter(letter)}
            key={letter}>
            {letter}
          </button>
        ))
      }

      <br /><br />
      <button onClick={newGame}>Play again</button>

    </div>
  )
}

export default App
