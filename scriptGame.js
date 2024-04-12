const brushSizeSelect = document.getElementById('brushSizeSelect');
const toolSelect = document.getElementById('toolSelect');
const colorSelect = document.getElementById('colorSelect');
const clearAll = document.getElementById('clearAll');
const undoButton = document.getElementById('undoButton');

//// Variables initialisation
//Pour le dessin
let isDrawing = false;
let tool = "brush"
let lineWidthSize = 10
const brushShape = 'round'

let brushColor = '#000000'
brushSizeSelect.value = "10";
toolSelect.value = "brush"
colorSelect.style.backgroundColor = '#000000'

const colors = ['#FFFFFF', '#d1d5db', '#fca5a5', '#fdba74', '#fde047', '#86efac', '#67e8f9', '#93c5fd', '#d8b4fe', '#f9a8d4',
                '#77340e', '#687282', '#ea4646', '#f1731b', '#DDB216', '#21C362', '#05B4D3', '#3883F5', '#885BF5', '#E14C9D',
                '#000000', '#374151', '#b91c1c', '#c2410c', '#a16207', '#15803d', '#0e7490', '#1d4ed8', '#7e22ce', '#be185d'];

const colorButtons = colors.map(color => document.getElementById(`color${colors.indexOf(color)}`));

//Pour la comparasion des images
let randomImage = new Image()

let imageData1 = context.getImageData(0, 0, canvas.width, canvas.height);
let imageData2 = contextImageFetch.getImageData(0, 0, canvasImageFetch.width, canvasImageFetch.height);

let pixels1 = imageData1.data;
let pixels2 = imageData2.data;

// Déclarer une liste pour stocker les actions de dessin
const actions = [];

//Variables pour le fetch
let category = '';
let width = 500;
let height = 400;

// Fonction de dessin
const draw = (e) => {
    const rect = canvas.getBoundingClientRect(); // Obtenez les coordonnées du canvas par rapport à la fenêtre
    const mouseX = e.pageX - rect.left - window.scrollX; // Ajoutez le défilement horizontal
    const mouseY = e.pageY - rect.top - window.scrollY; // Ajoutez le défilement vertical

    if (!isDrawing) return;

    if (tool == "brush"){
        // Paramètres du trait
        context.lineWidth = lineWidthSize ;
        context.lineCap = brushShape;
        context.strokeStyle = brushColor; // Couleur du trait

        // Dessiner
        context.lineTo(mouseX, mouseY);
        context.stroke();
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    }
    else if(tool == "line"){
        context.lineWidth = lineWidthSize ;
        context.lineCap = brushShape;
        context.strokeStyle = brushColor; // Couleur du trait
        
        drawLine(startX, startY, mouseX, mouseY);
    }
    else if(tool == "paintBucket"){
        // paintBucket(mouseX, mouseY, brushColor)
        context.fillStyle = brushColor
        context.fillRect(0, 0, canvas.width, canvas.height)

    }
    else if(tool == "eraser"){
        context.lineWidth = lineWidthSize ;
        context.lineCap = brushShape;
        context.strokeStyle = '#FFFFFF';

        // Effacer avec la gomme
        context.lineTo(mouseX, mouseY);
        context.stroke();
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    }
}

// Ajoute un écouteur d'événements pour l'événement 'mouseenter'
canvas.addEventListener('mouseenter', () => {
    canvas.style.cursor = 'crosshair';
});

// Ajoute un écouteur d'événements pour l'événement 'mouseleave' pour réinitialiser le curseur lorsque tu sors du canvas
canvas.addEventListener('mouseleave', () => {
    canvas.style.cursor = 'default';
    isDrawing = false;
    context.beginPath(); // Commencer un nouveau chemin après avoir relâché le bouton de la souris
    recordAction();
});

// Événement pour commencer le dessin
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    if (tool == "line") {
        startX = e.pageX - canvas.offsetLeft;
        startY = e.pageY - canvas.offsetTop;
    }
    draw(e);
});

// Événement pour arrêter le dessin
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    context.beginPath(); // Commencer un nouveau chemin après avoir relâché le bouton de la souris
    recordAction();
});

// Événement pour dessiner
canvas.addEventListener('mousemove', draw);

// Événement pour définir la taille du pinceau
brushSizeSelect.addEventListener("change", () => {
    lineWidthSize = brushSizeSelect.value
})

// Événement pour définir l'outil utilisé
toolSelect.addEventListener("change", () => {
    tool = toolSelect.value
})

// Événement pour la couleur du pinceau
colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        for(let i = 0; i <= colors.length; i++){
            if (button.id == "color" + i){
                brushColor = colors[i];
                colorSelect.style.backgroundColor = colors[i]
                break
            }
        }
    });
});

const drawLine = (startX, startY, endX, endY) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
};

// Fonction pour effacer le canvas
const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Événement pour effacer tout le canvas
clearAll.addEventListener("click", clearCanvas)

// Fonction pour enregistrer une action de dessin
const recordAction = () => {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    actions.push(imageData);
}

// Fonction pour annuler la dernière action de dessin
const undo = () => {
    if (actions.length > 0) {
        actions.pop(); // Supprimer la dernière action de la liste
        redrawCanvas(); // Redessiner le canvas avec les actions restantes
    }
}

// Fonction pour redessiner le canvas avec les actions restantes dans la liste
const redrawCanvas = () => {
    clearCanvas(); // Effacer le canvas

    // Redessiner toutes les actions restantes
    actions.forEach(imageData => {
        context.putImageData(imageData, 0, 0);
    });
}

// Événement pour annuler la dernière action de dessin (par exemple, lorsqu'un bouton "Annuler" est cliqué)
undoButton.addEventListener('click', undo);

// Pour récupérer une image
const fetchImage = async () => {
    try {
        const apiKey = '1rIW4mEHWJeRPQR1vGtU+g==a0KWLUCB8HcKGCKs';

        // Faire la requête à l'API
        const response = await fetch(`https://api.api-ninjas.com/v1/randomimage?category=${category}&width=${width}&height=${height}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Accept': 'image/jpg'
            }
        });

        // Vérifier si la réponse est réussie (status code 200)
        if (!response.ok) {
            throw new Error('La requête a échoué : ' + response.status);
        }

        // Convertir la réponse en blob (image)
        const imageBlob = await response.blob();

        // Création d'une URL local avec le imageBlob récupéré
        const imageUrl = URL.createObjectURL(imageBlob);

        randomImage.src = imageUrl;

        randomImage.onload = function() {
            // Cette fonction est appelée lorsque l'image a été chargée
            contextImageFetch.drawImage(this,0,0); // this fait référence à l'objet courant (=image)
            contextImageFetchResult.drawImage(this,0,0);
          };

    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération de l\'image :', error);
    }
}

////// Test d'une fonctionnalité de pot de peinture en diffusion (pour remplacer l'autre fonction pot de peinture)
// // Fonction pour obtenir la couleur d'un pixel aux coordonnées (x, y)
// function getPixelColor(x, y) {
//     const imageData = context.getImageData(x, y, 1, 1);
//     const data = imageData.data;
//     return [data[0], data[1], data[2], data[3]]; // Retourne un tableau [R, G, B, A]
// }

// function hexToRGBA(hex, alpha) {
//     // Convertir la valeur hexadécimale en composantes R, G, B
//     const r = parseInt(hex.substring(1, 3), 16);
//     const g = parseInt(hex.substring(3, 5), 16);
//     const b = parseInt(hex.substring(5, 7), 16);

//     // Vérifier si une valeur alpha est fournie, sinon utiliser 1 (opacité totale)
//     const a = alpha || 255;

//     // Retourner la couleur au format RGBA
//     return [r, g, b, a];
// }

// // Fonction pour définir la couleur d'un pixel aux coordonnées (x, y)
// function setPixelColor(x, y, color) {
//     const imageData = context.createImageData(1, 1);
//     const data = imageData.data;
//     data[0] = color[0]; // R
//     data[1] = color[1]; // G
//     data[2] = color[2]; // B
//     data[3] = color[3]; // A
//     context.putImageData(imageData, x, y);
// }

// function fillHorizontal(x, y, canvas, newColorRGBA, direction) {
//     if(direction == 1){
//         for(let i = 1; i < canvas.width - x  ; i++){
//         let pixelColor = getPixelColor(x + i*direction, y)

//         if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//             && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//             break;
//         }
//         setPixelColor(x + i*direction, y, newColorRGBA)

//         fillHorizontal2(x, y, canvas, newColorRGBA, direction, i, 1, direction)
//         fillHorizontal2(x, y, canvas, newColorRGBA, direction, i, -1, direction)
//         }
//     }
//     else if(direction == -1){
//         for(let i = 1; i < x ; i++){
//             let pixelColor = getPixelColor(x + i*direction, y)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x + i*direction, y, newColorRGBA)
    
//             fillHorizontal2(x, y, canvas, newColorRGBA, direction, i, 1, direction)
//             fillHorizontal2(x, y, canvas, newColorRGBA, direction, i, -1, direction)
//         }
//     }
// }

// function fillHorizontal2(x, y, canvas, newColorRGBA, direction, i, direction2, direction3) {
//     if(direction2 == 1){
//         for(let j = 1; j < canvas.height - y ; j++){
//             let pixelColor = getPixelColor(x + i*direction, y + j*direction2)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x + i*direction, y + j*direction2, newColorRGBA)
    
//             fillHorizontal3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3)
//         }
//     }
//     else if(direction2 == -1){
//         for(let j = 1; j < y ; j++){
//             let pixelColor = getPixelColor(x + i*direction, y + j*direction2)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x + i*direction, y + j*direction2, newColorRGBA)
    
//             fillHorizontal3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3)
//         }
//     }
// }

// function fillHorizontal3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3) {
//     for(let k = 1; k < canvas.width - x + i*direction ; k++){
//         let pixelColor = getPixelColor(x + i*direction + k*direction3, y + j*direction2)

//         if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//             && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//             break;
//         }
//         setPixelColor(x + i*direction + k*direction3, y + j*direction2, newColorRGBA)
//     }
// }

// function fillVertical(x, y, canvas, newColorRGBA, direction) {
//     if(direction == 1){
//         for(let i = 1; i < canvas.height - y ; i++){
//             let pixelColor = getPixelColor(x, y + i*direction)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x, y + i*direction, newColorRGBA)
    
//             fillVertical2(x, y, canvas, newColorRGBA, direction, i, 1, direction)
//             fillVertical2(x, y, canvas, newColorRGBA, direction, i, -1, direction)
//         }
//     }
//     else if(direction == -1){
//         for(let i = 1; i < y ; i++){
//             let pixelColor = getPixelColor(x, y + i*direction)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x, y + i*direction, newColorRGBA)
    
//             fillVertical2(x, y, canvas, newColorRGBA, direction, i, 1, direction)
//             fillVertical2(x, y, canvas, newColorRGBA, direction, i, -1, direction)
//         }
//     }
// }

// function fillVertical2(x, y, canvas, newColorRGBA, direction, i, direction2, direction3) {
//     if(direction2 == 1){
//         for(let j = 1; j < canvas.width - x ; j++){
//             let pixelColor = getPixelColor(x + j*direction2, y + i*direction)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x + j*direction2, y + i*direction, newColorRGBA)
    
//             fillVertical3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3)
//         }
//     }
//     else if(direction2 == -1){
//         for(let j = 1; j < x ; j++){
//             let pixelColor = getPixelColor(x + j*direction2, y + i*direction)
    
//             if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//                 && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//                 break;
//             }
//             setPixelColor(x + j*direction2, y + i*direction, newColorRGBA)
    
//             fillVertical3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3)
//         }
//     } 
// }

// function fillVertical3(x, y, canvas, newColorRGBA, direction, i, direction2, j, direction3) {
//     for(let k = 1; k < canvas.height - y + i*direction ; k++){
//         let pixelColor = getPixelColor(x + j*direction2, y + i*direction + k*direction3)

//         if (pixelColor[0] === newColorRGBA[0] && pixelColor[1] === newColorRGBA[1]
//             && pixelColor[2] === newColorRGBA[2] && pixelColor[3] === newColorRGBA[3]) {
//             break;
//         }
//         setPixelColor(x + j*direction2, y + i*direction + k*direction3, newColorRGBA)
//     }
// }

// // Fonction de pot de peinture (remplissage par diffusion)
// function paintBucket(x, y, newColor) {
    
//     // Récupérer la couleur du pixel de départ
//     const startColor = getPixelColor(x, y);
//     const newColorRGBA = hexToRGBA(newColor)

//     // Vérifier si la nouvelle couleur est différente de la couleur de départ
//     if (startColor[0] === newColorRGBA[0] && startColor[1] === newColorRGBA[1]
//         && startColor[2] === newColorRGBA[2] && startColor[3] === newColorRGBA[3]) {
//         console.log("Même couleur de pixel que le pot de peinture")
//         return; // Arrêter si la nouvelle couleur est identique à la couleur de départ
//     }

//     setPixelColor(x, y, newColorRGBA)

//     fillHorizontal(x, y, canvas, newColorRGBA, 1); // fill to the right
//     fillHorizontal(x, y, canvas, newColorRGBA, -1); // fill to the left
//     fillVertical(x, y, canvas, newColorRGBA, -1); // fill to the Top
//     fillVertical(x, y, canvas, newColorRGBA, 1); // fill to the bottom
    
// }