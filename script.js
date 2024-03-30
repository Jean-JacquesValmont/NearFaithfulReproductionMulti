const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const player = document.getElementById("player")
const startGame = document.getElementById("startGame")
const timer = document.getElementById("timer")
const timerSelect = document.getElementById("timerSelect")
const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const game = document.querySelector('.game');

//Variable
let timerDuration = 60

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

    nameRoomId.textContent = "Room id: " + roomID
    player.textContent = "Joueur présent: " + roomID
    console.log('Room created:', roomID);
});

socket.on('roomJoined', (clientsInRoom) => {
    menu.classList.add('hidden');
    roomMenu.classList.remove('hidden');

    let allclientsInRoom = ""
    nameRoomId.textContent = "Room id: " + clientsInRoom[0]
    for(let i = 0; i < clientsInRoom.length; i++){
        allclientsInRoom += clientsInRoom[i] + " "
    }
    player.textContent = "Joueur présent: " + allclientsInRoom
    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("gameStarted", () => {
    roomMenu.classList.add('hidden');
    game.classList.remove('hidden');

    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    let timerInterval = setInterval(updateTimer, 1000)
    console.log("Game Start!")
    
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