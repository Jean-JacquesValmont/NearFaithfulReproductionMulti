const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const player = document.getElementById("player")
const startGame = document.getElementById("startGame")
const timer = document.getElementById("timer")
const timerSelect = document.getElementById("timerSelect")
const samePixelTextPlayer1 = document.getElementById("samePixelTextPlayer1")
const samePixelTextPlayer2 = document.getElementById("samePixelTextPlayer2")
const winnerText = document.getElementById("winnerText")
const returnMenu = document.getElementById('returnMenu')

const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const game = document.querySelector('.game');
const finalResult = document.querySelector('.finalResult')

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

//Variable
let currentRoomID = ""
let timerDuration = 60
let timerInterval
let timerDurationFinalResult = 3
let timerFinalResult
let loadCanvas1 = false
let loadCanvas2 = false

let tolerance = 50;

//// Envoyer les actions au serveur
// Créer une nouvelle salle de jeu
createRoom.addEventListener("click", async () => {
    // await fetchImage()
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
    let imageDataURL = canvasImageFetch.toDataURL()
    socket.emit('startGame', imageDataURL);
})
    
//// Écouter les événements du serveur ////
socket.on('roomCreated', (roomID) => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    roomMenu.classList.remove('hidden');
    roomMenu.classList.add('flex');

    currentRoomID = roomID
    nameRoomId.textContent = "Room ID " + roomID
    player.textContent = "Players " + roomID
});

socket.on('roomJoined', (clientsInRoom) => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    roomMenu.classList.remove('hidden');
    roomMenu.classList.add('flex');

    let allclientsInRoom = ""
    currentRoomID = clientsInRoom[0]
    nameRoomId.textContent = "Room id: " + clientsInRoom[0]
    for(let i = 0; i < clientsInRoom.length; i++){
        allclientsInRoom += clientsInRoom[i] + " "
    }
    player.textContent = "Joueur présent: " + allclientsInRoom
    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("gameStarted", (imageURL) => {
    convertURLToImage(imageURL, contextImageFetch)
    convertURLToImage(imageURL, contextImageFetchResult)
    roomMenu.classList.add('hidden');
    roomMenu.classList.remove('flex');
    game.classList.remove('hidden');
    game.classList.add('flex');

    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    timerInterval = setInterval(updateTimer, 1000)
})

socket.on("elapsedTime", (imageDataURL, hostUser) => {

    if(hostUser == true){
        convertURLToImage(imageDataURL, contextPlayer1)
        loadCanvas1 = true
    }
    else{
        convertURLToImage(imageDataURL, contextPlayer2)
        loadCanvas2 = true
    }
    
    game.classList.add('hidden');
    game.classList.remove('flex');
    finalResult.classList.remove('hidden');
    finalResult.classList.add('flex');

    // Démarrer le timer pour calculer les résultats
    // Le if est là car j'ai deux envois du socket "elapsedTime" et donc mon setInterval qui ce lance deux fois.
    // Ce qui permet de le limiter à le lancer 1 fois.
    if(loadCanvas1 == true && loadCanvas2 == true){
        timerFinalResult = setInterval(updateTimerResult, 1000)
    }
    
})

////// Option roomMenu
//// Timer
// Fonction pour mettre à jour le timer
const updateTimer = () => {
    // Afficher le temps restant
    timer.textContent = "Timer: " + timerDuration

    // Vérifier si le timer est écoulé
    if (timerDuration === 0) {
        clearInterval(timerInterval); // Arrêter le timer

        let imageDataURL = canvas.toDataURL()
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
const convertURLToImage = (imageDataURL, context) => {
    // Créer une nouvelle image
    const image = new Image();

    // Définir l'URL Base64 de l'image
    image.src = imageDataURL; // Supposons que imageDataURL soit l'URL Base64 que vous avez reçue via Socket.IO

    // Attendre que l'image soit chargée
    image.onload = function() {
        console.log("L'image est chargée avec succès !");
        // Dessiner l'image sur le canvas
        context.drawImage(image, 0, 0);
    };

    // Ajouter un gestionnaire d'événements onerror pour gérer les cas où le chargement de l'image échoue
    image.onerror = function() {
        console.error("Erreur lors du chargement de l'image !");
    };
}

//////Div resultat final
// Fonction pour mettre à jour le timer
const updateTimerResult = () => {
    // Vérifier si le timer est écoulé
    if (timerDurationFinalResult === 0) {
        clearInterval(timerFinalResult); // Arrêter le timer
        const resultPlayer1 = compareImage(canvasPlayer1, contextPlayer1, samePixelTextPlayer1)
        const resultPlayer2 = compareImage(canvasPlayer2, contextPlayer2, samePixelTextPlayer2)

        console.log("Score afficher.");
        compareWithPrecision(resultPlayer1, resultPlayer2, 2)
        console.log("Résultat final afficher!")

    } else {
        timerDurationFinalResult--; // Décrémenter le temps restant
    }
}

//Partie du code pour comparer les deux images
// Comparer les pixels des deux images
const compareImage = (canvas, context, samePixelText) => {
    imageData1 = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData2 = contextImageFetchResult.getImageData(0, 0, canvasImageFetchResult.width, canvasImageFetchResult.height);

    pixels1 = imageData1.data;
    pixels2 = imageData2.data;

    let samePixels = 0;

    for (let i = 0; i < pixels1.length; i += 4) {
        const diffRed = Math.abs(pixels1[i] - pixels2[i]);
        const diffGreen = Math.abs(pixels1[i + 1] - pixels2[i + 1]);
        const diffBlue = Math.abs(pixels1[i + 2] - pixels2[i + 2]);
        const diffAlpha = Math.abs(pixels1[i + 3] - pixels2[i + 3]);

        if (diffRed <= tolerance && diffGreen <= tolerance &&
            diffBlue <= tolerance && diffAlpha <= tolerance) {
            samePixels++;
        }
    }

    // Calculer le pourcentage de pixels identiques
    const totalPixels = canvas.width * canvas.height;
    const samePercentage = (samePixels / totalPixels) * 100;

    samePixelText.textContent = 'Pourcentage de pixels identiques: ' + samePercentage.toFixed(2) + '%'
    return samePercentage.toFixed(2)
}

// Comparaison avec une précision de 2 décimales
const compareWithPrecision = (a, b, precision) => {
    if(Math.round(a * 10 ** precision) > Math.round(b * 10 ** precision)){
        winnerText.textContent = "Le gagnant est player1."
    }
    else if(Math.round(a * 10 ** precision) < Math.round(b * 10 ** precision)){
        winnerText.textContent = "Le gagnant est player2."
    }
    else if(Math.round(a * 10 ** precision) == Math.round(b * 10 ** precision)){
        winnerText.textContent = "Egalité."
    }
}

returnMenu.addEventListener('click', () => {
    finalResult.classList.add('hidden');
    menu.classList.remove('hidden');

    //Remettre à zéro les variables
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextImageFetch.clearRect(0, 0, canvasImageFetch.width, canvasImageFetch.height);
    contextPlayer1.clearRect(0, 0, canvasPlayer1.width, canvasPlayer1.height);
    contextPlayer2.clearRect(0, 0, canvasPlayer2.width, canvasPlayer2.height);
    samePixelTextPlayer1.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer2.textContent = 'Pourcentage de pixels identiques: 0%'
    winnerText.textContent = ""
    timerDuration = 5
    timerDurationFinalResult = 3
    loadCanvas1 = false
    loadCanvas2 = false
})