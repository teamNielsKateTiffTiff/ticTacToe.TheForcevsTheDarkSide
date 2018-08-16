import React, { Component } from 'react';



class SelectPlayers extends Component {

handleForm(e) {
  this.props.playerSelect(e.target.value)
}

  render() {

    return (
      <div>
          <p>SELECT YOUR BOT:</p>
          <input type="radio" name="player" value="X" onClick={this.handleForm.bind(this)}/>BB-8<br/>
          <input type="radio" name="player" value="O" onClick={this.handleForm.bind(this)}/>AT-AT<br />
      </div>

    );
  }



}










export default SelectPlayers;
