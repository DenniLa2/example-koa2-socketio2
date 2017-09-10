/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";
angular.module('app')
  .component('chat', {
    templateUrl: './app/components/chat/chat.html',
    bindings: {},
    controller: function ($rootScope, $timeout, fx) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
      };

      $ctrl.chat = {
        data: [],

        fill: function (chat) {
          this.data = chat.map(function (el) {
            return el;
          });

          $timeout(fx.nil);
        },
        addMessage: function (msg) {
          this.data.push(msg);

          $timeout(fx.nil);
        },
        clear: function () {
          this.data.length = 0;
        }
      };

      $rootScope.$on('chat', function (params, msg) {
        $ctrl.chat.addMessage(msg);
      });

      $rootScope.$on('user selected, chat', function (params, chat) {
        $ctrl.chat.fill(chat)
      });

      $rootScope.$on('room selected, chat', function (params, chat) {
        $ctrl.chat.fill(chat)
      });

      $rootScope.$on('logout', function () {
        $ctrl.chat.clear()
      })
    }
  });