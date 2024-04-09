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
app.get('/script.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'script.js'));
});

app.get('/scriptGame.js', (req, res) => {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(join(__dirname, 'scriptGame.js'));
});

// Définir le type MIME pour les fichiers css
app.get('/src/output.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(join(__dirname, 'src/output.css'));
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
    socket.leave(roomID)
    console.log("Leave room ID server:", roomID)

    io.to(roomID).emit("roomLeaved", namePlayerLeaved)
  })

  socket.on('sendPlayersInRoom', (allclientsInRoom, roomID, timerDuration, numberOfPlayerRoom) => {
    io.to(roomID).emit("sendedPlayersInRoom", allclientsInRoom, timerDuration, numberOfPlayerRoom)
  });

  socket.on("numberOfPlayerChange", (numberOfPlayerRoom) => {
    console.log("numberOfPlayerRoom: ", numberOfPlayerRoom)
    io.to(socket.id).emit("numberOfPlayerChanged", numberOfPlayerRoom);
  })

  socket.on("timerChange", (timerDuration) => {
    console.log("timerDuration: ", timerDuration)
    io.to(socket.id).emit("timerChanged", timerDuration);
  })

  socket.on("startGame", (imageURL) => {
    io.to(socket.id).emit("gameStarted", imageURL);
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

  socket.on('disconnect', () => {
      console.log('Client disconnected ', socket.id);
  });
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});