## 启动项目
```
前端起
mongod 启动数据库
到serve目录下 nodemon server.js
npm run start

服务端起
cnpm run build
npm server 这个支持import
或者 npm server_b 这个是没有加babel的
```


```aidl
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── server
│   ├── model.js
│   ├── server.js
│   ├── servers.js
│   └── user.js
├── src
│   ├── app.js
│   ├── component # 组件页面
│   │   ├── Dashboard
│   │   │   ├── Dashboard.js
│   │   │   └── dashboard.css
│   │   ├── authRoute
│   │   │   └── authRoute.js
│   │   ├── avatar-selector
│   │   │   └── avatar-selector.js
│   │   ├── boss
│   │   │   └── boss.js
│   │   ├── chat
│   │   │   └── chat.js
│   │   ├── genius
│   │   │   └── genius.js
│   │   ├── imooc-form
│   │   │   └── imooc-form.js
│   │   ├── logo
│   │   │   ├── job.png
│   │   │   ├── logo.css
│   │   │   └── logo.js
│   │   ├── msg
│   │   │   └── msg.js
│   │   ├── navlink
│   │   │   ├── img
│   │   │   │   ├── boss-active.png
│   │   │   │   ├── boss.png
│   │   │   │   ├── job-active.png
│   │   │   │   ├── job.png
│   │   │   │   ├── msg-active.png
│   │   │   │   ├── msg.png
│   │   │   │   ├── user-active.png
│   │   │   │   └── user.png
│   │   │   └── navlink.js
│   │   ├── user
│   │   │   └── user.js
│   │   └── usercard
│   │       └── usercard.js
│   ├── config.js
│   ├── container # 页面文件
│   │   ├── bossinfo #boss 牛人信息页
│   │   │   └── bossinfo.js
│   │   ├── geniusinfo # 消息页面
│   │   │   └── geniusinfo.js
│   │   ├── login # 登录页面
│   │   │   └── login.js
│   │   └── register # 注册页面
│   │       └── register.js
│   ├── img
│   │   ├── boy.png
│   │   ├── bull.png
│   │   ├── chick.png
│   │   ├── crab.png
│   │   ├── girl.png
│   │   ├── hedgehog.png
│   │   ├── hippopotamus.png
│   │   ├── koala.png
│   │   ├── lemur.png
│   │   ├── man.png
│   │   ├── pig.png
│   │   ├── tiger.png
│   │   ├── whale.png
│   │   ├── woman.png
│   │   └── zebra.png
│   ├── index.css
│   ├── index.js
│   ├── job.png
│   ├── reducer.js
│   ├── redux
│   │   ├── chat.redux.js
│   │   ├── chatuser.redux.js
│   │   └── user.redux.js
│   └── util.js
├── test.html
└── yarn.lock
```