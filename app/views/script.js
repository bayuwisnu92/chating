var socket = io();
var username = '';

$('form').submit(function(){
    username = $('#user_name').val();
    socket.emit('newMessage', $('#text_box').val());
    $('#text_box').val('');
    return false;
});

socket.on('newMessage', function(msg){
    $('#message').append($('<li>').text(username + ' '  + msg + ' ' + Date()));
});

$('#masuk').click(function(){
    $('#chatroom').removeClass('hidden');
    $('#homepage').addClass('hidden');
});
