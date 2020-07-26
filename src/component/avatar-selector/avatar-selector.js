
import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  static propTypes = {
    // 属性必须是一个函数 必须传的
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state={}
  }

  render(){
    // 所有图片的名字 遍历显示头像
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v=>({
        // 引入文件
        icon:require(`../../img/${v}.png`),
        text:v
      }));
    // 显示选中的头像
    const gridHeader = this.state.icon
      ? (<div>
          <span>已选择头像</span>
          <img style={{width:20}} src={this.state.icon} alt="头像"/>
        </div>)
      : <div>请选择头像</div>;
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            // 所有图片
            data={avatarList}
            columnNum={5}
            // 点击拿到头像数据
            onClick={elm => {
              // 显示当前的头像
              this.setState(elm);
              // 子组件接收父组件方法并且传参 拿到当前的头像
              // 头像相想传什么传什么 react官方有一个属性验证
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>

    )
  }
}

export default AvatarSelector