//////Div resultat final
const updateTimerGame = () => {
    // Afficher le temps restant
    timer.textContent = "Timer: " + timerDuration

    // Vérifier si le timer est écoulé
    if (timerDuration === 0) {
        clearInterval(timerInterval); // Arrêter le timer

        let imageDataURL = canvas.toDataURL()
        const namePlayers = [namePlayer1, namePlayer2, namePlayer3, namePlayer4, namePlayer5, namePlayer6, namePlayer7, namePlayer8];

        for (let i = 0; i < allClientsInRoom.length; i++) {
            namePlayers[i].textContent = allClientsInRoom[i];
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

//Partie du code pour comparer les deux images pour savoir qui à gagner
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
    if(victoryCondition == "hight"){
        percentAveragePlayer1Class.classList.add("hidden")
        percentAveragePlayer2Class.classList.add("hidden")
        percentAveragePlayer3Class.classList.add("hidden")
        percentAveragePlayer4Class.classList.add("hidden")
        percentAveragePlayer5Class.classList.add("hidden")
        percentAveragePlayer6Class.classList.add("hidden")
        percentAveragePlayer7Class.classList.add("hidden")
        percentAveragePlayer8Class.classList.add("hidden")

        numberOfRoundWinPlayer1Class.classList.remove("hidden")
        numberOfRoundWinPlayer2Class.classList.remove("hidden")
        numberOfRoundWinPlayer3Class.classList.remove("hidden")
        numberOfRoundWinPlayer4Class.classList.remove("hidden")
        numberOfRoundWinPlayer5Class.classList.remove("hidden")
        numberOfRoundWinPlayer6Class.classList.remove("hidden")
        numberOfRoundWinPlayer7Class.classList.remove("hidden")
        numberOfRoundWinPlayer8Class.classList.remove("hidden")

        victoryByHighPercentage(precision, ...values)
    }else if(victoryCondition == "average"){
        numberOfRoundWinPlayer1Class.classList.add("hidden")
        numberOfRoundWinPlayer2Class.classList.add("hidden")
        numberOfRoundWinPlayer3Class.classList.add("hidden")
        numberOfRoundWinPlayer4Class.classList.add("hidden")
        numberOfRoundWinPlayer5Class.classList.add("hidden")
        numberOfRoundWinPlayer6Class.classList.add("hidden")
        numberOfRoundWinPlayer7Class.classList.add("hidden")
        numberOfRoundWinPlayer8Class.classList.add("hidden")

        percentAveragePlayer1Class.classList.remove("hidden")
        percentAveragePlayer2Class.classList.remove("hidden")
        percentAveragePlayer3Class.classList.remove("hidden")
        percentAveragePlayer4Class.classList.remove("hidden")
        percentAveragePlayer5Class.classList.remove("hidden")
        percentAveragePlayer6Class.classList.remove("hidden")
        percentAveragePlayer7Class.classList.remove("hidden")
        percentAveragePlayer8Class.classList.remove("hidden")

        victoryByAveragePercentage(precision, ...values)
    }
}

const victoryByHighPercentage = (precision, ...values) => {
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
        winnerText.textContent = allClientsInRoom[maxIndex1];
        if(maxIndex1 == 0){
            roundWinPlayer1 += 1
            numberOfRoundWinPlayer1.textContent = "Round win: " + roundWinPlayer1
        }else if(maxIndex1 == 1){
            roundWinPlayer2 += 1
            numberOfRoundWinPlayer2.textContent = "Round win: " + roundWinPlayer2
        }else if(maxIndex1 == 2){
            roundWinPlayer3 += 1
            numberOfRoundWinPlayer3.textContent = "Round win: " + roundWinPlayer3
        }else if(maxIndex1 == 3){
            roundWinPlayer4 += 1
            numberOfRoundWinPlayer4.textContent = "Round win: " + roundWinPlayer4
        }else if(maxIndex1 == 4){
            roundWinPlayer5 += 1
            numberOfRoundWinPlayer5.textContent = "Round win: " + roundWinPlayer5
        }else if(maxIndex1 == 5){
            roundWinPlayer6 += 1
            numberOfRoundWinPlayer6.textContent = "Round win: " + roundWinPlayer6
        }else if(maxIndex1 == 6){
            roundWinPlayer7 += 1
            numberOfRoundWinPlayer7.textContent = "Round win: " + roundWinPlayer7
        }else if(maxIndex1 == 7){
            roundWinPlayer8 += 1
            numberOfRoundWinPlayer8.textContent = "Round win: " + roundWinPlayer8
        }
    }

    if(round == roundWinPlayer1 || round == roundWinPlayer2 || round == roundWinPlayer3 || round == roundWinPlayer4 
    || round == roundWinPlayer5 || round == roundWinPlayer6 || round == roundWinPlayer7 || round == roundWinPlayer8){
        fetchImageButtonRoundClass.classList.add("hidden")
        returnMenuClass.classList.remove("hidden")
    }else{
        currentRound += 1 
        roundGame.textContent = "Manche: " + currentRound
    }
}

const victoryByAveragePercentage = (precision, ...values) => {
    
    //Reset sinon la manche précédente se cumule.
    percentageAveragePlayer1 = 0
    percentageAveragePlayer2 = 0
    percentageAveragePlayer3 = 0
    percentageAveragePlayer4 = 0
    percentageAveragePlayer5 = 0
    percentageAveragePlayer6 = 0
    percentageAveragePlayer7 = 0
    percentageAveragePlayer8 = 0

    percentageArrayPlayer1.push(parseFloat(values[0]))
    percentageArrayPlayer2.push(parseFloat(values[1]))
    percentageArrayPlayer3.push(parseFloat(values[2]))
    percentageArrayPlayer4.push(parseFloat(values[3]))
    percentageArrayPlayer5.push(parseFloat(values[4]))
    percentageArrayPlayer6.push(parseFloat(values[5]))
    percentageArrayPlayer7.push(parseFloat(values[6]))
    percentageArrayPlayer8.push(parseFloat(values[7]))

    for(let i=0; i < percentageArrayPlayer1.length; i++){
        percentageAveragePlayer1 += percentageArrayPlayer1[i]
    }
    for(let i=0; i < percentageArrayPlayer2.length; i++){
        percentageAveragePlayer2 += percentageArrayPlayer2[i]
    }
    for(let i=0; i < percentageArrayPlayer3.length; i++){
        percentageAveragePlayer3 += percentageArrayPlayer3[i]
    }
    for(let i=0; i < percentageArrayPlayer4.length; i++){
        percentageAveragePlayer4 += percentageArrayPlayer4[i]
    }
    for(let i=0; i < percentageArrayPlayer5.length; i++){
        percentageAveragePlayer5 += percentageArrayPlayer5[i]
    }
    for(let i=0; i < percentageArrayPlayer6.length; i++){
        percentageAveragePlayer6 += percentageArrayPlayer6[i]
    }
    for(let i=0; i < percentageArrayPlayer7.length; i++){
        percentageAveragePlayer7 += percentageArrayPlayer7[i]
    }
    for(let i=0; i < percentageArrayPlayer8.length; i++){
        percentageAveragePlayer8 += percentageArrayPlayer8[i]
    }

    percentageAveragePlayer1 = percentageAveragePlayer1/percentageArrayPlayer1.length
    percentageAveragePlayer2 = percentageAveragePlayer2/percentageArrayPlayer2.length
    percentageAveragePlayer3 = percentageAveragePlayer3/percentageArrayPlayer3.length
    percentageAveragePlayer4 = percentageAveragePlayer4/percentageArrayPlayer4.length
    percentageAveragePlayer5 = percentageAveragePlayer5/percentageArrayPlayer5.length
    percentageAveragePlayer6 = percentageAveragePlayer6/percentageArrayPlayer6.length
    percentageAveragePlayer7 = percentageAveragePlayer7/percentageArrayPlayer7.length
    percentageAveragePlayer8 = percentageAveragePlayer8/percentageArrayPlayer8.length

    percentAveragePlayer1.textContent = "Pourcentage moyen: " + percentageAveragePlayer1
    percentAveragePlayer2.textContent = "Pourcentage moyen: " + percentageAveragePlayer2
    percentAveragePlayer3.textContent = "Pourcentage moyen: " + percentageAveragePlayer3
    percentAveragePlayer4.textContent = "Pourcentage moyen: " + percentageAveragePlayer4
    percentAveragePlayer5.textContent = "Pourcentage moyen: " + percentageAveragePlayer5
    percentAveragePlayer6.textContent = "Pourcentage moyen: " + percentageAveragePlayer6
    percentAveragePlayer7.textContent = "Pourcentage moyen: " + percentageAveragePlayer7
    percentAveragePlayer8.textContent = "Pourcentage moyen: " + percentageAveragePlayer8

    if(round == currentRound){
        let maxValue1 = -Infinity;
        let maxIndex1 = -1;
        let maxValue2 = -Infinity;
        let maxIndex2 = -1;

        let percentageAverageAllPlayer = [percentageAveragePlayer1,percentageAveragePlayer2,percentageAveragePlayer3,
            percentageAveragePlayer4,percentageAveragePlayer5,percentageAveragePlayer6,percentageAveragePlayer7,percentageAveragePlayer8]
            console.log("percentageAverageAllPlayer: ",percentageAverageAllPlayer)
        percentageAverageAllPlayer.forEach((value, index) => {
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
            winnerText.textContent = allClientsInRoom[maxIndex1];
        }

        fetchImageButtonRoundClass.classList.add("hidden")
        returnMenuClass.classList.remove("hidden")
    }else{
        currentRound += 1
        roundGame.textContent = "Manche: " + currentRound
        
    }
}

//Partie pour une autre manche ou retourner au menu
fetchImageButtonRound.addEventListener("click", async () => {
    fetchImageButtonRound.disabled = true
    await fetchImage("fetchImageMessageButton")
    makingVisibleClass(nextRound)
})

nextRound.addEventListener("click", () => {
    fetchImageButtonRound.disabled = false
    fetchImageButtonRoundClass.classList.remove("hidden")
    makingInvisibleClass(nextRound)
    const timerForNextRound = timerSelect.value
    imageDataURL = canvasImageFetch.toDataURL()

    socket.emit("nextRound", timerForNextRound, imageDataURL)
})

returnMenu.addEventListener('click', () => {
    makingInvisibleClass(finalResult)
    makingVisibleClass(menu)
    makingVisibleClass(buttonStartGame)
    returnMenuClass.classList.add("hidden")

    resetVariables()

    socket.emit('leaveRoom', currentRoomID, currentNamePlayer)
})
