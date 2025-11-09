const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Emmagatzemem els usuaris connectats: socketId -> {nickname, room}
const users = new Map();

// Sales disponibles
const rooms = ["General", "Tecnologia", "Esports", "Música"];

// Funció per generar un ID únic per a una sala privada (sempre el mateix ordre)
function getPrivateRoomId(user1, user2) {
  return [user1, user2].sort().join("__private__");
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/indexMillorat.html");
});

// Funció per obtenir usuaris d'una sala específica
function getUsersInRoom(room) {
  const usersInRoom = [];
  users.forEach((userData, socketId) => {
    if (userData.room === room) {
      usersInRoom.push({
        id: socketId,
        nickname: userData.nickname
      });
    }
  });
  return usersInRoom;
}

io.on("connection", (socket) => {
  console.log("Un usuari s'ha connectat");

  // Quan un usuari estableix el seu nickname i sala
  socket.on("set nickname", (data) => {
    const nickname = data.nickname;
    const room = data.room || "General";
    
    users.set(socket.id, { nickname, room });
    
    // L'usuari s'uneix a la sala
    socket.join(room);
    
    // Notifiquem a tots els usuaris de la sala que algú ha entrat
    socket.to(room).emit("user joined", nickname);
    
    // Enviem la llista actualitzada d'usuaris de la sala
    const usersInRoom = getUsersInRoom(room);
    io.to(room).emit("user list", usersInRoom);
    
    // Enviem la llista de sales disponibles
    socket.emit("room list", rooms);
    
    console.log(`${nickname} s'ha unit a la sala ${room}`);
  });

  // Quan un usuari canvia de sala
  socket.on("change room", (newRoom) => {
    const userData = users.get(socket.id);
    if (!userData) return;
    
    const oldRoom = userData.room;
    const nickname = userData.nickname;
    
    // Sortim de la sala antiga
    socket.leave(oldRoom);
    socket.to(oldRoom).emit("user left", nickname);
    
    // Actualitzem la sala de l'usuari
    userData.room = newRoom;
    users.set(socket.id, userData);
    
    // Entrem a la nova sala
    socket.join(newRoom);
    socket.to(newRoom).emit("user joined", nickname);
    
    // Actualitzem les llistes d'usuaris de les dues sales
    io.to(oldRoom).emit("user list", getUsersInRoom(oldRoom));
    io.to(newRoom).emit("user list", getUsersInRoom(newRoom));
    
    // Notifiquem al client que ha canviat de sala
    socket.emit("room changed", newRoom);
    
    console.log(`${nickname} ha canviat de ${oldRoom} a ${newRoom}`);
  });

  // Quan un usuari envia un missatge a la sala
  socket.on("chat message", (data) => {
    const userData = users.get(socket.id);
    if (!userData) return;
    
    socket.to(userData.room).emit("chat message", {
      nickname: data.nickname,
      message: data.message
    });
  });

  // Quan un usuari envia un missatge privat
  socket.on("private message", (data) => {
    const userData = users.get(socket.id);
    if (!userData) return;
    
    let recipientSocketId = null;
    users.forEach((user, socketId) => {
      if (user.nickname === data.to && user.room === userData.room) {
        recipientSocketId = socketId;
      }
    });
    
    if (recipientSocketId) {
      // Creem una sala privada única per aquests dos usuaris
      const privateRoomId = getPrivateRoomId(data.from, data.to);
      
      // Ambdós usuaris s'uneixen a la sala privada (si no hi són ja)
      socket.join(privateRoomId);
      io.sockets.sockets.get(recipientSocketId).join(privateRoomId);
      
      // Enviem el missatge a la sala privada (ambdós usuaris el rebran)
      io.to(privateRoomId).emit("private message", {
        from: data.from,
        to: data.to,
        message: data.message,
        senderId: socket.id
      });
    } else {
      // Si l'usuari no existeix o no està a la mateixa sala, notifiquem l'error
      socket.emit("private message error", {
        to: data.to,
        message: "L'usuari no està disponible a aquesta sala"
      });
    }
  });

  // Quan un usuari està escrivint
  socket.on("typing", (nickname) => {
    const userData = users.get(socket.id);
    if (!userData) return;
    
    socket.to(userData.room).emit("typing", nickname);
  });

  // Quan un usuari deixa d'escriure
  socket.on("stop typing", () => {
    const userData = users.get(socket.id);
    if (!userData) return;
    
    socket.to(userData.room).emit("stop typing");
  });

  // Quan un usuari es desconnecta
  socket.on("disconnect", () => {
    const userData = users.get(socket.id);
    if (userData) {
      const { nickname, room } = userData;
      users.delete(socket.id);
      
      // Notifiquem a la sala que l'usuari ha sortit
      socket.to(room).emit("user left", nickname);
      
      // Enviem la llista actualitzada d'usuaris de la sala
      io.to(room).emit("user list", getUsersInRoom(room));
      
      console.log(`${nickname} ha sortit del xat (sala ${room})`);
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor escoltant al port *:3000");
});