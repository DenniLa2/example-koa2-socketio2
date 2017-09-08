/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 07.09.17.
 */
"use strict";
const Router = require('koa-router');
const router = new Router();

function allowedMethods() {
  return router.allowedMethods()
}

module.exports = { allowedMethods };