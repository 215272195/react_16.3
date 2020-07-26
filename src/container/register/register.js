import React from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {regisger} from '../../redux/user.redux';
import imoocFrom from '../../component/imooc-form/imooc-form.js'

@connect(
  // 参数state，访问合并reducer内的变量名字得到state
  state => state.user,
  {regisger}
)
@imoocFrom
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  handleRegister() {
    // 传入当前注册输入框的信息
    this.props.regisger(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {/*存在就跳转*/}
        {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <h1 className="error-msg">{this.props.msg}</h1> : null}
          <InputItem
            onChange={v => this.props.handleChange('user', v)}
          >用户名</InputItem>
          <InputItem
            onChange={v => this.props.handleChange('pwd', v)}
            type='password'
          >密码</InputItem>
          <InputItem
            onChange={v => this.props.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register;