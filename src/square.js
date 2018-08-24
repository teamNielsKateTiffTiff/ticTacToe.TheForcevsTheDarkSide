import React, { Component } from 'react';
import './App.css';
import './board.css'

class Square extends Component {

  render() {
    let { val } = this.props;
    //console.log(val);
    return (
      <section onClick={this.props.squareClick}>
        <img className="icons" src={val} alt=""/>
      </section>
    );
  }
}

export default Square;
