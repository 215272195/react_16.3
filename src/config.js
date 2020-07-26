import axios from 'axios'
// loading
import {Toast} from 'antd-mobile'

// 拦截请求 请求前要做的事情
axios.interceptors.request.use(function (config) {
  Toast.loading('加载中', 0); // 0秒不关闭
  return config
})

// 拦截相应 请求后要做的事情
axios.interceptors.response.use(function (config) {
  Toast.hide()
  return config
})