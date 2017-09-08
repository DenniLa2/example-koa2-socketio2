/**
 * Created by Denni Adam ( dennila2@ya.ru ) on 08.09.17.
 */
"use strict";

const Koa = require('koa');

const app = new Koa();

const { allowedMethods } = require('../routes');
const { miscRoutes } = require('../routes/misc');

app.use(miscRoutes());
app.use(allowedMethods());

const server = require('http').Server(app.callback());

module.exports = server;