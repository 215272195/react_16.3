// 获取用户信息做跳转
import React from 'react';
import axios from 'axios'
// 因为是普通组件不是路由组件所以没有路由的方法所以引入这个
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// 存储cookie
import { loadData } from '../../redux/user.redux'

// 为了使用history这样的路由方法
@withRouter
// connect要在下面
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    // pathname 再publicList内就不用获取用户信息
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').
      then(res => {
        if (res.status === 200) {
          // 有用户信息的 能不能访问页面的开关
          if (res.data.code === 0) {
            // 有登录信息，传入用户信息
            this.props.loadData(res.data.data);
          } else {
            // 如果没有登录 没有登录就让你去登录页面登录
            this.props.history.push('/login')
          }
        }
      })
  }
  render() {
    return (
      <div>
        <div className="logo-container">
        </div>
      </div>
    )
  }
}

export default AuthRoute;