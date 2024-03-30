const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const player = document.getElementById("player")
const startGame = document.getElementById("startGame")
const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const game = document.querySelector('.game');

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

    console.log("Game Start!")
    
})