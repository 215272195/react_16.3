import React from 'react';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form.js'

/**
 * 高阶组件演示
 * **/
// function hello(){
// 	console.log('hello imooc I love React')
// }
//
// // 函数式编程
// function WrapperHello(fn){
// 	return function(){
// 		console.log('before say hello');
// 		fn();
// 		console.log('after say hello')
// 	}
// }
// // 装饰器模式 一个组件传入返回另一个组件 看着是一样的其实返回的是另一个东西
// hello = WrapperHello(hello);
// hello();


// 属性代理 传递进来的老组件
function WrapperHello(Comp) {
  // 反向继承
  class WrapComp extends Comp {
    componentDidMount() { // 改写生命周期 可以修改渲染的逻辑，整个渲染的流程
      console.log('高阶组件新增的生命周期，加载完成')
    }

    render() {
      return <Comp></Comp>
    }
  }

  // 属性代理
  // class WrapComp extends React.Component {
  //
  //   render() {
  //     return (
  //       <div>
  //         <p>这是HOC高阶组件特有的元素</p>
  //         {/*当前的组件全部显示 接收所有的参数*/}
  //         <Comp name='text' {...this.props}></Comp>
  //       </div>)
  //   }
  // }

  // 返回新的组件
  return WrapComp
}

// Hello = WrapperHello(Hello);

// 高阶组件传入一个组件给到另一个组件 组件就是一个函数
@WrapperHello // 上面Hello 的简写
class Hello extends React.Component {
  render() {
    return <h2>hello imooc I love React&Rdux</h2>
  }
}

@connect(
  state => state.user,
  {login}
)
@imoocFrom
class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: '',
    //   pwd: ''
    // };
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
  }

  // 注册
  register() {
    this.props.history.push('/register')
  }

  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  // 登录
  handleLogin() {
    this.props.login(this.props.state)
  }

  render() {
    return (
      <div>
        <Hello></Hello>
        {/*登陆成功我让你跳转*/} {/*解决已经是跳转的这个页面但他还会往这个页面条的一个报错*/}
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange={v => this.props.handleChange('user', v)}

            >用户</InputItem>
            <WhiteSpace/>
            <InputItem
              onChange={v => this.props.handleChange('pwd', v)}

            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleLogin} type='primary'>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;