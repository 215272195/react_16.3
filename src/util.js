// 工具函数

/**
 * 第一个参数身份
 * 第二个头像
 * **/
export function getRedirectPath({type, avatar}){
  // 根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type==='boss')?'/boss': '/genius';
  // 有没有头像 没有头像就去完善你的信息
  if (!avatar) {
    url += 'info'
  }
  return url
}

/**
 * 拿到当前的聊天id 两个人id的组合
 * @params 当前id
 * @params 聊天id
 * **/
export function getChatId(userId, targetId){
  return [userId, targetId].sort().join('_')
}
