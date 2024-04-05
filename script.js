const socket = io();
const createRoom = document.getElementById("createRoom")
const joinRoom = document.getElementById("joinRoom")
const roomId = document.getElementById('roomId')
const nameRoomId = document.getElementById('nameRoomId')
const copyButton = document.getElementById('copyID');
const errorCopyID = document.getElementById('errorCopyID');
const namePlayer = document.getElementById('namePlayer')
const player = document.getElementById("player")
const timerText = document.getElementById("timerText")
const startGame = document.getElementById("startGame")
const timer = document.getElementById("timer")
const timerSelect = document.getElementById("timerSelect")
const samePixelTextPlayer1 = document.getElementById("samePixelTextPlayer1")
const samePixelTextPlayer2 = document.getElementById("samePixelTextPlayer2")
const namePlayer1 = document.getElementById("namePlayer1")
const namePlayer2 = document.getElementById("namePlayer2")
const progressBarPlayer1 = document.getElementById("progressBarPlayer1")
const progressBarPlayer2 = document.getElementById("progressBarPlayer2")
const winnerText = document.getElementById("winnerText")
const returnMenu = document.getElementById('returnMenu')

const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const timerSelectClass = document.querySelector('.timerSelectClass');
const timerSelectText = document.querySelector('.timerSelectText');
const buttonStartGame = document.querySelector('.buttonStartGame');
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
let currentNamePlayer = namePlayer.value
let allclientsInRoom = []
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
    createRoom.disabled = true
    await fetchImage()
    createRoom.disabled = false
    currentNamePlayer = namePlayer.value
    socket.emit('createRoom');
})

// Rejoindre salle de jeu
joinRoom.addEventListener("click", () => {
    currentNamePlayer = namePlayer.value
    let roomIdValue = roomId.value;
    if(roomIdValue == ""){
        return
    }
    socket.emit('joinRoom', roomIdValue, currentNamePlayer);
    roomId.value = ""
})

// Lancer le jeu
startGame.addEventListener("click", () => {
    let imageDataURL = canvasImageFetch.toDataURL()
    if(allclientsInRoom.length >= 2){
        socket.emit('startGame', imageDataURL);
    }
})
    
//// Écouter les événements du serveur ////
socket.on('roomCreated', (roomID) => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    roomMenu.classList.remove('hidden');
    roomMenu.classList.add('flex');
    timerSelectText.classList.add("hidden")

    currentRoomID = roomID
    nameRoomId.textContent = roomID
    allclientsInRoom.push(currentNamePlayer)

    const newParagraph = document.createElement('p');
    newParagraph.textContent = currentNamePlayer
    player.appendChild(newParagraph)
});

socket.on('roomJoined', (clientsInRoom, namePlayerJoin) => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    roomMenu.classList.remove('hidden');
    roomMenu.classList.add('flex');

    if(currentNamePlayer != namePlayerJoin){
        allclientsInRoom.push(namePlayerJoin)
        
        socket.emit('sendPlayersInRoom', allclientsInRoom, clientsInRoom[0], timerDuration);
    }
    else{
        currentRoomID = clientsInRoom[0]
        nameRoomId.textContent = clientsInRoom[0]
        buttonStartGame.classList.add('hidden');
        buttonStartGame.classList.remove('flex');
        timerSelectClass.classList.add("hidden")
    }

    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("sendedPlayersInRoom", (allclientsInRoomSended, currentTimer) => {
    player.innerHTML = ''
    allclientsInRoom = allclientsInRoomSended
    timerDuration = currentTimer
    timerText.textContent = currentTimer

    for(let i = 0; i < allclientsInRoom.length; i++){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = allclientsInRoom[i]
        player.appendChild(newParagraph)
    }
})

socket.on("timerChanged", (timerChanged) => {
    timer.textContent = timerChanged
    timerText.textContent = timerChanged
    timerDuration = timerChanged
})

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
    
    updateProgressBar(0, progressBarPlayer1);
    updateProgressBar(0, progressBarPlayer2);
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

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(nameRoomId.textContent)
    .then(() => {
      console.log('Room ID copied successfully!');
      errorCopyID.textContent = 'Room ID copied successfully!'
    })
    .catch(err => {
      console.error('Unable to copy Room ID:', err);
      errorCopyID.textContent = 'Unable to copy Room ID. Please copy manually.'
    });
})
//// Timer
// Fonction pour mettre à jour le timer
const updateTimer = () => {
    // Afficher le temps restant
    timer.textContent = "Timer: " + timerDuration

    // Vérifier si le timer est écoulé
    if (timerDuration === 0) {
        clearInterval(timerInterval); // Arrêter le timer

        let imageDataURL = canvas.toDataURL()
        namePlayer1.textContent = allclientsInRoom[0]
        namePlayer2.textContent = allclientsInRoom[1]
        socket.emit('endOfTimer', imageDataURL, currentRoomID);

        console.log("Le temps est écoulé !");
    } else {
        timerDuration--; // Décrémenter le temps restant
    }
}

// Événement pour définir le timer
timerSelect.addEventListener("change", () => {
    timerDuration = timerSelect.value
    timer.textContent = "Timer :" + timerSelect.value

    socket.emit('timerChange', timerDuration);
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
        const resultPlayer1 = compareImage(canvasPlayer1, contextPlayer1, samePixelTextPlayer1, progressBarPlayer1)
        const resultPlayer2 = compareImage(canvasPlayer2, contextPlayer2, samePixelTextPlayer2, progressBarPlayer2)

        console.log("Score afficher.");
        compareWithPrecision(resultPlayer1, resultPlayer2, 2)
        console.log("Résultat final afficher!")

    } else {
        timerDurationFinalResult--; // Décrémenter le temps restant
    }
}

//Partie du code pour comparer les deux images
// Comparer les pixels des deux images
const compareImage = (canvas, context, samePixelText, progressBar) => {
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
    updateProgressBar(samePercentage, progressBar);

    samePixelText.textContent = 'Pourcentage de pixels identiques: ' + samePercentage.toFixed(2) + '%'
    return samePercentage.toFixed(2)
}

// Fonction pour mettre à jour la barre de progression
const updateProgressBar = (progress, progressBarID) => {
    // Assurez-vous que la valeur de progression est entre 0 et 100
    if (progress >= 0 && progress <= 100) {
      // Mettre à jour la largeur de la barre de progression en pourcentage
      progressBarID.style.width = progress + '%';
    }
  }

// Comparaison avec une précision de 2 décimales
const compareWithPrecision = (a, b, precision) => {
    if(Math.round(a * 10 ** precision) > Math.round(b * 10 ** precision)){
        winnerText.textContent = allclientsInRoom[0]
    }
    else if(Math.round(a * 10 ** precision) < Math.round(b * 10 ** precision)){
        winnerText.textContent = allclientsInRoom[1]
    }
    else if(Math.round(a * 10 ** precision) == Math.round(b * 10 ** precision)){
        winnerText.textContent = "Egalité."
    }
}

returnMenu.addEventListener('click', () => {
    finalResult.classList.add('hidden');
    finalResult.classList.remove('flex');
    menu.classList.remove('hidden');
    menu.classList.add('flex');

    //Remettre à zéro les variables
    player.innerHTML = ''
    allclientsInRoom = []
    timerSelect.value = 60
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextImageFetch.clearRect(0, 0, canvasImageFetch.width, canvasImageFetch.height);
    contextPlayer1.clearRect(0, 0, canvasPlayer1.width, canvasPlayer1.height);
    contextPlayer2.clearRect(0, 0, canvasPlayer2.width, canvasPlayer2.height);
    samePixelTextPlayer1.textContent = 'Pourcentage de pixels identiques: 0%'
    samePixelTextPlayer2.textContent = 'Pourcentage de pixels identiques: 0%'
    namePlayer1.textContent = "Player 1"
    namePlayer2.textContent = "Player 2"
    winnerText.textContent = ""
    timerDuration = 60
    timerDurationFinalResult = 3
    loadCanvas1 = false
    loadCanvas2 = false
})