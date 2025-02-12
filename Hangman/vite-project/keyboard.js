import { createElement } from './utils/createElement'

export class VirtualKeyboard {
  constructor(gamearea, game, gallow) {
    this.gameArea = gamearea
    this.game = game
    this.gallow = gallow

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
    this.buttons = new Map()
    this.processingKeypress = false

    window.addEventListener('keydown', (event) => {
      if (
        this.game.modal.isShown ||
        !event.code.startsWith('Key') ||
        this.processingKeypress
      )
        return

      const key = event.code.slice(-1)
      const button = this.buttons.get(key)

      if (button?.classList.contains('disabled')) return

      button?.classList.add('disabled')
      this.handleKeyPress(key)
    })
  }

  renderKeyboard(keyboard) {
    for (const key of this.keys) {
      const button = createElement('div', 'keyboard-button', key)

      this.buttons.set(key, button)
      keyboard.append(button)

      button.addEventListener('click', () => {
        if (!button.classList.contains('disabled')) {
          if (this.processingKeypress) return

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
