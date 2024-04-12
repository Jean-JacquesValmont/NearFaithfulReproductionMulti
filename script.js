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
const precisionSelect = document.getElementById("precisionSelect")
const precisionText = document.getElementById("precisionText")
const toleranceSelect = document.getElementById("toleranceSelect")
const toleranceText = document.getElementById("toleranceText")
const widthSelect = document.getElementById("widthSelect")
const widthText = document.getElementById("widthText")
const heightSelect = document.getElementById("heightSelect")
const heightText = document.getElementById("heightText")
const categorySelect = document.getElementById("categorySelect")
const categoryText = document.getElementById("categoryText")

const fetchImageButton = document.getElementById("fetchImageButton")
const startGame = document.getElementById("startGame")

const timer = document.getElementById("timer")
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
const timerTextClass = document.querySelector('.timerTextClass');
const precisionSelectClass = document.querySelector('.precisionSelectClass');
const precisionTextClass = document.querySelector('.precisionTextClass');
const toleranceSelectClass = document.querySelector('.toleranceSelectClass');
const toleranceTextClass = document.querySelector('.toleranceTextClass');
const widthSelectClass = document.querySelector('.widthSelectClass');
const widthTextClass = document.querySelector('.widthTextClass');
const heightSelectClass = document.querySelector(".heightSelectClass");
const heightTextClass = document.querySelector(".heightTextClass");
const categorySelectClass = document.querySelector(".categorySelectClass");
const categoryTextClass = document.querySelector(".categoryTextClass");
const fetchImageButtonClass = document.querySelector(".fetchImageButtonClass")
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
let imageDataURL
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
let precision = 2


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
    loadCanvas1 = false
    loadCanvas2 = false
    loadCanvas3 = false
    loadCanvas4 = false
    loadCanvas5 = false
    loadCanvas6 = false
    loadCanvas7 = false
    loadCanvas8 = false
    tolerance = 50
    precision = 2
    category = ''
    width = 500
    height = 400

    player.innerHTML = ''
    numberOfPlayer.value = 2
    numberOfPlayerText.value = 2
    timerSelect.value = 60
    timerText.value = 60
    precisionSelect.value = 2
    precisionText.value = 2
    toleranceSelect.value = 50
    toleranceText.value = 50
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
    actions.length = 0
}

////Action pour l'host seulement

fetchImageButton.addEventListener("click", async () => {
    fetchImageButton.disabled = true
    await fetchImage()
    fetchImageButtonClass.classList.add("text-gray-500")
    widthSelect.disabled = true
    widthSelectClass.classList.add("text-gray-500")
    heightSelect.disabled = true
    heightSelectClass.classList.add("text-gray-500")
    categorySelect.disabled = true
    categorySelectClass.classList.add("text-gray-500")
    makingVisibleClass(buttonStartGame)
})

//// Envoyer les actions au serveur
// Créer une nouvelle salle de jeu
createRoom.addEventListener("click", () => {
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
    makingVisibleClass(menu)
    makingInvisibleClass(roomMenu)

    resetVariables()

    socket.emit('leaveRoom', currentRoomID, currentNamePlayer)
})

// Lancer le jeu
startGame.addEventListener("click", () => {
    if(allclientsInRoom.length == numberOfPlayerRoom){
        imageDataURL = canvasImageFetch.toDataURL()

        socket.emit('startGame', imageDataURL, width, height);
    }
})
    
//// Écouter les événements du serveur ////
socket.on('roomCreated', (roomID) => {
    makingInvisibleClass(menu)
    makingVisibleClass(roomMenu)
    makingInvisibleClass(buttonStartGame)

    numberOfPlayerTextClass.classList.add("hidden")
    numberOfPlayerClass.classList.remove("hidden")
    timerTextClass.classList.add("hidden")
    timerSelectClass.classList.remove("hidden")
    precisionTextClass.classList.add("hidden")
    precisionSelectClass.classList.remove("hidden")
    toleranceTextClass.classList.add("hidden")
    toleranceSelectClass.classList.remove("hidden")
    widthTextClass.classList.add("hidden")
    widthSelectClass.classList.remove("hidden")
    heightTextClass.classList.add("hidden")
    heightSelectClass.classList.remove("hidden")
    categoryTextClass.classList.add("hidden")
    categorySelectClass.classList.remove("hidden")

    currentRoomID = roomID
    nameRoomId.textContent = roomID
    allclientsInRoom.push(currentNamePlayer)

    const newParagraph = document.createElement('p');
    newParagraph.textContent = currentNamePlayer
    player.appendChild(newParagraph)
});

socket.on('roomJoined', (clientsInRoom, namePlayerJoin) => {
    makingInvisibleClass(menu)
    makingVisibleClass(roomMenu)

    if(currentNamePlayer != namePlayerJoin){
        allclientsInRoom.push(namePlayerJoin)
        
        socket.emit('sendPlayersInRoom', allclientsInRoom, clientsInRoom[0], 
        timerDuration, numberOfPlayerRoom, precision, tolerance, width, height, category);
    }
    else{
        currentRoomID = clientsInRoom[0]
        nameRoomId.textContent = clientsInRoom[0]
        makingInvisibleClass(buttonStartGame)
        makingVisibleClass(roomMenu)

        numberOfPlayerClass.classList.add("hidden")
        numberOfPlayerTextClass.classList.remove("hidden")
        timerSelectClass.classList.add("hidden")
        timerTextClass.classList.remove("hidden")
        precisionSelectClass.classList.add("hidden")
        precisionTextClass.classList.remove("hidden")
        toleranceSelectClass.classList.add("hidden")
        toleranceTextClass.classList.remove("hidden")
        widthSelectClass.classList.add("hidden")
        widthTextClass.classList.remove("hidden")
        heightSelectClass.classList.add("hidden")
        heightTextClass.classList.remove("hidden")
        categorySelectClass.classList.add("hidden")
        categoryTextClass.classList.remove("hidden")

        fetchImageButtonClass.classList.add("hidden")
    }

    console.log('Room joined:', clientsInRoom[0]);
});

socket.on("roomLeaved", (namePlayerLeaved) => {
    if(allclientsInRoom != undefined && allclientsInRoom.length >= 1){
        allclientsInRoom = removePlayerFromArray(allclientsInRoom, namePlayerLeaved)

        player.innerHTML = ''
        for(let i = 0; i < allclientsInRoom.length; i++){
            const newParagraph = document.createElement('p');
            newParagraph.textContent = allclientsInRoom[i]
            player.appendChild(newParagraph)
        }
    }
})

socket.on("sendedPlayersInRoom", (allclientsInRoomSended, currentTimer,
     numberOfPlayerRoomSended, currentPrecision, currentTolerance, currentWidth, currentHeight, currentCategory) => {
    numberOfPlayerRoom = numberOfPlayerRoomSended
    numberOfPlayerText.textContent = numberOfPlayerRoomSended
    timerDuration = currentTimer
    timerText.textContent = currentTimer
    precision = currentPrecision
    precisionText.textContent = currentPrecision
    tolerance = currentTolerance
    toleranceText.textContent = currentTolerance

    width = currentWidth
    widthText.textContent = currentWidth
    height = currentHeight
    heightText.textContent = currentHeight
    category = currentCategory
    if(currentCategory == ""){
        categoryText.textContent = "Tous"
    }else if(currentCategory == "nature"){
        categoryText.textContent = "Nature"
    }else if(currentCategory == "city"){
        categoryText.textContent = "Ville"
    }else if(currentCategory == "technology"){
        categoryText.textContent = "Technologie"
    }else if(currentCategory == "food"){
        categoryText.textContent = "Nourriture"
    }else if(currentCategory == "still_life"){
        categoryText.textContent = "Nature morte"
    }else if(currentCategory == "abstract"){
        categoryText.textContent = "Art abstrait"
    }else if(currentCategory == "wildlife"){
        categoryText.textContent = "Vie sauvage"
    }

    player.innerHTML = ''
    allclientsInRoom = allclientsInRoomSended
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

socket.on("precisionChanged", (precisionChanged) => {
    precision = precisionChanged
    precisionText.textContent = precisionChanged
})

socket.on("toleranceChanged", (toleranceChanged) => {
    tolerance = toleranceChanged
    toleranceText.textContent = toleranceChanged
})

socket.on("widthChanged", (widthChanged) => {
    width = widthChanged
    widthText.textContent = widthChanged
    canvas.width = widthChanged
    canvasImageFetch.width = widthChanged
    canvasImageFetchResult.width = widthChanged
    canvasPlayer1.width = widthChanged
    canvasPlayer2.width = widthChanged
    canvasPlayer3.width = widthChanged
    canvasPlayer4.width = widthChanged
    canvasPlayer5.width = widthChanged
    canvasPlayer6.width = widthChanged
    canvasPlayer7.width = widthChanged
    canvasPlayer8.width = widthChanged
})

socket.on("heightChanged", (heightChanged) => {
    height = heightChanged
    heightText.textContent = heightChanged
    canvas.height = heightChanged
    canvasImageFetch.height = heightChanged
    canvasImageFetchResult.height = heightChanged
    canvasPlayer1.height = heightChanged
    canvasPlayer2.height = heightChanged
    canvasPlayer3.height = heightChanged
    canvasPlayer4.height = heightChanged
    canvasPlayer5.height = heightChanged
    canvasPlayer6.height = heightChanged
    canvasPlayer7.height = heightChanged
    canvasPlayer8.height = heightChanged
})

socket.on("categoryChanged", (categoryChanged) => {
    category = categoryChanged
    if(categoryChanged == ""){
        categoryText.textContent = "Tous"
    }else if(categoryChanged == "nature"){
        categoryText.textContent = "Nature"
    }else if(categoryChanged == "city"){
        categoryText.textContent = "Ville"
    }else if(categoryChanged == "technology"){
        categoryText.textContent = "Technologie"
    }else if(categoryChanged == "food"){
        categoryText.textContent = "Nourriture"
    }else if(categoryChanged == "still_life"){
        categoryText.textContent = "Nature morte"
    }else if(categoryChanged == "abstract"){
        categoryText.textContent = "Art abstrait"
    }else if(categoryChanged == "wildlife"){
        categoryText.textContent = "Vie sauvage"
    }
})

socket.on("gameStarted", (imageURL, widthForGame, heightForGame) => {
    convertURLToImage(imageURL, contextImageFetch)
    convertURLToImage(imageURL, contextImageFetchResult)

    //Je suis obliger de modifier la taille du canvas des invités ici et pas au moment de sendedPlayersInRoom car cela
    //me faisait disparaitre mon image fetcher du canvas et le remetter blanc. Cela envoyer donc une image blanche aux invités.
    canvas.width = widthForGame
    canvasImageFetch.width = widthForGame
    canvasImageFetchResult.width = widthForGame
    canvasPlayer1.width = widthForGame
    canvasPlayer2.width = widthForGame
    canvasPlayer3.width = widthForGame
    canvasPlayer4.width = widthForGame
    canvasPlayer5.width = widthForGame
    canvasPlayer6.width = widthForGame
    canvasPlayer7.width = widthForGame
    canvasPlayer8.width = widthForGame

    canvas.height = heightForGame
    canvasImageFetch.height = heightForGame
    canvasImageFetchResult.height = heightForGame
    canvasPlayer1.height = heightForGame
    canvasPlayer2.height = heightForGame
    canvasPlayer3.height = heightForGame
    canvasPlayer4.height = heightForGame
    canvasPlayer5.height = heightForGame
    canvasPlayer6.height = heightForGame
    canvasPlayer7.height = heightForGame
    canvasPlayer8.height = heightForGame

    makingInvisibleClass(roomMenu)
    makingVisibleClass(game)

    const playerClasses = [ resultPlayer1Class, resultPlayer2Class ,resultPlayer3Class, resultPlayer4Class, 
        resultPlayer5Class, resultPlayer6Class, resultPlayer7Class, resultPlayer8Class];
    
    // Supprimer la classe "hidden" pour tous les éléments
    playerClasses.forEach(playerClass => playerClass.classList.remove("hidden"));
    
    // Ajouter la classe "hidden" pour les éléments excédant le nombre de joueurs dans la salle
    for (let i = numberOfPlayerRoom; i < playerClasses.length; i++) {
        playerClasses[i].classList.add("hidden");
    }

    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    timerInterval = setInterval(updateTimerGame, 1000)
})

socket.on("elapsedTime", (imageDataURL, User) => {
    makingInvisibleClass(game)
    makingVisibleClass(finalResult)
    
    const progressBars = [progressBarPlayer1, progressBarPlayer2, progressBarPlayer3, progressBarPlayer4, progressBarPlayer5, progressBarPlayer6, progressBarPlayer7, progressBarPlayer8];
 
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

    for (let i = 0; i < progressBars.length; i++) {
        updateProgressBar(0, progressBars[i]);
    }

    // Démarrer le timer pour calculer les résultats
    // Le if est là car j'ai huits envois du socket "elapsedTime" et donc mon setInterval qui ce lance huits fois.
    // Ce qui permet de le limiter à le lancer 1 fois.
    if(loadCanvas1 == true && loadCanvas2 == true && loadCanvas3 == true && loadCanvas4 == true
    && loadCanvas5 == true && loadCanvas6 == true && loadCanvas7 == true && loadCanvas8 == true){
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

////Game
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

// Événement pour définir la précision
precisionSelect.addEventListener("change", () => {
    precision = precisionSelect.value

    socket.emit('precisionChange', precision);
})

// Événement pour définir la tolérance
toleranceSelect.addEventListener("change", () => {
    tolerance = toleranceSelect.value

    socket.emit('toleranceChange', tolerance);
})

////Canvas
// Événement pour définir la longueur
widthSelect.addEventListener("change", () => {
    width = widthSelect.value

    socket.emit('widthChange', width);
})

// Événement pour définir la largeur
heightSelect.addEventListener("change", () => {
    height = heightSelect.value

    socket.emit('heightChange', height);
})

// Événement pour définir la categorie
categorySelect.addEventListener("change", () => {
    category = categorySelect.value

    socket.emit('categoryChange', category);
})

//////Div resultat final
const updateTimerGame = () => {
    // Afficher le temps restant
    timer.textContent = "Timer: " + timerDuration

    // Vérifier si le timer est écoulé
    if (timerDuration === 0) {
        clearInterval(timerInterval); // Arrêter le timer

        let imageDataURL = canvas.toDataURL()
        const namePlayers = [namePlayer1, namePlayer2, namePlayer3, namePlayer4, namePlayer5, namePlayer6, namePlayer7, namePlayer8];

        for (let i = 0; i < allclientsInRoom.length; i++) {
            namePlayers[i].textContent = allclientsInRoom[i];
        }

        socket.emit('endOfTimer', imageDataURL, currentRoomID);

        console.log("Le temps est écoulé !");
    } else {
        timerDuration--; // Décrémenter le temps restant
    }
}

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
        compareWithPrecision(precision, resultPlayer1, resultPlayer2, resultPlayer3,resultPlayer4,resultPlayer5,resultPlayer6,resultPlayer7,resultPlayer8)
        console.log("Résultat final afficher!")

    } else {
        timerDurationFinalResult--; // Décrémenter le temps restant
    }
}

//Partie du code pour comparer les deux images
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

    samePixelText.textContent = 'Pourcentage de pixels identiques: ' + samePercentage.toFixed(precision) + '%'
    return samePercentage.toFixed(precision)
}

const updateProgressBar = (progress, progressBarID) => {
    // Assurez-vous que la valeur de progression est entre 0 et 100
    if (progress >= 0 && progress <= 100) {
      // Mettre à jour la largeur de la barre de progression en pourcentage
      progressBarID.style.width = progress + '%';
    }
}

const compareWithPrecision = (precision, ...values) => {
    let maxValue1 = -Infinity;
    let maxIndex1 = -1;
    let maxValue2 = -Infinity;
    let maxIndex2 = -1;

    values.forEach((value, index) => {
        const roundedValue = Math.round(value * 10 ** precision);
        if (roundedValue > maxValue1) {
            maxValue2 = maxValue1;
            maxIndex2 = maxIndex1;
            maxValue1 = roundedValue;
            maxIndex1 = index;
        } else if (roundedValue > maxValue2) {
            maxValue2 = roundedValue;
            maxIndex2 = index;
        }
    });

    if (maxValue1 === maxValue2) {
        winnerText.textContent = "Égalité";
    } else {
        winnerText.textContent = allclientsInRoom[maxIndex1];
    }
}

returnMenu.addEventListener('click', () => {
    makingInvisibleClass(finalResult)
    makingVisibleClass(menu)
    makingVisibleClass(buttonStartGame)

    resetVariables()

    socket.emit('leaveRoom', currentRoomID, currentNamePlayer)
})

//Autres fonctions
const removePlayerFromArray = (array, stringToRemove) => {
    const index = array.indexOf(stringToRemove);
    if (index !== -1) {
        array.splice(index, 1); // Supprimer l'élément trouvé à l'index
        return array
    }
}

const makingVisibleClass = (className) => {
    className.classList.add('flex');
    className.classList.remove('hidden');
}

const makingInvisibleClass = (className) => {
    className.classList.add('hidden');
    className.classList.remove('flex');
}