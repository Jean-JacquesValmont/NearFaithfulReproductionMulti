//Autres fonctions
window.onload = function() {
    // Votre fonction JavaScript à exécuter lorsque la page est chargée
    resetVariables()
};

const goodMessageFetchImage = (className, idName) => {
    className.classList.add("text-white")
    className.classList.remove("hidden")
    idName.textContent = "L'image à correctement été chargée."
}

const errorMessageFetchImage = (className, idName) => {
    className.classList.add("text-red-500")
    className.classList.remove("hidden")
    idName.textContent = "Une erreur s'est produite lors de la récupération de l'image. Veuillez réessayer."
}

const searchingPlayerFromArray = (array, stringToSearch) => {
    for(let i = 0; i < array.length; i++){
        if(array[i] == stringToSearch){
            return true
        }
    }
    return false
}

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

const hiddenSelectOptionSection = (typeOfPerson) => {

    if(typeOfPerson == "host"){
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
    }
    else if(typeOfPerson == "guest"){
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
}

const errorMessageText = (message) => {
    errorMessage.textContent = message
    errorMessageClass.classList.remove('hidden');
}