const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatRoutes = require('./app/routes/chatRoutes');
const userRoutes = require('./app/routes/userRoutes');

const chatController = require('./app/controllers/chatController');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/chat', chatRoutes);
app.use('/user', userRoutes);


io.on('connection', chatController(io));

const PORT = process.env.PORT || 3000;
const HOST = "localhost"; 

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});