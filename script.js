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
const numberOfPlayer = document.getElementById("numberOfPlayer")
const numberOfPlayerText = document.getElementById("numberOfPlayerText")
const leaveRoom = document.getElementById("leaveRoom")
const startGame = document.getElementById("startGame")
const timer = document.getElementById("timer")
const timerSelect = document.getElementById("timerSelect")
const samePixelTextPlayer1 = document.getElementById("samePixelTextPlayer1")
const samePixelTextPlayer2 = document.getElementById("samePixelTextPlayer2")
const samePixelTextPlayer3 = document.getElementById("samePixelTextPlayer3")
const samePixelTextPlayer4 = document.getElementById("samePixelTextPlayer4")
const samePixelTextPlayer5 = document.getElementById("samePixelTextPlayer5")
const samePixelTextPlayer6 = document.getElementById("samePixelTextPlayer6")
const samePixelTextPlayer7 = document.getElementById("samePixelTextPlayer7")
const samePixelTextPlayer8 = document.getElementById("samePixelTextPlayer8")
const namePlayer1 = document.getElementById("namePlayer1")
const namePlayer2 = document.getElementById("namePlayer2")
const namePlayer3 = document.getElementById("namePlayer3")
const namePlayer4 = document.getElementById("namePlayer4")
const namePlayer5 = document.getElementById("namePlayer5")
const namePlayer6 = document.getElementById("namePlayer6")
const namePlayer7 = document.getElementById("namePlayer7")
const namePlayer8 = document.getElementById("namePlayer8")
const progressBarPlayer1 = document.getElementById("progressBarPlayer1")
const progressBarPlayer2 = document.getElementById("progressBarPlayer2")
const progressBarPlayer3 = document.getElementById("progressBarPlayer3")
const progressBarPlayer4 = document.getElementById("progressBarPlayer4")
const progressBarPlayer5 = document.getElementById("progressBarPlayer5")
const progressBarPlayer6 = document.getElementById("progressBarPlayer6")
const progressBarPlayer7 = document.getElementById("progressBarPlayer7")
const progressBarPlayer8 = document.getElementById("progressBarPlayer8")
const winnerText = document.getElementById("winnerText")
const returnMenu = document.getElementById('returnMenu')

const menu = document.querySelector('.menu');
const roomMenu = document.querySelector('.roomMenu');
const numberOfPlayerClass = document.querySelector('.numberOfPlayerClass');
const numberOfPlayerTextClass = document.querySelector('.numberOfPlayerTextClass');
const timerSelectClass = document.querySelector('.timerSelectClass');
const timerSelectText = document.querySelector('.timerSelectText');
const buttonStartGame = document.querySelector('.buttonStartGame');
const game = document.querySelector('.game');
const resultPlayer3Class = document.querySelector(".resultPlayer3Class")
const resultPlayer4Class = document.querySelector(".resultPlayer4Class")
const resultPlayer5Class = document.querySelector(".resultPlayer5Class")
const resultPlayer6Class = document.querySelector(".resultPlayer6Class")
const resultPlayer7Class = document.querySelector(".resultPlayer7Class")
const resultPlayer8Class = document.querySelector(".resultPlayer8Class")
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

//Variable
let currentNamePlayer = namePlayer.value
let allclientsInRoom = []
let currentRoomID = ""
let numberOfPlayerRoom = 2
let timerDuration = 60
let timerInterval
let timerDurationFinalResult = 3
let timerFinalResult
let loadCanvas1 = false
let loadCanvas2 = false
let loadCanvas3 = false
let loadCanvas4 = false
let loadCanvas5 = false
let loadCanvas6 = false
let loadCanvas7 = false
let loadCanvas8 = false

let tolerance = 50;

//// Envoyer les actions au serveur
// Créer une nouvelle salle de jeu
createRoom.addEventListener("click", async () => {
    createRoom.disabled = true
    // await fetchImage()
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

leaveRoom.addEventListener("click", () => {
    menu.classList.add('flex');
    menu.classList.remove('hidden');
    roomMenu.classList.remove('flex');
    roomMenu.classList.add('hidden');

    //Remettre à zéro les variables
    initGame()

    socket.emit('leaveRoom', currentRoomID, currentNamePlayer)
})

// Lancer le jeu
startGame.addEventListener("click", () => {
    let imageDataURL = canvasImageFetch.toDataURL()
    if(allclientsInRoom.length == numberOfPlayerRoom){
        socket.emit('startGame', imageDataURL);
    }
})
    
//// Écouter les événements du serveur ////
socket.on('roomCreated', (roomID) => {
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    roomMenu.classList.remove('hidden');
    roomMenu.classList.add('flex');
    numberOfPlayerTextClass.classList.add("hidden")
    numberOfPlayerClass.classList.remove("hidden")
    timerSelectText.classList.add("hidden")
    timerSelectClass.classList.remove("hidden")

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
        
        socket.emit('sendPlayersInRoom', allclientsInRoom, clientsInRoom[0], timerDuration, numberOfPlayerRoom);
    }
    else{
        currentRoomID = clientsInRoom[0]
        nameRoomId.textContent = clientsInRoom[0]
        buttonStartGame.classList.add('hidden');
        buttonStartGame.classList.remove('flex');
        numberOfPlayerClass.classList.add("hidden")
        numberOfPlayerTextClass.classList.remove("hidden")
        timerSelectClass.classList.add("hidden")
        timerSelectText.classList.remove("hidden")
    }

    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("roomLeaved", (namePlayerLeaved) => {
    allclientsInRoom = removePlayerFromArray(allclientsInRoom, namePlayerLeaved)
    console.log("allclientsInRoom: ", allclientsInRoom)

    player.innerHTML = ''
    for(let i = 0; i < allclientsInRoom.length; i++){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = allclientsInRoom[i]
        player.appendChild(newParagraph)
    }
})

socket.on("sendedPlayersInRoom", (allclientsInRoomSended, currentTimer, numberOfPlayerRoomSended) => {
    player.innerHTML = ''
    allclientsInRoom = allclientsInRoomSended
    timerDuration = currentTimer
    timerText.textContent = currentTimer
    numberOfPlayerRoom = numberOfPlayerRoomSended
    numberOfPlayerText.textContent = numberOfPlayerRoomSended

    for(let i = 0; i < allclientsInRoom.length; i++){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = allclientsInRoom[i]
        player.appendChild(newParagraph)
    }
})

socket.on("numberOfPlayerChanged", (numberOfPlayerChanged) => {
    numberOfPlayerRoom = numberOfPlayerChanged
    numberOfPlayerText.textContent = numberOfPlayerChanged
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

    resultPlayer3Class.classList.remove("hidden")
    resultPlayer4Class.classList.remove("hidden")
    resultPlayer5Class.classList.remove("hidden")
    resultPlayer6Class.classList.remove("hidden")
    resultPlayer7Class.classList.remove("hidden")
    resultPlayer8Class.classList.remove("hidden")

    if (numberOfPlayerRoom == 2){
        resultPlayer3Class.classList.add("hidden")
        resultPlayer4Class.classList.add("hidden")
        resultPlayer5Class.classList.add("hidden")
        resultPlayer6Class.classList.add("hidden")
        resultPlayer7Class.classList.add("hidden")
        resultPlayer8Class.classList.add("hidden")
    }
    else if(numberOfPlayerRoom == 3){
        resultPlayer4Class.classList.add("hidden")
        resultPlayer5Class.classList.add("hidden")
        resultPlayer6Class.classList.add("hidden")
        resultPlayer7Class.classList.add("hidden")
        resultPlayer8Class.classList.add("hidden")
    }
    else if(numberOfPlayerRoom == 4){
        resultPlayer5Class.classList.add("hidden")
        resultPlayer6Class.classList.add("hidden")
        resultPlayer7Class.classList.add("hidden")
        resultPlayer8Class.classList.add("hidden")
    }
    else if(numberOfPlayerRoom == 5){
        resultPlayer6Class.classList.add("hidden")
        resultPlayer7Class.classList.add("hidden")
        resultPlayer8Class.classList.add("hidden")
    }
    else if(numberOfPlayerRoom == 6){
        resultPlayer7Class.classList.add("hidden")
        resultPlayer8Class.classList.add("hidden")
    }
    else if(numberOfPlayerRoom == 7){
        resultPlayer8Class.classList.add("hidden")
    }

    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    timerInterval = setInterval(updateTimer, 1000)
})

socket.on("elapsedTime", (imageDataURL, User) => {

    if(numberOfPlayerRoom == 2){
        loadCanvas3 = true
        loadCanvas4 = true
        loadCanvas5 = true
        loadCanvas6 = true
        loadCanvas7 = true
        loadCanvas8 = true
    }
    else if(numberOfPlayerRoom == 3){
        loadCanvas4 = true
        loadCanvas5 = true
        loadCanvas6 = true
        loadCanvas7 = true
        loadCanvas8 = true
    }
    else if(numberOfPlayerRoom == 4){
        loadCanvas5 = true
        loadCanvas6 = true
        loadCanvas7 = true
        loadCanvas8 = true
    }
    else if(numberOfPlayerRoom == 5){
        loadCanvas6 = true
        loadCanvas7 = true
        loadCanvas8 = true
    }
    else if(numberOfPlayerRoom == 6){
        loadCanvas7 = true
        loadCanvas8 = true
    }
    else if(numberOfPlayerRoom == 7){
        loadCanvas8 = true
    }

    if(User == 0){
        convertURLToImage(imageDataURL, contextPlayer1)
        loadCanvas1 = true
    }
    else if(User == 1) {
        convertURLToImage(imageDataURL, contextPlayer2)
        loadCanvas2 = true
    }
    else if(User == 2) {
        convertURLToImage(imageDataURL, contextPlayer3)
        loadCanvas3 = true
    }
    else if(User == 3) {
        convertURLToImage(imageDataURL, contextPlayer4)
        loadCanvas4 = true
    }
    else if(User == 4) {
        convertURLToImage(imageDataURL, contextPlayer5)
        loadCanvas5 = true
    }
    else if(User == 5) {
        convertURLToImage(imageDataURL, contextPlayer6)
        loadCanvas6 = true
    }
    else if(User == 6) {
        convertURLToImage(imageDataURL, contextPlayer7)
        loadCanvas7 = true
    }
    else if(User == 7) {
        convertURLToImage(imageDataURL, contextPlayer8)
        loadCanvas8 = true
    }
    
    updateProgressBar(0, progressBarPlayer1);
    updateProgressBar(0, progressBarPlayer2);
    updateProgressBar(0, progressBarPlayer3);
    updateProgressBar(0, progressBarPlayer4);
    updateProgressBar(0, progressBarPlayer5);
    updateProgressBar(0, progressBarPlayer6);
    updateProgressBar(0, progressBarPlayer7);
    updateProgressBar(0, progressBarPlayer8);

    game.classList.add('hidden');
    game.classList.remove('flex');
    finalResult.classList.remove('hidden');
    finalResult.classList.add('flex');

    // Démarrer le timer pour calculer les résultats
    // Le if est là car j'ai deux envois du socket "elapsedTime" et donc mon setInterval qui ce lance deux fois.
    // Ce qui permet de le limiter à le lancer 1 fois.
    if(loadCanvas1 == true && loadCanvas2 == true
    && loadCanvas3 == true && loadCanvas4 == true
    && loadCanvas5 == true && loadCanvas6 == true
    && loadCanvas7 == true && loadCanvas8 == true){
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
        namePlayer3.textContent = allclientsInRoom[2]
        namePlayer4.textContent = allclientsInRoom[3]
        namePlayer5.textContent = allclientsInRoom[4]
        namePlayer6.textContent = allclientsInRoom[5]
        namePlayer7.textContent = allclientsInRoom[6]
        namePlayer8.textContent = allclientsInRoom[7]
        socket.emit('endOfTimer', imageDataURL, currentRoomID);

        console.log("Le temps est écoulé !");
    } else {
        timerDuration--; // Décrémenter le temps restant
    }
}

// Événement pour définir le nombre de joueurs
numberOfPlayer.addEventListener("change", () => {
    numberOfPlayerRoom = numberOfPlayer.value

    socket.emit('numberOfPlayerChange', numberOfPlayerRoom);
})

// Événement pour définir le timer
timerSelect.addEventListener("change", () => {
    timerDuration = timerSelect.value
    timer.textContent = "Timer:" + timerSelect.value

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
        let resultPlayer1 = compareImage(canvasPlayer1, contextPlayer1, samePixelTextPlayer1, progressBarPlayer1)
        let resultPlayer2 = compareImage(canvasPlayer2, contextPlayer2, samePixelTextPlayer2, progressBarPlayer2)
        let resultPlayer3 = compareImage(canvasPlayer3, contextPlayer3, samePixelTextPlayer3, progressBarPlayer3)
        let resultPlayer4 = compareImage(canvasPlayer4, contextPlayer4, samePixelTextPlayer4, progressBarPlayer4)
        let resultPlayer5 = compareImage(canvasPlayer5, contextPlayer5, samePixelTextPlayer5, progressBarPlayer5)
        let resultPlayer6 = compareImage(canvasPlayer6, contextPlayer6, samePixelTextPlayer6, progressBarPlayer6)
        let resultPlayer7 = compareImage(canvasPlayer7, contextPlayer7, samePixelTextPlayer7, progressBarPlayer7)
        let resultPlayer8 = compareImage(canvasPlayer8, contextPlayer8, samePixelTextPlayer8, progressBarPlayer8)
        if(numberOfPlayerRoom == 2){
            resultPlayer3 = 0
            resultPlayer4 = 0
            resultPlayer5 = 0
            resultPlayer6 = 0
            resultPlayer7 = 0
            resultPlayer8 = 0
        }
        else if(numberOfPlayerRoom == 3){
            resultPlayer4 = 0
            resultPlayer5 = 0
            resultPlayer6 = 0
            resultPlayer7 = 0
            resultPlayer8 = 0
        }
        else if(numberOfPlayerRoom == 4){
            resultPlayer5 = 0
            resultPlayer6 = 0
            resultPlayer7 = 0
            resultPlayer8 = 0
        }
        else if(numberOfPlayerRoom == 5){
            resultPlayer6 = 0
            resultPlayer7 = 0
            resultPlayer8 = 0
        }
        else if(numberOfPlayerRoom == 6){
            resultPlayer7 = 0
            resultPlayer8 = 0
        }
        else if(numberOfPlayerRoom == 7){
            resultPlayer8 = 0
        }

        console.log("Score afficher.");
        compareWithPrecision(2, resultPlayer1, resultPlayer2, resultPlayer3,resultPlayer4,resultPlayer5,resultPlayer6,resultPlayer7,resultPlayer8)
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
const compareWithPrecision = (precision, ...values) => {
    let maxValue = -Infinity;
    let maxIndex = -1;

    values.forEach((value, index) => {
        const roundedValue = Math.round(value * 10 ** precision);
        if (roundedValue > maxValue) {
            maxValue = roundedValue;
            maxIndex = index;
        }
    });

    if (maxIndex !== -1) {
        winnerText.textContent = allclientsInRoom[maxIndex];
    }
};

returnMenu.addEventListener('click', () => {
    finalResult.classList.add('hidden');
    finalResult.classList.remove('flex');
    menu.classList.remove('hidden');
    menu.classList.add('flex');

    //Remettre à zéro les variables
    initGame()
})

const initGame = () => {
    player.innerHTML = ''
    allclientsInRoom.length = 0
    numberOfPlayer.value = 2
    timerSelect.value = 60
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
    winnerText.textContent = ""
    timerDuration = 60
    timerDurationFinalResult = 3
    loadCanvas1 = false
    loadCanvas2 = false
    loadCanvas3 = false
    loadCanvas4 = false
    loadCanvas5 = false
    loadCanvas6 = false
    loadCanvas7 = false
    loadCanvas8 = false
    actions.length = 0
}

const removePlayerFromArray = (array, stringToRemove) => {
    const index = array.indexOf(stringToRemove);
    if (index !== -1) {
        array.splice(index, 1); // Supprimer l'élément trouvé à l'index
        return array
    }
}