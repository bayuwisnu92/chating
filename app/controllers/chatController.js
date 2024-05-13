module.exports = function(io) {
    return function(socket) {
        socket.broadcast.emit('newMessage', 'seseorang sedang konek');

        // Event listener untuk pesan baru
        socket.on('newMessage', function(msg) {
            io.emit('newMessage', msg); // Menggunakan io untuk broadcast ke semua client
            console.log('chat baru' + msg);
        });

        // Event listener untuk diskoneksi
        socket.on('disconnect', function() {
            socket.broadcast.emit('newMessage', 'seseorang sedang diskonek');
        });
    };
};
