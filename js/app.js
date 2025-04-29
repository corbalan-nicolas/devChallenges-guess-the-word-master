// UTILITIES
const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)



// VARIABLES
const words = ["apple", "banana", "grape", "orange", "peach", "kiwi", "melon", "plum", "cherry", "mango"];
const minWordLength = 3
const maxWordLength = 8
const maxTries = 5

let userGuess = []
let currentWord = ''
let scrambleWord = ''
let triesLeft = 0

const $triesLeft = $('#triesLeft')
const $scrambleWord = $('#scrambleWord')
const $inputsForm = $('#inputsForm')
const $btnRandom = $('#btnRandom')
const $btnReset = $('#btnReset')



// EVENTS
$btnRandom.addEventListener('click', startNewGame)
$btnReset.addEventListener('click', resetGame)



// METHODS
function startNewGame() {
  triesLeft = maxTries
  currentWord = selectNewWord()
  scrambleWord = mixWord(currentWord)
  userGuess = scrambleWord.split('').map(letter => '', [])

  $triesLeft.innerHTML = triesLeft
  $scrambleWord.innerHTML = scrambleWord
  $inputsForm.innerHTML = ''

  for(let i = 0; i < currentWord.length; i++) {
    const validValue = /[A-Za-z]/ // Regular expressions 💘
    const $inputContainer = document.createElement('label')
    const inputContainerClassName = 'grid place-content-center size-12 rounded-lg border-3'
    $inputContainer.className = inputContainerClassName + ' border-[#4a5567]'
    const $input = document.createElement('input')
    $input.className = 'size-4 text-center uppercase focus:outline-none focus:border-b-2'
    $inputContainer.append($input)

    $input.addEventListener('input', (event) => {
      $inputContainer.className = inputContainerClassName + ' border-[#4a5567]'

      if($input.value.length > 1) $input.value = $input.value[1] // If it has a character, replace it
      if(!validValue.exec($input.value)) return // If it's not a valid input, don't continue
      if(!currentWord.includes($input.value)) return // If the word doesn't have the value, don't continue

      if(validateInput($input.value, i)) {
        $inputContainer.className = inputContainerClassName + ' border-[green]'
        userGuess[i] = $input.value
        $input.disabled = true
        $input.parentNode.nextElementSibling?.firstChild.focus()

        if(!userGuess.includes('')) userWon()
      }else {
        $inputContainer.className = inputContainerClassName + ' border-[red]'
        triesLeft--
        $triesLeft.innerHTML = triesLeft

        if(!triesLeft) userLose()
      }
    })

    $inputsForm.append($inputContainer)
  }

  $inputsForm.querySelector('input').focus() // First input -> focus()
}

function resetGame() {
  triesLeft = maxTries
  userGuess = scrambleWord.split('').map(letter => '', [])

  $triesLeft.innerHTML = triesLeft
  $$('#inputsForm input').forEach($input => {
    $input.value = ''
    $input.disabled = false
  })

  $inputsForm.querySelector('input').focus()
}

function selectNewWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

function mixWord(word) {
  const result = []
  word = word.split('')

  while(word.length > 0) {
    const randomIndex =  Math.floor(Math.random() * word.length)
    result.push(word[randomIndex])
    word.splice(randomIndex, 1)
  }
  
  if(result.join('') === currentWord) mixWord(currentWord) // Avoid returning non-scrambled words
  return result.join('');
}

function validateInput(value, index) {
  return currentWord[index] === value
}

function userWon() {
  console.log('> userWon()')
}

function userLose() {
  console.log('> userLose()')

}



// INIT
startNewGame()