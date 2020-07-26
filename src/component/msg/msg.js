import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

@connect(
  state => state
)
class Msg extends React.Component {
  // 拿到最后一条信息
  getLast(arr) {
    return arr[arr.length - 1]
  }

  // 根据chatid分组
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    // from to是不一定所以要跟当前登录的这个人的信息对比
    const userid = this.props.user._id;
    // 用户名字
    const userinfo = this.props.chat.users;
    console.log(this.props)
    // console.log(this.props)
    // 字典
    const msgGroup = {};
    // 按照用户分组
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v)
    });

    // 和每个用户的聊天信息    // 最新的聊天在最上边
    const chatList = Object.values(msgGroup).sort((a,b)=> {
      // 最后一条信息的时间戳
      console.log(this.getLast(a))
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last
    });


    return (
      <div>
        {chatList.map(v => {
          // 最后一条数据
          const lastItem = this.getLast(v);
          // console.log(9)
          // from to是不一定所以要跟当前登录的这个人的信息对比
          const targetId = v[0].from === userid ? v[0].to : v[0].from;
          // 未读消息数量                           对面发过来的
          const unreadNum = v.filter(v => !v.read && v.to === userid).length;
          // 这种if和下面的方法都行
          if (!userinfo[targetId]) {
            return null
          }
          // 名字
          // const name = userinfo[targetId]?userinfo[targetId].name:''
          // 头像
          // const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
          return (
            <List key={lastItem._id}>
              <Item
                // 用户未读消息
                extra={<Badge text={unreadNum}></Badge>}
                // 头像
                thumb={require(`../../img/${userinfo[targetId].avatar}.png`)}
                // 箭头
                arrow="horizontal"
                onClick={() => {
                  // 当前点击的人的id
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {/*最后一条信息*/}
                {lastItem.content}
                {/*用户名字*/}
                <Brief>{userinfo[targetId].name}</Brief>

              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg









