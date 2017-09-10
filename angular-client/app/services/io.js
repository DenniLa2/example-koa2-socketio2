/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 09.09.17.
 */
"use strict";

angular.module('app')
  .factory('IO', function ($rootScope, $timeout) {

    let socket;


    function onLogin(login) {
      socket = io('http://localhost:3000');

      //socket.open();

      socket.on('confirm login', function (user) {
        $rootScope.$broadcast('confirm login', user);
      });

      socket.on('chat message', function (incoming) {
        rooms.addMessage(incoming);
      });

      socket.on('users', function (users) {
        $rootScope.$broadcast('users', users)
      });

      socket.emit('login', login);
    }

    function onLogout() {
      socket.emit('logout');

      socket.close();
      socket = null;

      rooms.clear();
      $rootScope.$broadcast('logout');
    }

    function onSend(message) {
      socket.emit('chat message', { room: rooms.selected, message: message })
    }

    function onSelectRoom(room) {
      $rootScope.$broadcast('room selected, chat', rooms.onSelectRoom(room));
      $rootScope.$broadcast('room selected, name', room);
    }

    function onSelectUser(user) {
      $rootScope.$broadcast('user selected, chat', rooms.onSelectUser(user.id));
      $rootScope.$broadcast('user selected, id', user.id);
    }


    const rooms = {
      data: {},
      selected: null,
      selectedIsRoom: null,

      init: function () {
        $timeout(function () {
          onSelectRoom('common');
        });
      },
      onSelectRoom: function (room) {
        this.selected = room;
        if (!this.data[room])
          this.data[room] = [];

        this.selectedIsRoom = true;
        return this.data[room];
      },
      onSelectUser: function (userId) {
        this.selected = userId;
        if (!this.data[userId])
          this.data[userId] = [];

        this.selectedIsRoom = false;
        return this.data[userId];
      },
      addMessage: function (incoming) {
        const room = incoming.room;
        const message = incoming.message;
        const sender = incoming.sender;
        const msg = { sender: sender, message: message };

        if (!this.data[room])
          this.data[room] = [];

        this.data[room].push(msg);

        if (this.selected === room)
          $rootScope.$broadcast('chat', msg);

      },
      clear: function () {
        for (let key in this.data) {
          if (key !== 'common')
            delete this.data[key];
        }
      }
    };

    rooms.init();


    return {
      onLogin: onLogin,
      onLogout: onLogout,
      onSelectRoom: onSelectRoom,
      onSelectUser: onSelectUser,
      onSend: onSend,
    }
  });