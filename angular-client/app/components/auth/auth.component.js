/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";

angular.module('app')
  .component('auth', {
    templateUrl: './app/components/auth/auth.html',
    bindings: {},
    controller: function ($rootScope, $timeout, fx, IO) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
      };

      $ctrl.$onDestroy = function () {
        destroy();
      };

      const destroy = $rootScope.$on('confirm login', function (params, user) {
        $ctrl.login = user.login;
        $ctrl.logged = true;
        $ctrl.logging = false;

        $timeout(fx.nil);
      });

      $ctrl.logged = false;

      $ctrl.login = '';

      $ctrl.logging = false;

      $ctrl.onLogin = function () {
        IO.onLogin($ctrl.login);
        $ctrl.logging = true;
        $timeout(fx.nil);
      };

      $ctrl.onLogout = function () {
        IO.onLogout();
        $ctrl.login = '';
        $ctrl.logged = false;
        $timeout(fx.nil);
      };


    }
  });