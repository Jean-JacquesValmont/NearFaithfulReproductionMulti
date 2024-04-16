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

// Événement pour définir le nombre de manche
roundSelect.addEventListener("change", () => {
    round = roundSelect.value

    socket.emit('roundChange', round);
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

// Événement pour définir la condition de victoire
victoryConditionSelect.addEventListener("change", () => {
    victoryCondition = victoryConditionSelect.value

    socket.emit('victoryConditionChange', victoryCondition);
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
