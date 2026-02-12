# React Wordle Game

A Wordle clone built with React and Vite. Guess the 5-letter secret word in 5 attempts with color-coded feedback.

## Demo

Live: [https://helioxco.github.io/react-wordle-game/](https://helioxco.github.io/react-wordle-game/)

<!-- Add a screenshot: replace the path below with your actual screenshot -->
![React Wordle Game Screenshot](screenshot.png)

## How to Play

1. Type a 5-letter word and press Enter
2. Letters turn **green** if correct and in the right position
3. Letters turn **yellow** if correct but in the wrong position
4. Letters turn **red** if not in the word
5. You have 5 attempts to guess the word

## Features

- Real-time color-coded feedback for each guess
- Fetches a new secret word from an API on every game
- Clean, minimal UI
- Responsive design

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Tech Stack

- React 18
- Vite
- JavaScript (JSX)

## License

[MIT](LICENSE)
