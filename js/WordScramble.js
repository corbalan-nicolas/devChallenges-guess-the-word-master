export class WordScramble {
  // Game configuration
  #maxTries
  #wordMaxLength
  #wordMinLength
  #words

  // Values used to compare
  #indexLastWord
  #indexCurrentWord
  #currentWord
  #triesLeft
  #userGuess

  constructor({maxTries = 5, wordMaxLength = 999, wordMinLength = 4}) {
    // Game configuration
    this.#maxTries = maxTries
    this.#wordMaxLength = wordMaxLength
    this.#wordMinLength = wordMinLength

    // Array with the words
    this.#words = ['flower', 'apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'guitar', 'house', 'ice', 'jungle', 'kangaroo', 'lion', 'mountain', 'night', 'ocean', 'piano', 'queen', 'rainbow', 'sun', 'tree', 'umbrella', 'vampire', 'water', 'xylophone', 'yellow', 'zebra', 'airplane', 'bird', 'cat', 'dragon', 'earth', 'fish', 'grape', 'honey', 'insect', 'jacket', 'kiwi', 'lemon', 'monkey', 'nut']

    // Values used to compare
    this.#indexLastWord = -1
    this.#indexCurrentWord = 0
    this.#userGuess = ['_', '_']
    this.currentWordMixed
    this.mistakes = [[], []]
  }

  selectNewRandomWord() {
    let newIndex

    do {
      newIndex = Math.floor(Math.random() * this.#words.length)
    }while (newIndex === this.#indexLastWord)
    
    this.#indexLastWord = newIndex
    return newIndex
  }

  /**
   * Mixes a string by picking random indices and putting the value on a new string
   * @param {String} unprocessedWord 
   * @returns 
   */
  mixWord(unprocessedWord = this.#currentWord) {
    const newWord = []
    const word = unprocessedWord.split('')
  
    do {
      const randomNumber = Math.floor(Math.random() * word.length)
      newWord.push(word[randomNumber])
      word.splice(randomNumber, 1)
    } while(word.length > 0)
  
    if(newWord.join('') === unprocessedWord) this.mixWord()
  
    return newWord.join('')
  }

  startNewGame() {
    this.#indexCurrentWord = this.selectNewRandomWord()
    this.#currentWord = this.#words[this.#indexCurrentWord]
    this.currentWordMixed = this.mixWord(this.#words[this.#indexCurrentWord])
    this.#triesLeft = this.#maxTries

    try {
      this.#userGuess = ('_'.repeat(this.#currentWord.length)).split('')
    }catch(e) {
      console.log(`index[${this.#indexCurrentWord}] -> No se pudo hacer el split para "${this.#currentWord}" (${this.#currentWord.length})`)
      this.startNewGame()
    }

    this.drawNewGameOnTheDom()
  }
  
  resetGame() {
    // console.log('Hi')
    this.#triesLeft = this.#maxTries
    this.#userGuess = '_'.repeat(this.#currentWord.length).split('')
    
    this.drawNewGameOnTheDom()
  }

  isValidLetter(position, letter) {
    return this.#currentWord[position] === letter.toLowerCase()
  }

  drawNewGameOnTheDom() {
    const textBox = document.getElementById('textBox')
    const tries = document.getElementById('tries')
    const mistakesContainer = document.getElementById('mistakes')
    const inputsContainer = document.getElementById('inputsContainer')
  
    textBox.innerText = this.currentWordMixed.split('').join(' ')
    tries.innerText = `Tries (${this.#triesLeft}/${this.#maxTries}): `
    mistakesContainer.innerText = ''
    inputsContainer.innerText = ''
  
    for(let i = 0; i < this.currentWordMixed.length; i++) {
      const mistakesSpan = document.createElement('span')
      mistakesSpan.innerHTML = '<span><span class="correct-one">_</span><span class="errores"></span></span>'

      mistakesContainer.append(mistakesSpan)

      const input = document.createElement('input')
      const inputClass = 'input-box text-md'
      input.className = inputClass
      input.setAttribute('type', 'text')
      input.setAttribute('maxlength', '1')
      input.setAttribute('readonly', true)
  
      inputsContainer.append(input)
  
      input.addEventListener('focus', () => {
        mistakesSpan.querySelector('span.correct-one').classList.add('moradito')
      })

      input.addEventListener('blur', () => {
        mistakesSpan.querySelector('span.correct-one').classList.remove('moradito')
      })

      input.addEventListener('keydown', (e) => {
        const next = input.nextElementSibling
        const prev = input.previousElementSibling

        // The user typed a Key (e.g. 'A', 'b', 'k', 'L', ...)
        if(e.code.startsWith('Key')) {
          input.value = e.key.toLowerCase()
          this.#userGuess[i] = e.key
          
          if(this.isValidLetter(i, e.key)) {
            // Well done
            input.className = inputClass + ' correct '

            mistakesSpan.querySelector('span.correct-one').innerText = e.key.toLowerCase()

            if(this.#currentWord === this.#userGuess.join('')) {
              alert('Congratulations, you won!')
            }
          }else {
            // BADDDD YOU'RE TERRIBLE HAHAHAHAH LMAO
            input.className = inputClass + ' wrong '
            this.#triesLeft -= 1
            tries.innerText = `Tries (${this.#triesLeft}/${this.#maxTries}): `

            if(!mistakesSpan.querySelector('span.errores').innerText.includes(e.key)) {
              mistakesSpan.querySelector('span.errores').innerText += e.key.toLowerCase()
            }

            if(this.#triesLeft <= 0) {
              alert('Perdiste :)')
            }
          }

          if(next !== null) next.focus()
        }
        
        // The user wants to delete a word
        if(e.code === 'Backspace') {
          input.value = ''
          this.#userGuess[i] = '_'

          input.className = inputClass

          if(prev !== null) prev.focus()
        }

        // Shortcuts to move through the inputs
        if(e.code === 'ArrowLeft' && prev !== null) {
          prev.focus()
        }else if((e.code === 'ArrowRight' || e.code === 'Space') && next !== null) {
          next.focus()
        }
      })

      // Selects the first input child and do focus()
      inputsContainer.querySelector('input').focus()
    }
  }
}