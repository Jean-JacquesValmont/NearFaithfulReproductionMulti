const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const copyButton = document.getElementById('copyID')
const errorCopyID = document.getElementById('errorCopyID')
const leaveRoom = document.getElementById("leaveRoom")
const namePlayer = document.getElementById('namePlayer')
const player = document.getElementById("player")

const numberOfPlayer = document.getElementById("numberOfPlayer")
const numberOfPlayerText = document.getElementById("numberOfPlayerText")
const timerSelect = document.getElementById("timerSelect")
const timerText = document.getElementById("timerText")
const roundSelect = document.getElementById("roundSelect")
const roundText = document.getElementById("roundText")
const precisionSelect = document.getElementById("precisionSelect")
const precisionText = document.getElementById("precisionText")
const toleranceSelect = document.getElementById("toleranceSelect")
const toleranceText = document.getElementById("toleranceText")
const victoryConditionSelect = document.getElementById("victoryConditionSelect")
const victoryConditionText = document.getElementById("victoryConditionText")
const widthSelect = document.getElementById("widthSelect")
const widthText = document.getElementById("widthText")
const heightSelect = document.getElementById("heightSelect")
const heightText = document.getElementById("heightText")
const categorySelect = document.getElementById("categorySelect")
const categoryText = document.getElementById("categoryText")

const optionNumberofRoundOne = document.getElementById("optionNumberofRoundOne")

const fetchImageButton = document.getElementById("fetchImageButton")
const startGame = document.getElementById("startGame")

const timer = document.getElementById("timer")
const roundGame = document.getElementById("roundGame")
const namePlayer1 = document.getElementById("namePlayer1")
const namePlayer2 = document.getElementById("namePlayer2")
const namePlayer3 = document.getElementById("namePlayer3")
const namePlayer4 = document.getElementById("namePlayer4")
const namePlayer5 = document.getElementById("namePlayer5")
const namePlayer6 = document.getElementById("namePlayer6")
const namePlayer7 = document.getElementById("namePlayer7")
const namePlayer8 = document.getElementById("namePlayer8")
const numberOfRoundWinPlayer1 = document.getElementById("numberOfRoundWinPlayer1")
const numberOfRoundWinPlayer2 = document.getElementById("numberOfRoundWinPlayer2")
const numberOfRoundWinPlayer3 = document.getElementById("numberOfRoundWinPlayer3")
const numberOfRoundWinPlayer4 = document.getElementById("numberOfRoundWinPlayer4")
const numberOfRoundWinPlayer5 = document.getElementById("numberOfRoundWinPlayer5")
const numberOfRoundWinPlayer6 = document.getElementById("numberOfRoundWinPlayer6")
const numberOfRoundWinPlayer7 = document.getElementById("numberOfRoundWinPlayer7")
const numberOfRoundWinPlayer8 = document.getElementById("numberOfRoundWinPlayer8")
const percentAveragePlayer1 = document.getElementById("percentAveragePlayer1")
const percentAveragePlayer2 = document.getElementById("percentAveragePlayer2")
const percentAveragePlayer3 = document.getElementById("percentAveragePlayer3")
const percentAveragePlayer4 = document.getElementById("percentAveragePlayer4")
const percentAveragePlayer5 = document.getElementById("percentAveragePlayer5")
const percentAveragePlayer6 = document.getElementById("percentAveragePlayer6")
const percentAveragePlayer7 = document.getElementById("percentAveragePlayer7")
const percentAveragePlayer8 = document.getElementById("percentAveragePlayer8")

const samePixelTextPlayer1 = document.getElementById("samePixelTextPlayer1")
const samePixelTextPlayer2 = document.getElementById("samePixelTextPlayer2")
const samePixelTextPlayer3 = document.getElementById("samePixelTextPlayer3")
const samePixelTextPlayer4 = document.getElementById("samePixelTextPlayer4")
const samePixelTextPlayer5 = document.getElementById("samePixelTextPlayer5")
const samePixelTextPlayer6 = document.getElementById("samePixelTextPlayer6")
const samePixelTextPlayer7 = document.getElementById("samePixelTextPlayer7")
const samePixelTextPlayer8 = document.getElementById("samePixelTextPlayer8")
const progressBarPlayer1 = document.getElementById("progressBarPlayer1")
const progressBarPlayer2 = document.getElementById("progressBarPlayer2")
const progressBarPlayer3 = document.getElementById("progressBarPlayer3")
const progressBarPlayer4 = document.getElementById("progressBarPlayer4")
const progressBarPlayer5 = document.getElementById("progressBarPlayer5")
const progressBarPlayer6 = document.getElementById("progressBarPlayer6")
const progressBarPlayer7 = document.getElementById("progressBarPlayer7")
const progressBarPlayer8 = document.getElementById("progressBarPlayer8")
const winnerText = document.getElementById("winnerText")
const fetchImageButtonRound = document.getElementById("fetchImageButtonRound")
const nextRound = document.getElementById("nextRound")
const returnMenu = document.getElementById('returnMenu')

const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const numberOfPlayerClass = document.querySelector('.numberOfPlayerClass');
const numberOfPlayerTextClass = document.querySelector('.numberOfPlayerTextClass');
const timerSelectClass = document.querySelector('.timerSelectClass');
const timerTextClass = document.querySelector('.timerTextClass');
const roundSelectClass = document.querySelector('.roundSelectClass');
const roundTextClass = document.querySelector('.roundTextClass');
const precisionSelectClass = document.querySelector('.precisionSelectClass');
const precisionTextClass = document.querySelector('.precisionTextClass');
const toleranceSelectClass = document.querySelector('.toleranceSelectClass');
const toleranceTextClass = document.querySelector('.toleranceTextClass');
const victoryConditionSelectClass = document.querySelector('.victoryConditionSelectClass');
const victoryConditionTextClass = document.querySelector('.victoryConditionTextClass');
const widthSelectClass = document.querySelector('.widthSelectClass');
const widthTextClass = document.querySelector('.widthTextClass');
const heightSelectClass = document.querySelector(".heightSelectClass");
const heightTextClass = document.querySelector(".heightTextClass");
const categorySelectClass = document.querySelector(".categorySelectClass");
const categoryTextClass = document.querySelector(".categoryTextClass");
const fetchImageButtonClass = document.querySelector(".fetchImageButtonClass")
const nextRoundClass = document.querySelector(".nextRoundClass")
const buttonStartGame = document.querySelector('.buttonStartGame');

const game = document.querySelector('.game');
const resultPlayer1Class = document.querySelector(".resultPlayer1Class")
const resultPlayer2Class = document.querySelector(".resultPlayer2Class")
const resultPlayer3Class = document.querySelector(".resultPlayer3Class")
const resultPlayer4Class = document.querySelector(".resultPlayer4Class")
const resultPlayer5Class = document.querySelector(".resultPlayer5Class")
const resultPlayer6Class = document.querySelector(".resultPlayer6Class")
const resultPlayer7Class = document.querySelector(".resultPlayer7Class")
const resultPlayer8Class = document.querySelector(".resultPlayer8Class")
const numberOfRoundWinPlayer1Class = document.querySelector(".numberOfRoundWinPlayer1Class")
const numberOfRoundWinPlayer2Class = document.querySelector(".numberOfRoundWinPlayer2Class")
const numberOfRoundWinPlayer3Class = document.querySelector(".numberOfRoundWinPlayer3Class")
const numberOfRoundWinPlayer4Class = document.querySelector(".numberOfRoundWinPlayer4Class")
const numberOfRoundWinPlayer5Class = document.querySelector(".numberOfRoundWinPlayer5Class")
const numberOfRoundWinPlayer6Class = document.querySelector(".numberOfRoundWinPlayer6Class")
const numberOfRoundWinPlayer7Class = document.querySelector(".numberOfRoundWinPlayer7Class")
const numberOfRoundWinPlayer8Class = document.querySelector(".numberOfRoundWinPlayer8Class")
const percentAveragePlayer1Class = document.querySelector(".percentAveragePlayer1Class")
const percentAveragePlayer2Class = document.querySelector(".percentAveragePlayer2Class")
const percentAveragePlayer3Class = document.querySelector(".percentAveragePlayer3Class")
const percentAveragePlayer4Class = document.querySelector(".percentAveragePlayer4Class")
const percentAveragePlayer5Class = document.querySelector(".percentAveragePlayer5Class")
const percentAveragePlayer6Class = document.querySelector(".percentAveragePlayer6Class")
const percentAveragePlayer7Class = document.querySelector(".percentAveragePlayer7Class")
const percentAveragePlayer8Class = document.querySelector(".percentAveragePlayer8Class")
const finalResult = document.querySelector('.finalResult')
const fetchImageButtonRoundClass = document.querySelector(".fetchImageButtonRoundClass")
const returnMenuClass = document.querySelector('.returnMenuClass')

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const canvasImageFetch = document.getElementById('canvasImageFetch');
const contextImageFetch = canvasImageFetch.getContext('2d')
const canvasImageFetchResult = document.getElementById('canvasImageFetchResult');
const contextImageFetchResult = canvasImageFetchResult.getContext('2d')
const canvasPlayer1 = document.getElementById('canvasPlayer1');
const contextPlayer1 = canvasPlayer1.getContext('2d')
const canvasPlayer2 = document.getElementById('canvasPlayer2');
const contextPlayer2 = canvasPlayer2.getContext('2d')
const canvasPlayer3 = document.getElementById('canvasPlayer3');
const contextPlayer3 = canvasPlayer3.getContext('2d')
const canvasPlayer4 = document.getElementById('canvasPlayer4');
const contextPlayer4 = canvasPlayer4.getContext('2d')
const canvasPlayer5 = document.getElementById('canvasPlayer5');
const contextPlayer5 = canvasPlayer5.getContext('2d')
const canvasPlayer6 = document.getElementById('canvasPlayer6');
const contextPlayer6 = canvasPlayer6.getContext('2d')
const canvasPlayer7 = document.getElementById('canvasPlayer7');
const contextPlayer7 = canvasPlayer7.getContext('2d')
const canvasPlayer8 = document.getElementById('canvasPlayer8');
const contextPlayer8 = canvasPlayer8.getContext('2d')

//Variables
let imageDataURL
let currentNamePlayer = namePlayer.value
let allclientsInRoom = []
let currentRoomID = ""
let numberOfPlayerRoom = 2
let timerDuration = 60
let timerInterval
let timerDurationFinalResult = 3
let timerFinalResult
let round = 1
let tolerance = 50;
let precision = 2
let victoryCondition = "hight"
let currentRound = 1

let roundWinPlayer1 = 0
let roundWinPlayer2 = 0
let roundWinPlayer3 = 0
let roundWinPlayer4 = 0
let roundWinPlayer5 = 0
let roundWinPlayer6 = 0
let roundWinPlayer7 = 0
let roundWinPlayer8 = 0

let percentageAveragePlayer1 = 0
let percentageAveragePlayer2 = 0
let percentageAveragePlayer3 = 0
let percentageAveragePlayer4 = 0
let percentageAveragePlayer5 = 0
let percentageAveragePlayer6 = 0
let percentageAveragePlayer7 = 0
let percentageAveragePlayer8 = 0

let percentageArrayPlayer1 = []
let percentageArrayPlayer2 = []
let percentageArrayPlayer3 = []
let percentageArrayPlayer4 = []
let percentageArrayPlayer5 = []
let percentageArrayPlayer6 = []
let percentageArrayPlayer7 = []
let percentageArrayPlayer8 = []

let loadCanvas1 = false
let loadCanvas2 = false
let loadCanvas3 = false
let loadCanvas4 = false
let loadCanvas5 = false
let loadCanvas6 = false
let loadCanvas7 = false
let loadCanvas8 = false

const resetVariables = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextImageFetch.clearRect(0, 0, canvasImageFetch.width, canvasImageFetch.height);
    contextPlayer1.clearRect(0, 0, canvasPlayer1.width, canvasPlayer1.height);
    contextPlayer2.clearRect(0, 0, canvasPlayer2.width, canvasPlayer2.height);
    contextPlayer3.clearRect(0, 0, canvasPlayer3.width, canvasPlayer3.height);
    contextPlayer4.clearRect(0, 0, canvasPlayer4.width, canvasPlayer4.height);
    contextPlayer5.clearRect(0, 0, canvasPlayer5.width, canvasPlayer5.height);
    contextPlayer6.clearRect(0, 0, canvasPlayer6.width, canvasPlayer6.height);
    contextPlayer7.clearRect(0, 0, canvasPlayer7.width, canvasPlayer7.height);
    contextPlayer8.clearRect(0, 0, canvasPlayer8.width, canvasPlayer8.height);

    imageDataURL = ""
    currentNamePlayer = namePlayer.value
    allclientsInRoom.length = 0
    currentRoomID = ""
    numberOfPlayerRoom = 2
    timerDuration = 60
    timerInterval
    timerDurationFinalResult = 3
    timerFinalResult
    round = 1
    tolerance = 50
    precision = 2
    victoryCondition = "hight"
    currentRound = 1
    category = ''
    width = 500
    height = 400

    roundWinPlayer1 = 0
    roundWinPlayer2 = 0
    roundWinPlayer3 = 0
    roundWinPlayer4 = 0
    roundWinPlayer5 = 0
    roundWinPlayer6 = 0
    roundWinPlayer7 = 0
    roundWinPlayer8 = 0

    percentageAveragePlayer1 = 0
    percentageAveragePlayer2 = 0
    percentageAveragePlayer3 = 0
    percentageAveragePlayer4 = 0
    percentageAveragePlayer5 = 0
    percentageAveragePlayer6 = 0
    percentageAveragePlayer7 = 0
    percentageAveragePlayer8 = 0
    percentageArrayPlayer1.length = 0
    percentageArrayPlayer2.length = 0
    percentageArrayPlayer3.length = 0
    percentageArrayPlayer4.length = 0
    percentageArrayPlayer5.length = 0
    percentageArrayPlayer6.length = 0
    percentageArrayPlayer7.length = 0
    percentageArrayPlayer8.length = 0

    loadCanvas1 = false
    loadCanvas2 = false
    loadCanvas3 = false
    loadCanvas4 = false
    loadCanvas5 = false
    loadCanvas6 = false
    loadCanvas7 = false
    loadCanvas8 = false

    player.innerHTML = ''
    numberOfPlayer.value = 2
    numberOfPlayerText.value = 2
    timerSelect.value = 60
    timerText.value = 60
    roundSelect.value = 1
    roundText.value = 1
    precisionSelect.value = 2
    precisionText.value = 2
    toleranceSelect.value = 50
    toleranceText.value = 50
    victoryConditionSelect.value = "hight"
    victoryConditionText.value = "Le plus haut pourcentage"
    widthSelect.value = 500
    widthText.value = 500
    heightSelect.value = 400
    heightText.value = 400
    categorySelect.value = ""
    categoryText.value = "Tous"

    fetchImageButton.disabled = false
    widthSelectClass.classList.remove("text-gray-500")
    widthSelect.disabled = false
    heightSelectClass.classList.remove("text-gray-500")
    heightSelect.disabled = false
    categorySelectClass.classList.remove("text-gray-500")
    categorySelect.disabled = false

    roundGame.textContent = "Manche: 1"
    samePixelTextPlayer1.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer2.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer3.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer4.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer5.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer6.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer7.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer8.textContent = 'Pourcentage de pixels identiques: 0%'
    namePlayer1.textContent = "Player 1"
    namePlayer2.textContent = "Player 2"
    namePlayer3.textContent = "Player 3"
    namePlayer4.textContent = "Player 4"
    namePlayer5.textContent = "Player 5"
    namePlayer6.textContent = "Player 6"
    namePlayer7.textContent = "Player 7"
    namePlayer8.textContent = "Player 8"
    numberOfRoundWinPlayer1.textContent = "Round win: " + roundWinPlayer1
    numberOfRoundWinPlayer2.textContent = "Round win: " + roundWinPlayer2
    numberOfRoundWinPlayer3.textContent = "Round win: " + roundWinPlayer3
    numberOfRoundWinPlayer4.textContent = "Round win: " + roundWinPlayer4
    numberOfRoundWinPlayer5.textContent = "Round win: " + roundWinPlayer5
    numberOfRoundWinPlayer6.textContent = "Round win: " + roundWinPlayer6
    numberOfRoundWinPlayer7.textContent = "Round win: " + roundWinPlayer7
    numberOfRoundWinPlayer8.textContent = "Round win: " + roundWinPlayer8
    fetchImageButtonRoundClass.classList.remove("hidden")
    winnerText.textContent = ""
    actions.length = 0
}