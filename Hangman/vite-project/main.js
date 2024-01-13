import './style.scss'
import { Game } from './game'
import { VirtualKeyboard } from './keyboard'
import { createElement } from './utils/createElement'

export const gameArea = createElement('div', 'gameArea')
document.body.append(gameArea)
const leftPane = createElement('div', 'leftPane')
const rightPane = createElement('div', 'rightPane')
gameArea.append(leftPane, rightPane)
const title = createElement('div', 'title', 'Hangman')
const rules = 'Your task is to guess the word below:'
const info = createElement('div', 'info', rules)
const restartButton = createElement('button', 'restart', 'Restart game')

export const gallow = createElement('img', 'gallow')
gallow.src = 'gallow0.png'
leftPane.append(gallow)
const keyboard = createElement('div', 'keyboard')
keyboard.id = 'keyboard'
const guess = createElement('div', 'guess')
rightPane.append(info, guess, keyboard)

const game = new Game(gameArea, guess, gallow)
game.init()

leftPane.append(restartButton)
const kboard = new VirtualKeyboard(gameArea, game, gallow)
kboard.renderKeyboard(keyboard)

restartButton.addEventListener('click', game.resetGame.bind(game))
