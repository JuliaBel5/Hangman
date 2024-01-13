import { createElement } from './utils/createElement'

export class Modal {
  constructor(section, game) {
    this.overlay = null
    this.section = section
    this.game = game
    this.modal = null
  }

  create(title, message) {
    this.overlay = createElement('div', 'overlay')
    this.overlay.addEventListener('click', () => {})
    this.section.append(this.overlay)
    this.modal = createElement('div', 'modal')
    this.modalContent = createElement('div', 'modal-content')
    this.title = createElement('div', 'title', title)
    this.message = createElement('div', 'message', message)
    this.modalButton = createElement('button', 'modal-button', 'Play again')
    this.modalButton.addEventListener('click', () => {
      this.game.resetGame()
    })

    this.modal.append(this.modalContent)
    this.modalContent.append(this.title, this.message, this.modalButton)
    this.section.append(this.modal)
  }

  showModal(title, message) {
    this.create(title, message)
  }

  remove() {
    if (this.modal) {
      this.modal.remove()
      this.overlay.remove()

      //this.game.resetGame.bind(this.game)
    }
  }
}
