import React, { Component } from 'react';
//import './board.css'

class Square extends Component {
  constructor(props){
    super(props)
    this.state = {
      val: "",
      //beenClicked: false
    };
  }

  handleClick = () => {
    let { val } = this.state;
    console.log("click happened!");
    //Check if square had been beenClicked
    if(!val){
      val = "X";
      this.setState({val: val});
    }
    //change value of Square to X or O...

    //setState
  }

  render() {
    let { val } = this.state;
    return (
      <section onClick={this.handleClick}>
        {val}
      </section>
    );
  }
}

export default Square;
