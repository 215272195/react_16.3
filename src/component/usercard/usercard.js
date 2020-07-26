import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'


@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };

  handleClick(v) {
    // 直接存储用户名字风险是很大的
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {/*redux内的数据*/}
        {this.props.userlist.map(v => (
          // 用户如果没有头像就是信息不完善
          v.avatar ? (
            <Card
              key={v._id}
              // 跳转到对应页面 聊天
              onClick={() => this.handleClick(v)}
            >
              <Header
                // 标题
                title={v.user}
                // 头像
                thumb={require(`../../img/${v.avatar}.png`)}
                // 内容
                extra={<span>{v.title}</span>}
              >
              </Header>
              {/*简介*/}
              <Body>
              {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
              {/*从换行符截取*/}
              {v.desc.split('\n').map(d => (
                // 输入信息的值
                <div key={d}>{d}</div>
              ))}
              {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
              </Body>
            </Card>) : null
        ))}
      </WingBlank>
    )


  }
}

export default UserCard

