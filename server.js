const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatRoutes = require('./app/routes/chat');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Gunakan middleware untuk menangani rute chat
app.use('/', chatRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
