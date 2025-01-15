import { createElement } from './utils/createElement'

export class VirtualKeyboard {
  constructor(gamearea, game, gallow) {
    this.gameArea = gamearea
    this.game = game
    this.gallow = gallow

    this.keys = [
      'Й',
      'Ц',
      'У',
      'К',
      'Е',
      'Н',
      'Г',
      'Ш',
      'Щ',
      'З',
      'Х',
      'Ф',
      'Ы',
      'В',
      'А',
      'П',
      'Р',
      'О',
      'Л',
      'Д',
      'Ж',
      'Э',
      'Я',
      'Ч',
      'С',
      'М',
      'И',
      'Т',
      'Ь',
      'Б',
      'Ю',
      'Ъ',
    ]

    this.buttons = new Map()
    this.processingKeypress = false

    window.addEventListener('keydown', (event) => {
      if (
        this.game.modal.isShown ||
        !this.keys.includes(event.key.toUpperCase()) ||
        this.processingKeypress
      )
        return

      const key = event.key.toUpperCase()
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
