// 启动命令  nodemon server
// const express = require('express');
import express from 'express'
// 使用post
const bodyParser = require('body-parser');
// 解析cookie
const cookieParser = require('cookie-parser');
// 使用user.js
const userRouter = require('./user');
// 密码加密
const utils = require('utility');

import React from 'react'
// 把react组件变前端编译后的div
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

// 引入函数库
const model = require('./model');
const Chat = model.getModel('chat');
// node自带的解决相对路径的问题
let path = require('path');

const app = express();
// express配合 http自带的
const server = require('http').Server(app);
// 监听端口
const io = require('socket.io')(server);
// 如果直接给egg给前端，前端还要跑一边js来渲染
function Egg() {
  return (
    <div>
      <p>server</p>
    </div>
  )
}


// 监听到用户有链接后
/**
 * 传进来的是当前这次链接
 * 本次用户聊天信息
 * **/
io.on('connection', function (socket) {
  // console.log('user login')
  // 监听 data 传递进来的
  socket.on('sendmsg', function (data) {
    console.log(data);
    // 参数1我   跟谁聊天   信息
    const {from, to, msg} = data;
    // 把他两个id变为一个 每个聊天都有一个唯一的id
    const chatid = [from, to].sort().join('_');
    // 数据入库
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      // 发送一个  所有人接收
      io.emit('recvmsg', Object.assign({}, doc._doc))
    });
    // console.log(data)
    // 接收事件 广播出去
    // io.emit('recvmsg', data)
  })
});


app.use(cookieParser());
// 解析post过来的json数据
app.use(bodyParser.json());

// 开启一个中间件 如果是一个路由就use的前缀 设置路由前缀
app.use('/user', userRouter);

// 后端的拦截
app.use(function (req, res, next) {
  // 如果你接口是user开始的 或者static
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    // 就什么都不干
    return next()
  }
  // 项目路径 绝对路径
  console.log(path.resolve('build/index.html'))

  // const htmlRes = renderToString(<Egg></Egg>)
  // 编译渲染之后的
  // res.send(htmlRes)

  // 否则就是渲染的文件
  // path.resolve 修复路径 相对路径变成绝对路径
  // 没有做服务端渲染的时候就只有这一条
  return res.sendFile(path.resolve('build/index.html'));
})

// 只要是这个地址 就把他设置成静态资源地址 中间件的形式做转发
app.use('/', express.static(path.resolve('build')))


// app.listen(9093,function(){
// 	console.log('Node 开启成功')
// });
// 原来app 变成 server
server.listen(9093, function () {
  console.log('Node 开启成功')
});






