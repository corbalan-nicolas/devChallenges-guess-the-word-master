// 'use strict'

import { WordScramble } from './WordScramble.js'

const btnRandom = document.querySelector('#random')
const btnReset = document.querySelector('#reset')
const wordScramble = new WordScramble({
  // Game config
  maxTries: 5
})

// TESTING
// for(let i = 0; i < 500; i++) {
//   wordScramble.startNewGame()
// }

wordScramble.startNewGame()
wordScramble.drawNewGameOnTheDom()

btnRandom.addEventListener('click', () => { wordScramble.startNewGame() })
btnReset.addEventListener('click', () => { wordScramble.resetGame() })

window.addEventListener('keydown', (e) => {
  if(e.code === 'Digit1') {
    wordScramble.startNewGame()
  }

  if(e.code === 'Digit2') {
    wordScramble.resetGame()
  }
})