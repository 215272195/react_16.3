import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGOUT = 'LOGOUT';
const LOGIN_SUCESS = 'LOGIN_SUCESS';
// 有cookie就是获取用户信息成功 就拿到这个用户数据
const LOAD_DATA = 'LOAD_DATA';
// 登录注册修改信息成功统一变量
const AUTH_SUCCESS = 'AUTH_SUCCESS';

// 用户的初始状态
const initState = {
  // 登陆成功跳转
  redirectTo: '',
  // 有没有报错信息
  msg: '',
  user: '',
  // pwd: '',
  type: ''
};
// reducer 内监听action
// return {...state, isAuth: false, msg: action.msg};// 后面的是对...state做的一次修改
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
    case LOAD_DATA:
      return {...state, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOGOUT:
      // 数据清空 跳转登录页
      return {...initState, redirectTo: '/login'};
    default:
      return state;
  }
}

// 登录注册修改信息成功统一
function authSuccess(obj) {
  // 过滤掉pwd
  const {pwd, ...data} = obj;
  return {type: AUTH_SUCCESS, payload: data}
}

// 对页面的修改
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 退出
export function logoutSubmit() {
  return {type: LOGOUT}
}

// 返回用户信息
export function loadData(userinfo) {
  console.log(loadData);
  return {type: LOAD_DATA, payload: userinfo}
}

// 错误的时候
function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

// 登录 action
export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return async dispatch => {
    const res = await axios.post('/user/login', {user, pwd});
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  }
}

// 注册
export function regisger({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次密码不一致')
  }

  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // 成功
          dispatch(authSuccess({user, pwd, type}));
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}





