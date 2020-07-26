// 聊天对象列表 跟任何身份的人聊天
import axios from 'axios'

const USER_LIST = 'USER_LIST';

const initState = {
  userlist: []
};

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      // 展开数据   后面修改
      return {...state, userlist: action.payload}
    default:
      return state
  }
}

// 用户数据
function userList(data) {
  return {type: USER_LIST, payload: data}
}

// reducer有了 action有了 现在写操作函数
export function getUserList(type) { // 拿到什么用户获取什么列表
  return dispatch => {
    // 获取用户的列表
    axios.get('/user/list?type=' + type)
      .then(res => {
        if (res.data.code === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
}






