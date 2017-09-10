/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";

const server = require('../server');
const io = require('socket.io')(server);

//const news = io.of('/news');
const news = io.of('/news');

//console.log(' ---> origins', io.origins());

const _clients = {
  data: [],

  add(id) {
    let login;
    this.data.push({ id, login });
  },
  remove(id) {
    const idx = this.getIdx(id);
    this.data.splice(idx, 1);
  },
  login({ id, login }) {
    const idx = this.getIdx(id);
    this.data[idx].login = login;
  },
  logout(id) {
    const idx = this.getIdx(id);
    this.data[idx].login = null;
  },
  getSender(id) {
    let sender;
    this.data.forEach(el => {
      if (el.id === id)
        sender = el.login;
    });
    return sender;
  },
  check(id) {
    return this.getIdx(id, true) > -1;
  },
  getIdx(id, isCheck) {
    const map = this.data.map(el => el.id);
    const idx = map.indexOf(id);
    if (idx === -1 && !isCheck)
      throw new Error('socket.id not found');

    return idx
  },
  getUsers: function () {
    const users = [];
    this.data.forEach(el => {
      if (el.id && el.login)
        users.push(el);
    });
    return users;
  }
};


io.on('connection', socket => {
  _clients.add(socket.id);

  socket.on('login', (login) => {
    const client = { id: socket.id, login };
    _clients.login(client);
    io.in(socket.id).emit('confirm login', client);

    const users = _clients.getUsers();
    io.emit('users', users)
  });

  socket.on('logout', () => {
    _clients.logout(socket.id);

    const users = _clients.getUsers();
    io.emit('users', users)
  });

  //console.log(' ---> connected', socket.request);
  //console.log(' ---> connected', socket.handshake);
  io.clients((error, clients) => {
    //console.log(' - clients --> ', clients);
  });

  //io.in(socket.id).emit('chat message', { msg: `hi, ${socket.id}` });

  socket.join('room');

  //io.in('room').emit('chat message', { msg: 'welcome in ROOM' });

  socket.on('disconnect', function () {
    _clients.remove(socket.id);

    const users = _clients.getUsers();
    io.emit('users', users)
  });

  socket.on('chat message', response => {
    const sender = socket.id;
    const receiver = response.room;
    response.sender = _clients.getSender(sender);
    const isPrivate = _clients.check(receiver);
    //console.log(' ---> response: ', response);


    if (response.room === 'common')
      io.emit('chat message', response);

    else if (sender === receiver)
      io.in(sender).emit('chat message', response);

    else {
      io.in(sender).emit('chat message', response);
      io.in(receiver).emit('chat message', response);
    }

  });

});


setInterval(() => {
  const one = Math.random() * 100000000000000000;
  news.emit('news', one.toString(36))
}, 10000);

module.exports = io;