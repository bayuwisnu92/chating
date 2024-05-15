const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const chatRoutes = require('./app/routes/chatRoutes');
const userRoutes = require('./app/routes/userRoutes');

const chatController = require('./app/controllers/chatController');


const app = express();
app.use(express.json());
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

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