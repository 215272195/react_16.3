import React from 'react'


export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this)
    }

    // 这个组件天生自带一个这样的方法
    handleChange(key, val) {
      console.log('自定义高阶组件', key, val)
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}