/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";

const server = require('../server');
const io = require('socket.io')(server);

const chat = io.of('/chat');

console.log(' ---> origins', io.origins());

io.on('connection', socket => {
  console.log(' ---> connected', socket.id);
  //console.log(' ---> connected', socket.request);
  //console.log(' ---> connected', socket.handshake);
  io.clients((error, clients) => {
    console.log(' ---> ', clients);
  });

  io.in(socket.id).emit('chat message', { msg: `hi, ${socket.id}` });

  socket.join('room');

  io.in('room').emit('chat message', { msg: 'welcome in ROOM' });

  socket.on('disconnect', function () {
    console.log('user disconnected');
    io.clients((error, clients) => {
      console.log(' ---> after disconnected', clients.length);
    })
  });

  socket.on('chat message', response => {
    console.log(' ---> ', response.msg);
    io.emit('chat message', response);
  });


  //console.log(' ---> ', socket.eventNames());
});

module.exports = io;