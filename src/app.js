/**
 * 服务端渲染 index 可复用的抽离出来
 * 共用组件
 * **/
import React from 'react';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/Dashboard/Dashboard'
import Chat from './component/chat/chat'
import Boss from './component/boss/boss'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // 默认没有错
      hasError:false
    }
  }
  componentDidCatch(err, info){
    console.log('error')
    this.setState({
      hasError:true
    })
  }
  render() {
    return (this.state.hasError
      ? <h2 className="error"><img src={require('./component/logo/job.png')} alt="error"/>出错了</h2>
      :(
        <div>
          {/*检测路由是不是好的*/}
          <AuthRoute></AuthRoute>
          {/*Switch标签下面命中一个path下面的就不管了*/}
          <Switch>
            {/*Boss登录后完善信息的页面*/}
            <Route path='/bossinfo' component={BossInfo}></Route>
            {/*牛人信息页*/}
            <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route path='/boss' component={Boss}></Route>
            {/*登录*/}
            <Route path='/login' component={Login}></Route>
            {/*注册*/}
            <Route path='/register' component={Register}></Route>
            {/*聊天列表 跳到用户聊天页面 和谁聊天*/}
            <Route path='/chat/:user' component={Chat}></Route>
            {/*如果你不加Switch每个路由下面都会有Dashboard信息 如果有Switch没有命中会跳到没有path的上面*/}
            <Route component={Dashboard}></Route>
          </Switch>
        </div>)
    )
  }
}

export default App;