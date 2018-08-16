import React, { Component } from 'react';
//import './board.css'

class Square extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     val: "",
  //   };
  // }

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    let { value } = this.props;
    return (
      <section onClick={this.handleClick.bind(this)}>
        <img width="100px" src={value} />
      </section>
    );
  }
}

export default Square;
