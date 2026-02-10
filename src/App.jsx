import { useState, useEffect } from "react";
import "./styles.css";

/*
  CTF Script (browser console):
  document.querySelectorAll('section[data-id^="92"]').forEach(section => {
    section.querySelectorAll('article[data-class$="45"]').forEach(article => {
      article.querySelectorAll('div[data-tag*="78"]').forEach(div => {
        div.querySelectorAll('b.ref').forEach(b => {
          window.__flag = (window.__flag || '') + b.getAttribute('value');
        });
      });
    });
  });
  console.log(window.__flag);
*/

const SECRET_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/776f75";
const WORD_LENGTH = 5;
const MAX_GUESSES = 5;

function getColor(char, index, secret) {
  if (secret[index] === char) return "green";
  if (secret.includes(char)) return "yellow";
  return "red";
}

export default function App() {
  const [secret, setSecret] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    fetch(SECRET_URL)
      .then((res) => res.text())
      .then((text) => setSecret(text.trim().toUpperCase()));
  }, []);

  if (!secret) return <div>Loading</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) return;
    const guess = currentGuess.toUpperCase();
    if (guess.length !== WORD_LENGTH) return;

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (guess === secret) {
      setWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }
  };

  const rows = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    const guess = guesses[i];
    const cells = [];
    for (let j = 0; j < WORD_LENGTH; j++) {
      const char = guess ? guess[j] : "";
      const bg = guess ? getColor(char, j, secret) : "#fff";
      cells.push(
        <div key={j} className="guess-letter" style={{ backgroundColor: bg }}>
          {char}
        </div>
      );
    }
    rows.push(
      <div key={i} style={{ display: "flex" }}>
        {cells}
      </div>
    );
  }

  return (
    <div>
      {rows}
      {gameOver ? (
        <div>{won ? "You've won!" : "You've lost!"}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            maxLength={WORD_LENGTH}
          />
        </form>
      )}
    </div>
  );
}
