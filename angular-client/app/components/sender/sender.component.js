/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";
angular.module('app')
  .component('sender', {
    templateUrl: './app/components/sender/sender.html',
    bindings: {},
    controller: function ($rootScope, IO) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
      };

      $ctrl.$onDestroy = function () {
        destroy1();
        destroy2();
      };

      const destroy1 = $rootScope.$on('confirm login', function () {
        $ctrl.logged = true;
      });

      const destroy2 = $rootScope.$on('logout', function () {
        $ctrl.logged = false;
      });



      $ctrl.logged = false;

      $ctrl.message = '';

      $ctrl.onSend = function () {
        IO.onSend($ctrl.message);
        $ctrl.message = '';
      };
    }
  });