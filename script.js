let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      roundWinner = 'empate'
    } if (
      playerSelection === 'PEDRA' && computerSelection === 'TESOURA' ||
      playerSelection === 'TESOURA' && computerSelection === 'PAPEL' ||
      playerSelection === 'PAPEL' && computerSelection === 'PEDRA'
    ) {
      playerScore++
      roundWinner = 'player'
    } if (
      computerSelection === 'PEDRA' && playerSelection === 'TESOURA' ||
      computerSelection === 'TESOURA' && playerSelection === 'PAPEL' ||
      computerSelection === 'PAPEL' && playerSelection === 'PEDRA'
    ) {
      computerScore ++
      roundWinner = 'computer'
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
  }

function getComputerChoice() {
  let random = Math.floor(Math.random() *  3)
  switch (random) {
    case 0:
      return('PEDRA')
    case 1:
      return('PAPEL')
    case 2:
      return('TESOURA')
  }
}
  
function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

//consts

const scoreMessage = document.getElementById('scoreMessage');
const scoreExplain = document.getElementById('scoreExplain');
const computerScoreP = document.getElementById('computerScoreP');
const playerScoreP = document.getElementById('playerScoreP');
const playerSign = document.getElementById('playerSign');
const computerSign = document.getElementById('computerSign');
const pedraButton = document.getElementById('pedra');
const papelButton = document.getElementById('papel');
const tesouraButton = document.getElementById('tesoura');
const restartButton = document.getElementById('restartButton');
const endMessage = document.getElementById('endMessage');
const endPanel = document.getElementById('endPanel');
const overlay = document.getElementById('overlay');

pedraButton.addEventListener('click', () => handleClick('PEDRA'));
papelButton.addEventListener('click', () => handleClick('PAPEL'));
tesouraButton.addEventListener('click', () => handleClick('TESOURA'));
restartButton.addEventListener('click', restartGame);
overlay.addEventListener('click', closeEndPanel);

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndPanel()
    return
  }

  const computerSelection = getComputerChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndPanel()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'PEDRA':
      playerSign.textContent = '✊'
      break
    case 'PAPEL':
      playerSign.textContent = '✋'
      break
    case 'TESOURA':
      playerSign.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case 'PEDRA':
      computerSign.textContent = '✊'
      break
    case 'PAPEL':
      computerSign.textContent = '✋'
      break
    case 'TESOURA':
      computerSign.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'empate') {
    scoreMessage.textContent = "É um empate!"
  } else if (roundWinner === 'player') {
    scoreMessage.textContent = 'Você ganhou!'
  } else if (roundWinner === 'computer') {
    scoreMessage.textContent = 'Você perdeu!'
  }

  playerScoreP.textContent = `Player: ${playerScore}`
  computerScoreP.textContent = `Computador: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreExplain.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} derrota ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreExplain.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} é derrotado por ${computerSelection.toLowerCase()}`
    return
  }

  scoreExplain.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} empata com ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndPanel() {
  endPanel.classList.add('active')
  overlay.classList.add('active')
}

function closeEndPanel() {
  endPanel.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endMessage.textContent = 'Você ganhou!')
    : (endMessage.textContent = 'Você perdeu...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreMessage.textContent = 'Faça uma escolha:'
  scoreExplain.textContent = 'O primeiro a fazer 5 pontos vence'
  playerScoreP.textContent = 'Você: 0'
  computerScoreP.textContent = 'Computador: 0'
  playerSign.textContent = '👽'
  computerSign.textContent = '👽'
  endPanel.classList.remove('active')
  overlay.classList.remove('active')
}