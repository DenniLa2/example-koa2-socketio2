/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";
angular.module('app')
  .component('news', {
    templateUrl: './app/components/news/news.html',
    bindings: {},
    controller: function ($rootScope, $timeout, NewsF) {
      const $ctrl = this;
      $ctrl.$onInit = function () {
      };

      $ctrl.$onDestroy = function () {
        destroy();
      };

      $ctrl.news = {
        data: [],

        add: function (news) {
          const date = new Date();
          const line = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' - ' + news;
          this.data.unshift(line);

          if (this.data.length >= 10)
            this.data.pop();

          $timeout(() => {}); // wtf ??? without $timeout changes not applied!
        }
      };

      const destroy = $rootScope.$on('news', function (params, news) {
        $ctrl.news.add(news);
      }.bind($ctrl.news));
    }
  });