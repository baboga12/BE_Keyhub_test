// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const service = require('./services');
const http = require('http');
const { Server } = require("socket.io");
const schedule = require('node-schedule');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let users = [];



const addUser = (id, socketId) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    users.push({ id, socketId });
    return true;
  }
  users[index].socketId = socketId;
  return true;
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

io.on("connection", (socket) => {
  socket.on("addUser", ({ userId }) => {
    console.log("Add user in socket Success " + userId + " - ", socket.id);
    if (addUser(userId, socket.id)) {
      io.emit("getUsers", users);
    }
  });
  socket.on("sendMessage", ({ fromUser, toUser, text }) => {
    console.log({ fromUser,toUser, text });
    const user = getUser(toUser);
    io.to(user?.socketId).emit("getMessage", {
      fromUser,
      toUser,
      text,
    });
    console.log("Send message to socket Success");
  });
//   socket.on("sendMessage", async ({ fromUser, toUser, text, chatId }) => {
//     console.log({ fromUser, toUser, text, chatId });
//     const group = await Service.findChatById(toUser);
//     if (group.isGroup) {
//         if (!group) {   
//             console.log("Group not found");
//             return;
//         }
//         group.listUser.forEach(async (userId) => {
//             const user = getUser(userId);
//             if (user) {              
//                 io.to(user.socketId).emit("getMessage", {
//                     fromUser,
//                     toUser: user._id,
//                     text,
//                 });
//             }
//         });
//     } else {
//         const user = getUser(toUser);
//         if (user) {
//             io.to(user.socketId).emit("getMessage", {
//                 fromUser,
//                 toUser,
//                 text,
//             });
//         } else {
//             console.log("User not found");
//         }
//     }
//     console.log("Send message to socket Success");
// });
  socket.on("interaction", ({ fromUser, toUser,type, data }) => {
    console.log(`User ${fromUser} interacts with user ${toUser}`);
    if (fromUser === toUser) {
      console.log("The same user is interacting with itself. No need to send socket.");
      return; 
    }
    const recipientSocket = getUser(toUser)?.socketId;
    if (recipientSocket) {
      console.log("User receiver is online.");
      io.to(recipientSocket).emit("notification", {fromUser, toUser,type, data});
    }
    else{ console.log("User receiver is not online.");
  }
  });

  socket.on("disconnect", () => {
    console.log("User disconnect: ", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(cors());
app.use(bodyParser.json());
routes(app);

mongoose.connect(`${process.env.Mongo_DB}`, {
  dbName: 'Keyhub',
  user: 'Baboga12',
  pass: 'DWtxXsixg7KtOun0',
}).then(() => {
  console.log('Connected to Mongo');  
});

const job = schedule.scheduleJob('59 23 * * *', () => {
  console.log('Running scheduled task at 23:59:59');
  console.log('--------------------------------------------------------------------------------------------------------------------');
  service.adminService.autoFilterBlog();
});


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log('Server is running on port ' + port);
});
