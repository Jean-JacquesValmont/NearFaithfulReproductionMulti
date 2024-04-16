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