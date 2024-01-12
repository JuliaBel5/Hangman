import { Modal } from './modal'
import { createElement } from './utils/createElement'
import { questions } from './utils/questions'
import { wordsToGuess } from './utils/words'

export class Game {
  constructor(gamearea, section, gallow) {
    this.gamearea = gamearea
    this.section = section
    this.gallow = gallow
    this.attempts = 0
    this.errors = 0
    this.guesses = 0
    this.word = ''
    this.modal = new Modal(this.gamearea)
  }

  init = () => {
    this.getRandomWord()
    this.createGuessWord(this.word, this.section)
  }

  getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsToGuess.length)
    this.word = wordsToGuess[randomIndex]
    this.question = createElement('div', 'question', questions[randomIndex])
    this.section.parentNode.insertBefore(this.question, this.section)
    console.log(this.word)
    return this.word
  }

  createGuessWord = (word, section) => {
    word.split('').forEach((el) => {
      const letter = createElement('div', 'letter-to-guess', el.toUpperCase())

      section.append(letter)
    })
  }

  countErrors() {
    return (this.errors += 1)
  }

  getCurrentWord() {
    return this.word
  }

  getErrors() {
    return this.errors
  }

  resetAttempts() {
    this.attempts = 0
  }

  resetErrors() {
    this.errors = 0
  }

  resetWord() {
    this.word = ''
  }

  resetGuesses() {
    this.guesses = 0
  }

  resetGame() {
    const buttons = this.gamearea.querySelectorAll('.keyboard-button.disabled')
    buttons.forEach((button) => {
      button.classList.remove('disabled')
    })
    this.question.remove()
    while (this.section.firstChild) {
      this.section.firstChild.remove()
    }
    this.gallow.src = 'gallow0.png'
    this.resetAttempts()
    this.resetErrors()
    this.resetGuesses()
    this.resetWord()
    this.init()
  }
}
