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
    this.modal = new Modal(this.gamearea, this)
    this.modalIsOpen = false
    this.letters = []
    this.counter = createElement(
      'div',
      'counter',
      `Errors count: ${this.getErrors()}`,
    )
    this.gamearea.children[2].append(this.counter)
    this.unlock = new Audio('unlock.wav')
    this.unlock.volume = 0.2
    this.wrong = new Audio('wrong.wav')
    this.wrong.volume = 0.2
    this.win = new Audio('win.wav')
    this.win.volume = 0.2
    this.new = new Audio('new.wav')
    this.new.volume = 0.2
    this.loose = new Audio('loose.wav')
    this.loose.volume = 0.2

    this.isMuted = false
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
    word.split('').forEach((_el) => {
      const letter = createElement('div', 'letter-to-guess')
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
    if (this.errors === 0) {
      this.gallow.src = `gallow0.png`
    } else if (this.errors > 0 && this.errors < 6) {
      this.gallow.src = `gallow${this.errors}.png`
    } else if (this.errors === 6 && !this.modalIsOpen) {
      this.gallow.src = `gallow${this.errors}.png`
      this.modal.showModal(
        "Oops! You've lost",
        `The word to guess was: ${this.word.toUpperCase()}`,
      )
      this.loose.play()
      this.modalIsOpen = true
    } else if (this.errors > 6) {
      this.counter.textContent = `Errors count: 6`
      this.gallow.src = `gallow6.png`
    }
    return this.errors
  }

  checkKey(key) {
    if (this.word.toUpperCase().includes(key)) {
      let ind = this.word.toUpperCase().indexOf(key)
      while (ind !== -1) {
        this.letters[ind].classList.add('active')
        this.letters[ind].textContent = key
        this.letters[ind].style.border = 'none'
        ind = this.word.toUpperCase().indexOf(key, ind + 1)
      }
      this.unlock.play()
    } else {
      this.countErrors()
      const errors = this.getErrors()
      this.counter.textContent = `Errors count: ${errors}`
      this.wrong.play()
    }
  }

  getStatus() {
    if (this.letters.every((letter) => letter.classList.contains('active'))) {
      this.modal.showModal(
        'Wow! You won!!',
        `The word to guess was: ${this.word.toUpperCase()}`,
      )
      this.win.play()
    }
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
    this.modalIsOpen = false
    this.modal.remove()
    this.letters = []
    this.new.play()
    this.init()
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    this.unlock.muted = this.isMuted
    this.wrong.muted = this.isMuted
    this.win.muted = this.isMuted
    this.new.muted = this.isMuted
    this.loose.muted = this.isMuted
  }
}
