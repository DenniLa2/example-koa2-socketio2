/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";
angular.module('app')
  .component('rooms', {
    templateUrl: './app/components/rooms/rooms.html',
    bindings: {},
    controller: function ($rootScope, $timeout, fx, IO) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
        $ctrl.rooms.onSelectRoom({id: 0, name: 'common'})
      };

      $ctrl.rooms = {
        data: [{id: 0, name: 'common'}],
        users: [],

        onSelectRoom: function (room) {
          IO.onSelectRoom(room.name);
        },
        selectRoom: function (room) {
          this.data.forEach(function (el) {
            if (el.name === room)
              this.selected = el;
          }.bind(this));
        },
        onSelectUser: function (user) {
          IO.onSelectUser(user);
        },
        selectUser: function (userId) {
          this.users.forEach(function (el) {
            if (el.id === userId)
              this.selected = el;
          }.bind(this));
        },
        syncUsers: function (users) {
          this.users = users;
          $timeout(fx.nil);
        }
      };

      $rootScope.$on('users', function (params, users) {
        $ctrl.rooms.syncUsers(users)
      });

      $rootScope.$on('room selected, name', function (params, room) {
        $ctrl.rooms.selectRoom(room)
      });

      $rootScope.$on('user selected, id', function (params, userId) {
        $ctrl.rooms.selectUser(userId)
      });

      $rootScope.$on('logout', function (params, users) {
        $ctrl.rooms.syncUsers([])
      });
    }
  });