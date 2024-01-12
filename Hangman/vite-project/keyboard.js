import { Modal } from './modal'
import { createElement } from './utils/createElement'

export class VirtualKeyboard {
  constructor(gamearea, game, gallow) {
    this.gameArea = gamearea
    this.game = game
    this.gallow = gallow
    this.modal = new Modal(this.gameArea, this.game)
    this.keys = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]

    window.addEventListener('keydown', (event) => {
      const key = event.code.slice(-1)
      this.handleKeyPress(key)
      const buttons = document.querySelectorAll('.keyboard-button')
      buttons.forEach((button) => {
        if (button.textContent === key) {
          button.classList.add('disabled')
        }
      })
    })
    this.counter = createElement(
      'div',
      'counter',
      `Errors count: ${this.game.errors}`,
    )
    this.gameArea.firstChild.append(this.counter)
  }

  renderKeyboard(keyboard) {
    for (const key of this.keys) {
      const button = createElement('div', 'keyboard-button', key)

      keyboard.append(button)

      button.addEventListener('click', () => {
        if (!button.classList.contains('disabled')) {
          button.classList.add('disabled')
          this.handleKeyPress(key)
        }
      })
    }
  }

  handleKeyPress(key) {
    const word = this.game.getCurrentWord()
    if (word.toUpperCase().includes(key)) {
      let ind = word.toUpperCase().indexOf(key)
      const letters = Array.from(
        this.game.section.querySelectorAll('.letter-to-guess'),
      )
      while (ind !== -1) {
        letters[ind].classList.add('active')
        ind = word.toUpperCase().indexOf(key, ind + 1)
      }
    } else {
      this.game.countErrors()
      const errors = this.game.getErrors()
      this.counter.textContent = `Errors count: ${errors}`
      console.log('errors count:', errors)
      if (errors >= 7) {
        this.gallow.src = `gallow7.png`
        this.modal.showModal(
          "Oops! You've lost",
          `The word to guess was: ${this.game.word.toUpperCase()}`,
        )
      } else {
        this.gallow.src = `gallow${errors}.png`
      }
    }
  }

  revealLetter(key) {
    key.classList.add('active')
  }

  disableKey(key) {
    key.classList.add('disabled')
  }
}
