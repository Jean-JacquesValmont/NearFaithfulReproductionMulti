const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// Définir le type MIME pour les fichiers JavaScript
app.get('/scriptVariables.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptVariables.js'));
});

app.get('/scriptSocketClient.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptSocketClient.js'));
});

app.get('/scriptRoomMenu.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptRoomMenu.js'));
});

app.get('/scriptGame.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptGame.js'));
});

app.get('/scriptResultFinal.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptResultFinal.js'));
});

app.get('/scriptOtherFunctions.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptOtherFunctions.js'));
});

// Définir le type MIME pour les fichiers css
app.get('/src/output.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(join(__dirname, 'src/output.css'));
});

app.get('/image/background_NFR.png', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(join(__dirname, 'image/background_NFR.png'));
});


io.on('connection', (socket) => {
  console.log('New client connected ', socket.id);

  socket.on('createRoom', () => {
      socket.join(socket.id)
      socket.emit("roomCreated", socket.id)
  });

  socket.on('joinRoom', (roomIdValue, namePlayerJoin) => {
    socket.join(roomIdValue)
    console.log("Join room ID server:", roomIdValue)

    // Récupérer tous les identifiants des clients dans la salle
    const clientsInRoom = io.sockets.adapter.rooms.get(roomIdValue);
    if (clientsInRoom) {
      // Afficher les IDs des clients présents dans la salle
      console.log('IDs des clients dans la salle :', [...clientsInRoom]);
    } else {
      console.log('La salle est vide');
    }
    
    io.to(roomIdValue).emit("roomJoined", [...clientsInRoom], namePlayerJoin)
  });

  socket.on("leaveRoom", (roomID, namePlayerLeaved) => {
    const clientsInRoom = io.sockets.adapter.rooms.get(roomID);
    let arrayClientsInRoom = []
    if(clientsInRoom != undefined){
      arrayClientsInRoom = [...clientsInRoom]
    }

    if(arrayClientsInRoom[0] == socket.id){
      io.to(roomID).emit("roomLeaved", namePlayerLeaved) // On envois le socket avant que tous les joueurs ne soit plus dans la room sinon ils ne reçeveront pas.

      clientsInRoom.forEach(socketId => {
            io.sockets.sockets.get(socketId).leave(roomID);
      });
      delete clientsInRoom[roomID]; // Supprimer la salle de jeu de la liste des salles
      
    }else{
      console.log("namePlayerLeaved: ", namePlayerLeaved)
      socket.leave(roomID)
      io.to(roomID).emit("roomLeaved", namePlayerLeaved)
    }
  })

  socket.on('sendPlayersInRoom', (allClientsInRoom, roomID, timerDuration, numberOfPlayerRoom, 
    currentRound, currentPrecision, currentTolerance, currenvVictoryCondition, currentWidth, currentHeight, currentCategory) => {
    io.to(roomID).emit("sendedPlayersInRoom", allClientsInRoom, timerDuration, numberOfPlayerRoom,
     currentRound, currentPrecision, currentTolerance, currenvVictoryCondition, currentWidth, currentHeight, currentCategory)
  });

  socket.on("numberOfPlayerChange", (numberOfPlayerRoom) => {
    console.log("numberOfPlayerRoom: ", numberOfPlayerRoom)
    io.to(socket.id).emit("numberOfPlayerChanged", numberOfPlayerRoom);
  })

  socket.on("timerChange", (timerDuration) => {
    console.log("timerDuration: ", timerDuration)
    io.to(socket.id).emit("timerChanged", timerDuration);
  })

  socket.on("roundChange", (roundChanged) => {
    console.log("roundChanged: ", roundChanged)
    io.to(socket.id).emit("roundChanged", roundChanged);
  })

  socket.on("precisionChange", (precisionChanged) => {
    console.log("precisionChanged: ", precisionChanged)
    io.to(socket.id).emit("precisionChanged", precisionChanged);
  })

  socket.on("toleranceChange", (toleranceChanged) => {
    console.log("toleranceChanged: ", toleranceChanged)
    io.to(socket.id).emit("toleranceChanged", toleranceChanged);
  })

  socket.on("victoryConditionChange", (victoryConditionChanged) => {
    console.log("victoryConditionChanged: ", victoryConditionChanged)
    io.to(socket.id).emit("victoryConditionChanged", victoryConditionChanged);
  })

  socket.on("widthChange", (widthChanged) => {
    console.log("widthChanged: ", widthChanged)
    io.to(socket.id).emit("widthChanged", widthChanged);
  })

  socket.on("heightChange", (heightChanged) => {
    console.log("heightChanged: ", heightChanged)
    io.to(socket.id).emit("heightChanged", heightChanged);
  })

  socket.on("categoryChange", (categoryChanged) => {
    console.log("categoryChanged: ", categoryChanged)
    io.to(socket.id).emit("categoryChanged", categoryChanged);
  })

  socket.on("startGame", (imageURL, widthForGame, heightForGame) => {
    io.to(socket.id).emit("gameStarted", imageURL, widthForGame, heightForGame);
  });

  socket.on("endOfTimer", (URL, roomId) => {
    let User = 0
    const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
    const arrayClientsInRoom = [...clientsInRoom]
    console.log(arrayClientsInRoom)

    if(socket.id == arrayClientsInRoom[0]){
      io.to(socket.id).emit("elapsedTime", URL, User)
    }
    else{
      for(let i=0; i < arrayClientsInRoom.length; i++ ){
        if(socket.id == arrayClientsInRoom[i]){
          User = i
          io.to(arrayClientsInRoom[0]).emit("elapsedTime", URL, User)
        }
      }
    }
  })

  socket.on("nextRound", (timerForNextRound, imageURL) => {
    io.to(socket.id).emit("nextRoundStart", timerForNextRound, imageURL)
  })

  socket.on('disconnect', () => {
      console.log('Client disconnected ', socket.id);
  });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});