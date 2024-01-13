import { createElement } from './utils/createElement'

export class VirtualKeyboard {
  constructor(gamearea, game, gallow) {
    this.gameArea = gamearea
    this.game = game
    this.gallow = gallow
    this.modal = null
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
    this.buttons = []
    this.processingKeypress = false

    console.log(this.processingKeypress)
    window.addEventListener('keydown', (event) => {
      const key = event.code.slice(-1)
      const notAletter = key.charCodeAt(0)
      if (this.processingKeypress) {
        return
      }
      if (
        (notAletter >= 65 && notAletter <= 90) ||
        (notAletter >= 97 && notAletter <= 122)
      ) {
        this.handleKeyPress(key)
        this.buttons.forEach((button) => {
          if (button.textContent === key) {
            button.classList.add('disabled')
          }
        })
      }
    })
  }

  renderKeyboard(keyboard) {
    for (const key of this.keys) {
      const button = createElement('div', 'keyboard-button', key)
      this.buttons.push(button)
      keyboard.append(button)

      button.addEventListener('click', () => {
        if (!button.classList.contains('disabled')) {
          if (this.processingKeypress) {
            return
          }
          button.classList.add('disabled')
          this.handleKeyPress(key)
        }
      })
    }
  }

  handleKeyPress(key) {
    this.processingKeypress = true
    this.game.checkKey(key)
    this.game.getStatus()
    this.game.getErrors()
    this.processingKeypress = false
  }
}
