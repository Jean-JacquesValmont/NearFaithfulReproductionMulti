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
    roundTextClass.classList.add("hidden")
    roundSelectClass.classList.remove("hidden")
    precisionTextClass.classList.add("hidden")
    precisionSelectClass.classList.remove("hidden")
    toleranceTextClass.classList.add("hidden")
    toleranceSelectClass.classList.remove("hidden")
    victoryConditionTextClass.classList.add("hidden")
    victoryConditionSelectClass.classList.remove("hidden")
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
        
        socket.emit('sendPlayersInRoom', allclientsInRoom, clientsInRoom[0], timerDuration, numberOfPlayerRoom, 
        round, precision, tolerance, victoryCondition, width, height, category);
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
        roundSelectClass.classList.add("hidden")
        roundTextClass.classList.remove("hidden")
        precisionSelectClass.classList.add("hidden")
        precisionTextClass.classList.remove("hidden")
        toleranceSelectClass.classList.add("hidden")
        toleranceTextClass.classList.remove("hidden")
        victoryConditionSelectClass.classList.add("hidden")
        victoryConditionTextClass.classList.remove("hidden")
        widthSelectClass.classList.add("hidden")
        widthTextClass.classList.remove("hidden")
        heightSelectClass.classList.add("hidden")
        heightTextClass.classList.remove("hidden")
        categorySelectClass.classList.add("hidden")
        categoryTextClass.classList.remove("hidden")

        fetchImageButtonClass.classList.add("hidden")

        fetchImageButtonRoundClass.classList.add("hidden")
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

socket.on("sendedPlayersInRoom", (allclientsInRoomSended, currentTimer, numberOfPlayerRoomSended,
     currentRound, currentPrecision, currentTolerance, currenvVictoryCondition, currentWidth, currentHeight, currentCategory) => {
    numberOfPlayerRoom = numberOfPlayerRoomSended
    numberOfPlayerText.textContent = numberOfPlayerRoomSended
    timerDuration = currentTimer
    timerText.textContent = currentTimer
    round = currentRound
    roundText.textContent = currentRound
    precision = currentPrecision
    precisionText.textContent = currentPrecision
    tolerance = currentTolerance
    toleranceText.textContent = currentTolerance

    victoryCondition = currenvVictoryCondition
    if(currenvVictoryCondition == "hight"){
        victoryConditionText.textContent = "Le plus haut pourcentage"
    }else if(currenvVictoryCondition == "average"){
        victoryConditionText.textContent = "Moyenne des pourcentages"
    }

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

socket.on("roundChanged", (roundChanged) => {
    round = roundChanged
    roundText.textContent = roundChanged
})

socket.on("precisionChanged", (precisionChanged) => {
    precision = precisionChanged
    precisionText.textContent = precisionChanged
})

socket.on("toleranceChanged", (toleranceChanged) => {
    tolerance = toleranceChanged
    toleranceText.textContent = toleranceChanged
})

socket.on("victoryConditionChanged", (victoryConditionChanged) => {
    victoryCondition = victoryConditionChanged
    if(victoryConditionChanged == "hight"){
        victoryConditionText.textContent = "Le plus haut pourcentage"
        optionNumberofRoundOne.disabled = false
        
    }else if(victoryConditionChanged == "average"){
        victoryConditionText.textContent = "Moyenne des pourcentages"
        optionNumberofRoundOne.disabled = true
        if(round == 1){
            roundSelect.value = 2
            roundText.textContent = 2
            round = 2
        } 
    }
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

socket.on("elapsedTime", (imageDataURLPlayer, User) => {
    convertURLToImage(imageDataURL, contextImageFetchResult)
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
        convertURLToImage(imageDataURLPlayer, contextPlayer1)
        loadCanvas1 = true
    }
    else if(User == 1) {
        convertURLToImage(imageDataURLPlayer, contextPlayer2)
        loadCanvas2 = true
    }
    else if(User == 2) {
        convertURLToImage(imageDataURLPlayer, contextPlayer3)
        loadCanvas3 = true
    }
    else if(User == 3) {
        convertURLToImage(imageDataURLPlayer, contextPlayer4)
        loadCanvas4 = true
    }
    else if(User == 4) {
        convertURLToImage(imageDataURLPlayer, contextPlayer5)
        loadCanvas5 = true
    }
    else if(User == 5) {
        convertURLToImage(imageDataURLPlayer, contextPlayer6)
        loadCanvas6 = true
    }
    else if(User == 6) {
        convertURLToImage(imageDataURLPlayer, contextPlayer7)
        loadCanvas7 = true
    }
    else if(User == 7) {
        convertURLToImage(imageDataURLPlayer, contextPlayer8)
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

socket.on("nextRoundStart", (timerForNextRound, imageURL) => {
    convertURLToImage(imageURL, contextImageFetch)
    convertURLToImage(imageURL, contextImageFetchResult)

    timerDuration = timerForNextRound
    timerDurationFinalResult = 3
    loadCanvas1 = false
    loadCanvas2 = false
    loadCanvas3 = false
    loadCanvas4 = false
    loadCanvas5 = false
    loadCanvas6 = false
    loadCanvas7 = false
    loadCanvas8 = false

    context.clearRect(0, 0, canvas.width, canvas.height);
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

    makingInvisibleClass(finalResult)
    makingVisibleClass(game)
    
    // Démarrer le timer et lancer la fonction updateTimer toutes les secondes
    timerInterval = setInterval(updateTimerGame, 1000)
})