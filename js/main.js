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

// Some shortcuts
window.addEventListener('keydown', (e) => {
  if(e.code === 'Digit1') {
    wordScramble.startNewGame()
  }
  
  if(e.code === 'Digit2') {
    wordScramble.resetGame()
  }
  
  if(e.code === 'Home') {
    document.querySelector('#inputsContainer input:first-child').focus()
  }
  
  if(e.code === 'End') {
    document.querySelector('#inputsContainer input:last-child').focus()
  }

  // console.log(e.code)
})