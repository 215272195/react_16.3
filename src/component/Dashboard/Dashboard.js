import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
// footer组件
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import './dashboard.css'
import {getMsgList, recvMsg} from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim';

@connect(
  // 拿到整个redux信息
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
  componentDidMount() {
    // 获取列表 用户信息 每次刷新每次获取发送事件多次绑定一次发很多消息所以要有一个判断
    // 如果没有数据我们就去获取
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  render() {
    const {pathname} = this.props.location;
    const user = this.props.user;
    // 列表
    const navList = [
      {
        path: '/boss',
        // boss进来看到的事牛人的信息
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        // 渲染的组件
        component: Boss,
        // 有些情况下导航栏是需要隐藏的
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        // 查看的工作
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        // 任何情况都不会影藏
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ];

    // 找到当前的page
    const page = navList.find(v => v.path === pathname);


    return (
      <div>   {/*header页面*/}
        <NavBar
          className='fixd-header'
          mode='dard'
        >
          {console.log(navList)}
          {/*list里面的等于pathname就把它找出来使用title方法*/}
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{marginTop: 45}}>

          {/*没有加动画之前的代码*/}
          {/*<Switch>*/}
          {/*/!*Boss页面的内容切换*!/*/}
          {/*{navList.map(v=>(*/}
          {/*<Route key={v.path} path={v.path} component={v.component}></Route>*/}
          {/*))}*/}
          {/*</Switch>*/}

          <QueueAnim type='scaleX' duration={800}>
            {/*Boss页面的内容切换*/}
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>

        </div>
        {/*传数据给子组件*/}
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )


  }

}

export default Dashboard