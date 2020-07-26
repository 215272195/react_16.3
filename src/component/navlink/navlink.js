import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@connect(
  state => state.chat
)
// 获取跟路由相关的方法
@withRouter
class NavLinkBar extends React.Component {
  // 设置类型
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    // 如果是隐藏的就不获取它
    const navList = this.props.data.filter(v => !v.hide);
    const {pathname} = this.props.location;
    return (
      // 底部组件
      <TabBar>
        {navList.map(v => (
          // 导航栏
          <TabBar.Item
            // 显示未读消息 是聊天信息的有数字显示
            badge={v.path === '/msg' ? this.props.unread : 0}
            // 唯一的
            key={v.path}
            // 显示的文字
            title={v.text}
            // 图片
            icon={{uri: require(`./img/${v.icon}.png`)}}
            // 选中时候的图片
            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
            // 选中的条件
            selected={pathname === v.path}
            // 点击切换路由
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >

          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar