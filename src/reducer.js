// 合并所有reducer 并且返回 首先引入合并reducer的方法
import {combineReducers} from 'redux'
// 再引入需要用到的reducer
import {user} from './redux/user.redux'
import {chatuser} from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'

export default combineReducers({user, chatuser, chat})

