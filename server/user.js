// 与用户相关的接口
const express = require('express');
// 密码加密
const utils = require('utility');

const Router = express.Router();
// 引入函数库
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
// 统一的查询条件
const _filter = {'pwd': 0, '__v': 0};

// 信息清空
// Chat.remove({},function(e,d){});

/**
 * 查询用户的列表
 * **/
Router.get('/list', function (req, res) {
  // get参数用query获取
  const {type} = req.query;
  // 清除所有数据 登录数据
  // User.remove({},function(e,d){});
  // 查询 find 空是所有
  User.find({type}, function (err, doc) {
    return res.json({code: 0, data: doc})
  })
});

/**
 * 聊天列表
 * **/
Router.get('/getmsglist', function (req, res) {
  // 拿到用户信息
  const user = req.cookies.userid;
  // 所有用户信息
  User.find({}, function (e, userdoc) {
    // 返回时的列表 让他成为对象
    let users = {};
    // 遍历拿出数据
    userdoc.forEach(v => {
      // 用户信息
      users[v._id] = {name: v.user, avatar: v.avatar}
    });
    // 空是所有信息 有问题我跟你还有别人聊天信息会串在一起 查询两次聊天信息 两个人聊天
    // 加入过滤条件 查询多个条件，分别是发给你的信息和我的
    Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  });
});

/**
 * 未读消息列表
 * **/
Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid;
  // 谁发送给我们的id
  const {from} = req.body;
  // 当前的  和  跟谁聊天
  console.log(userid, from);
  // 修改为已读
  Chat.update(
    // 需要更新的是对方发给我的
    // from对方的 // to 当前登录的
    {from, to: userid},
    // 设置
    {'$set': {read: true}},
    // 设置多行
    {'multi': true},
    function (err, doc) {
      console.log(doc); // {n: 1, nModified: 0, ok 1} // n几条数据 第二个修改的数据 ok 1 成功的
      if (!err) {
        // num 修改几行要前端知道
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: '修改失败'})
    })
});

/**
 * 接收参数-更新
 * **/
Router.post('/update', function (req, res) {
  // 接收cookie
  const userid = req.cookies.userid;
  if (!userid) {
    return json.dumps({code: 1})
  }
  const body = req.body;
  // 查找并且更新
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    // 返回的data 数据合并
    const data = Object.assign({}, {
      // 用户名字
      user: doc.user,
      // 身份
      type: doc.type
    }, body);
    return res.json({code: 0, data})
  })
});

/**
 * 登录页面
 * **/
Router.post('/login', function (req, res) {
  // 获取用户名和密码 post参数用body获取
  const {user, pwd} = req.body;
  // 第一个是查询条件，第二个是显示条件
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    // 设置cookie 保存成userid
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc})
  })
});

/**
 * 注册 post
 * 密码加密
 * **/
Router.post('/register', function (req, res) {
  console.log(req.body);
  // 传来的参数
  const {user, pwd, type} = req.body;
  // 查询一次 因为用户名是不能重复的所以要先查询一下user
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function (e, d) {
      // 出错
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d;
      res.cookie('userid', _id);
      return res.json({code: 0, data: {user, type, _id}})
    });

    // // 这个方法拿不到用户的id，因为生成后才会有id
    // User.create({user, type, pwd:md5Pwd(pwd)}, function(e, d) {
    //   // 如果出错了
    //   if (e) {
    //     return res.json({code:1,msg:'后端出错了'})
    //   }
    //   // 没出错 用户传来的信息传导cooket里
    //   return res.json({code:0})
    //   // return res.json({code:0,data:{user, type, _id}})
    // });
  })
});
/**
 * 登录 查询是否可直接进入页面
 * **/
Router.get('/info', function (req, res) {
  // 获取cookie id 用户的请求有没有cookies req
  const {userid} = req.cookies;
  // 用户有没有cookie
  if (!userid) {
    return res.json({code: 1}) // 不成功返回1
  }

  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })

});

/**
 * 用户加密-简称加严
 * **/
function md5Pwd(pwd) {
  // 任意的字符串
  const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd + salt))
}


module.exports = Router;
