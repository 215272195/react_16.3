import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'

import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
// 动画特效
import QueueAnim from 'rc-queue-anim';

// $('#test').find('img')
// $('#test img')

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', msg: []}
  }

  componentDidMount() {
    // 如果没有信息
    if (!this.props.chat.chatmsg.length) {
      // 多去所有列表
      this.props.getMsgList();
      // 监听聊天端口进行接收了
      this.props.recvMsg()
    }
    // 告诉后端读过消息了
    // 1 需要当前的用户可以再cookie内直接获取 需要传递当前聊天的目标 目标的id再url内
    console.log(this.props);
  }

  // 组件被移除 // 影藏的时候 解决在聊天内容中发消息未读数还在需要点击才会没有的bug 聊天退出的时候解决
  // 当前路由一离开当前组件就被干掉就会执行
  componentWillUnmount() {
    // 和谁聊天
    const to = this.props.match.params.user;
    this.props.readMsg(to)
  }

  fixCarousel() {
    // 解决表情下移的问题
    setTimeout(function () {
      // 手动派发一个事件
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    console.log(this.state);
    // 发送 后端名字，传的参数
    // socket.emit('sendmsg',{text:thi s.state.text});
    // 当前的
    const from = this.props.user._id;
    // 给谁发送的id再url内
    const to = this.props.match.params.user;
    // 发送的信息
    const msg = this.state.text;
    // 谁发出的 给谁的
    this.props.sendMsg({from, to, msg});
    // 清空
    this.setState({
      // 选中的表情
      text: '',
      // 表情包初始隐藏
      showEmoji: false
    })
  }

  render() {
    //     // 解决表情下移的问题 上面的生命周期
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}));

    const userid = this.props.match.params.user;
    const Item = List.Item;
    // 聊天的目标
    const users = this.props.chat.users;
    // 拿不到用户信息
    if (!users[userid]) {
      return null
    }
    // 当前聊天的id          // 当前id  // 聊天id
    const chatid = getChatId(userid, this.props.user._id);
    // 当前聊天的信息
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id='chat-page'>
        <NavBar
          // 深蓝色
          mode='dark'
          // 返回按钮
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {/* 拿到用户信息 */}
          {users[userid].name}
        </NavBar>

        {/*聊天的再右边 被聊的在左边*/}
        <QueueAnim delay={50}>
          {chatmsgs.map(v => {
            // 头像
            const avatar = require(`../../img/${users[v.from].avatar}.png`);
            // 如果是对方发过来的
            return v.from === userid ? (
              <List key={v._id}>
                <Item
                  // 头像
                  thumb={avatar}
                >{v.content}
                </Item>
              </List>

            ) : (
              <List key={v._id}>
                <Item
                  // 右边
                  extra={<img alt='头像' src={avatar}/>}
                  className='chat-me'
                >{v.content}</Item>
              </List>

            )
          })}
        </QueueAnim>
        {/*{this.props.chat.chatmsg.map((v) => {*/}
        {/*return <p key={v._id}>{v.content}</p>*/}
        {/*})}*/}

        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v => {
                this.setState({text: v})
              }}
              // 右边放字段 表情
              extra={
                // 表情包
                <div>
									<span
                    style={{marginRight: 15}}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      // 修复官方问题的方法
                      this.fixCarousel()
                    }}
                  >😃</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            ></InputItem>
          </List>

          {/*表情*/}
          {this.state.showEmoji ? <Grid
            // 表情
            data={emoji}
            // 每行
            columnNum={9}
            // 每列
            carouselMaxRow={4}
            // 是不是轮播
            isCarousel={true}
            // 点击每一个表情
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          /> : null}
        </div>
      </div>
    )
  }
}

// className="stick-footer"
export default Chat