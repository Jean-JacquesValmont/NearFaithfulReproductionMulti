const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const player = document.getElementById("player")
const startGame = document.getElementById("startGame")
const timer = document.getElementById("timer")
const timerSelect = document.getElementById("timerSelect")
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const canvasImageResult = document.getElementById('canvasImageResult');
const contextImageResult = canvasImageResult.getContext('2d')
const canvasPlayer1 = document.getElementById('canvasPlayer1');
const contextPlayer1 = canvasPlayer1.getContext('2d')
const canvasPlayer2 = document.getElementById('canvasPlayer2');
const contextPlayer2 = canvasPlayer2.getContext('2d')


const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const game = document.querySelector('.game');
const finalResult = document.querySelector('.finalResult')

//Variable
let currentRoomID = ""
let timerDuration = 5
let timerInterval = 0

//// Envoyer les actions au serveur
// Créer une nouvelle salle de jeu
createRoom.addEventListener("click", () => {
    socket.emit('createRoom');
})

// Rejoindre salle de jeu
joinRoom.addEventListener("click", () => {
    let roomIdValue = roomId.value;
    if(roomIdValue == ""){
        return
    }
    socket.emit('joinRoom', roomIdValue);
    roomId.value = ""
})

// Lancer le jeu
startGame.addEventListener("click", () => {
    socket.emit('startGame');
})
    
//// Écouter les événements du serveur ////
socket.on('roomCreated', (roomID) => {
    menu.classList.add('hidden');
    roomMenu.classList.remove('hidden');

    currentRoomID = roomID
    nameRoomId.textContent = "Room id: " + roomID
    player.textContent = "Joueur présent: " + roomID
    console.log('Room created:', roomID);
});

socket.on('roomJoined', (clientsInRoom) => {
    menu.classList.add('hidden');
    roomMenu.classList.remove('hidden');

    let allclientsInRoom = ""
    currentRoomID = clientsInRoom[0]
    nameRoomId.textContent = "Room id: " + clientsInRoom[0]
    for(let i = 0; i < clientsInRoom.length; i++){
        allclientsInRoom += clientsInRoom[i] + " "
    }
    player.textContent = "Joueur présent: " + allclientsInRoom
    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("gameStarted", () => {
    // Appeler la fonction pour récupérer l'image
    // fetchImage();
    roomMenu.classList.add('hidden');
    game.classList.remove('hidden');

    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    timerInterval = setInterval(updateTimer, 1000)
    console.log("Game Start!")
    
})

socket.on("elapsedTime", (imageDataURL, hostUser) => {
    // console.log("drawingData: ", imageDataURL)
    if(hostUser == true){
        convertURLToImage(imageDataURL, contextPlayer1)
    }
    else{
        convertURLToImage(imageDataURL, contextPlayer2)
    }
    
    game.classList.add('hidden');
    finalResult.classList.remove('hidden');

    console.log("Temps écoulée. Affichage des résultats.")
    
})

//// Option roomMenu
//Timer
// Fonction pour mettre à jour le timer
function updateTimer() {
    // Afficher le temps restant
    timer.textContent = "Timer: " + timerDuration

    // Vérifier si le timer est écoulé
    if (timerDuration === 0) {
        clearInterval(timerInterval); // Arrêter le timer

        let imageDataURL = canvas.toDataURL()
        console.log(imageDataURL)
        socket.emit('endOfTimer', imageDataURL, currentRoomID);

        console.log("Le temps est écoulé !");
    } else {
        timerDuration--; // Décrémenter le temps restant
    }
}

// Événement pour définir le timer
timerSelect.addEventListener("change", () => {
    timerDuration = timerSelect.value
    timer.textContent = "Timer: " + timerSelect.value
})

//Fonction pour transformer une URL en image
function convertURLToImage(imageDataURL, context){
    // Créer une nouvelle image
    const image = new Image();

    // Définir l'URL Base64 de l'image
    image.src = imageDataURL; // Supposons que imageDataURL soit l'URL Base64 que vous avez reçue via Socket.IO

    // Attendre que l'image soit chargée
    image.onload = function() {
        // Dessiner l'image sur le canvas
        context.drawImage(image, 0, 0);
    };
}