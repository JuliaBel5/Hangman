import './style.scss'
import { Game } from './game'
import { VirtualKeyboard } from './keyboard'
import { createElement } from './utils/createElement'

export const gameArea = createElement('div', 'gameArea')
document.body.append(gameArea)
const title = createElement('div', 'title')
title.innerHTML = '<img class="title-img" src="title.png"/>'
const leftPane = createElement('div', 'leftPane')
const rightPane = createElement('div', 'rightPane')
gameArea.append(title, leftPane, rightPane)
const warning =
  'Please, make sure you are using a classical QWERTY keyboard or use the virtual keyboard below:'
const subinfo = createElement('div', 'subinfo', warning)
const rules =
  'Your task is to guess the word below. You have 6 attempts. Good luck!'
const info = createElement('div', 'info', rules)
const mute = createElement('button', 'mute', 'Mute')

export const gallow = createElement('img', 'gallow')
gallow.src = 'gallow0.png'
leftPane.append(gallow)
const keyboard = createElement('div', 'keyboard')
keyboard.id = 'keyboard'
const guess = createElement('div', 'guess')
rightPane.append(info, subinfo, guess, keyboard)

const game = new Game(gameArea, guess, gallow)
game.init()

leftPane.append(mute)
const kboard = new VirtualKeyboard(gameArea, game, gallow)
kboard.renderKeyboard(keyboard)

mute.addEventListener('click', () => {
  const muted = new Audio('mute.wav')
  muted.volume = 0.2
  game.toggleMute()
  muted.play()
  mute.textContent = game.isMuted ? 'Unmute' : 'Mute'
})
