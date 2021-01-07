class Father extends React.component {
  state = {
    text: '父组件文本'
  }

  // changeText = () => {
  //   this.setState({
  //     text: '修改过后的父组件'
  //   })
  // }

  changeText = (newText) => {
    this.setState({
      text: newText
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.changeText}></button>

        {/* <Child text={this.state.text} /> */}
        <Child changeFatherText={this.changeText} />
      </div>
    )
  }
}

function Child(props) {
  return (
    <div>
      <p>{`子组件接收到的内容是${props.text}`}</p>
    </div>
  )
}

class Child extends React.component {
  state = {
    text: '子组件的文本'
  }

  changeText = () => {
    this.props.changeFatherText(this.state.text)
  }

  render () {
    return (
      <div>
        <button onClick={this.changeText} ></button>
      </div>
    )
  }
}