// 聊天redux
import axios from 'axios'
import io from 'socket.io-client'
// 不跨域直接io()
const socket = io('ws://localhost:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
  // 每一条聊天的信息
  chatmsg: [],
  users: {},
  // 显示未读信息几条
  unread: 0
};

// reducer
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        // 聊天信息
        chatmsg: action.payload.msgs,
        // 未读信息列表                         // 字段是false的取出来
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
      };
    // 读取
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n};
    case MSG_READ:
      const {from, num} = action.payload;
      return {
        ...state,                                     // 当前的聊天为已读
        chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})),
        // 维度的数量 后端修改的数量减掉
        unread: state.unread - num
      };
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}

// 接收数据 进入应用接收信息
function msgRecv(msg, userid) {
  return {userid, type: MSG_RECV, payload: msg}
}

// action的返回值action creater
// num 上面信息更改 下面的未读数字也要改变 所以要知道后台修改了几条数据
function msgRead({from, userid, num}) {
  return {type: MSG_READ, payload: {from, userid, num}}
}

// 参数谁发给我的
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
      .then(res => {
        // 当前用户的id
        const userid = getState().user._id;
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgRead({userid, from, num: res.data.num}))
        }
      })
  }
}

// 进入应用监听
export function recvMsg() {
  return (dispatch, getState) => {
    // 接收信息
    socket.on('recvmsg', function (data) {
      console.log('recvmsg', data);
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid))
    })
  }
}

// 谁跟谁聊 内容
export function sendMsg({from, to, msg}) {
  return dispatch => {
    // 发送给后端
    socket.emit('sendmsg', {from, to, msg})
  }
}

// 获取列表
export function getMsgList() {
  // 获取状态
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // 要拿到未读数量需要拿到id // 获取当前登录的信息
          const userid = getState().user._id;
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}



