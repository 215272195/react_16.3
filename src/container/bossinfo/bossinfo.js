
import React from 'react'
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
// 头像组件
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      desc:'',
      company:'',
      money:''
    }
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    // 如果你在某个路由刷新页面会告诉你已经在这
    // /bossinfo 当前路径后面的地址
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div style={{'marginTop': '-50px'}}>
        {/*如果有redirect并且不等于之前的路径*/}
        {redirect && redirect !== path? <Redirect to={this.props.redirectTo}></Redirect> :null}
        <NavBar mode="dark" >BOSS完善信息页</NavBar>
        {/*头像组件*/}
        <AvatarSelector
          // 修改头像 给子组件传参
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
        >

        </TextareaItem>
        <Button
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>保存</Button>
      </div>

    )
  }
}

export default BossInfo