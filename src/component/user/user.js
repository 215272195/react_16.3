import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
// 操作cookie
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗???', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认', onPress: () => {
        // 删除cookie
        browserCookie.erase('userid');
        // 清除数据，调换页面
        this.props.logoutSubmit()
      }
      }
    ])
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    // 用户有信息么
    return props.user ? (
      <div>
        {/*头像*/}
        <Result
          // 可以是一个组件
          img={<img src={require(`../../img/${props.avatar}.png`)} style={{width: 50}} alt="用户图片"/>}
          title={props.user}
          // 公司名字
          message={props.type === 'boss' ? props.company : null}
        />
        {/*/!*用户详情*!/ 标题*/}
        <List renderHeader={() => '简介'}>
          <Item
            multipleLine
          >
            {/*用户的名字*/}
            {props.title}
            {/*因为有换行符*/}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>薪资:{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}/>

  }
}

export default User
