import { Modal } from './modal'
import { createElement } from './utils/createElement'
import { questions } from './utils/questions'
import { wordsToGuess } from './utils/words'

export class Game {
  constructor(gamearea, section, gallow) {
    this.gamearea = gamearea
    this.section = section
    this.gallow = gallow
    this.errors = 0
    this.word = ''
    this.lastWord = ''
    this.modal = new Modal(this.gamearea)
    this.letters = []
    this.counter = createElement(
      'div',
      'counter',
      `Errors count: ${this.getErrors()}`,
    )
    this.gamearea.firstChild.append(this.counter)
  }

  init = () => {
    this.getRandomWord()
    this.createGuessWord(this.word, this.section)
  }

  getRandomWord = () => {
    let newWord
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * wordsToGuess.length)
      newWord = wordsToGuess[randomIndex]
    } while (newWord === this.lastWord)

    this.word = newWord
    this.lastWord = this.word
    this.question = createElement('div', 'question', questions[randomIndex])
    this.section.parentNode.insertBefore(this.question, this.section)
    console.log(this.word)
    return this.word
  }

  createGuessWord = (word, section) => {
    word.split('').forEach((el) => {
      const letter = createElement('div', 'letter-to-guess', el.toUpperCase())
      this.letters.push(letter)
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

  resetErrors() {
    this.errors = 0
  }

  resetWord() {
    this.word = ''
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
    this.resetErrors()
    this.counter.textContent = `Errors count: ${this.errors}`
    this.resetWord()
    this.modal.remove()
    this.init()
  }
}
