const io = require('socket.io')();

// Event listener untuk koneksi socket
io.on('connection', function(socket) {
    socket.broadcast.emit('newMessage', 'seseorang sedang konek');

    // Event listener untuk pesan baru
    socket.on('newMessage', function(msg) {
        io.emit('newMessage', msg);
        console.log('chat baru' + msg);
    });

    // Event listener untuk diskoneksi
    socket.on('disconnect', function() {
        socket.broadcast.emit('newMessage', 'seseorang sedang diskonek');
    });
});

module.exports = io;
