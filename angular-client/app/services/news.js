/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 09.09.17.
 */
"use strict";

angular.module('app')
  .factory('NewsF', function ($rootScope) {
    const news = io('http://localhost:3000/news');

    news.on('news', function (data) {
      $rootScope.$broadcast('news', data)
    });

    return {}
  });