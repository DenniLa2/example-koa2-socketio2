/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 07.09.17.
 */
"use strict";

const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs');

router
// static
  .get('/', async (ctx, next) => {
    //ctx.res.sendFile(path.join(__dirname, 'index.html'));
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../static','index.html'));
    //ctx.body = { server: 'on line' };
  });

function miscRoutes() {
  return router.routes()
}

module.exports = { miscRoutes };