// 操作数据库
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL, {
  useMongoClient: true
  /* other options */
});

// 用户的模型
const models = {
  user: {
    // 用户名
    'user': {type: String, 'require': true},
    // 密码
    'pwd': {type: String, 'require': true},
    // 身份
    'type': {'type': String, 'require': true},
    //头像
    'avatar': {'type': String},
    // 个人简介或者职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果你是boss 还有两个字段
    // 公司名字
    'company': {'type': String},
    // 薪资 你能给多钱
    'money': {'type': String}
  },
  // 聊天的信息 聊天模型
  chat: {
    // 查询两个信息 两个人的id 每一次聊天唯一的标识
    'chatid': {'type': String, require: true},
    // 谁发出的
    'from': {'type': String, 'require': true},
    // 发给谁
    'to': {'type': String, 'require': true},
    // 是否被读 只对to有效 因为是我发给你的
    'read': {'type': Boolean, default: false},
    // 发的内容
    'content': {'type': String, 'require': true, 'default': ''},
    // 事件
    'create_time': {'type': Number, 'default': Date.now}
  }
};

// 批量动态生成
for (let m in models) {
  // 所有的对象都注册
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    // 读取模块名字
    return mongoose.model(name)
  }
}