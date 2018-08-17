import React, { Component } from 'react';
import './board.css'


class SelectPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      player1: {id: null, name: null, value: null},
      player2: {id: null, name: null, value: null},
      isHidden: false,
      isHidden2: false
    };
  }

  selectPlayer1(e){
    e.preventDefault();
    this.props.selectPlayer(this.state.player1);
    this.setState({isHidden: !this.state.isHidden})
  }

  selectPlayer2(e){
    e.preventDefault();
    this.props.selectPlayer(this.state.player2);
    this.setState({isHidden2: !this.state.isHidden2})
  }

  handleChange(e){
    let {id, name, value} = e.target
    console.log("in player select.. ", id, name, value);
    if(id === "X"){
      this.setState({ player1: {id: id, name: name, value: value} });
    }
    if(id === "O"){
      this.setState({ player2: {id: id, name: name, value: value} });
    }
  }

  render(){
    console.log("STATE SelectPlayer: ", this.state);
    let {player1, player2, isHidden, isHidden2 } = this.state;
    let img1 = "./img/"+this.state.player1.value+".png";
    let img2 = "./img/"+this.state.player2.value+".png"
    return(
      <div>
        {!this.state.isHidden && <form method="get" action="" onSubmit={this.selectPlayer1.bind(this)}>
          <label>LIGHT SIDE:
          <select id="X" name="player1" onChange={this.handleChange.bind(this)}>
            <option value=""></option>
            <option value="han-solo">Han Solo</option>
            <option value="luke-skywalker">Luke Skywalker</option>
            <option value="leia-organa">Leia Organa</option>
            <option value="yoda">Yoda</option>
          </select></label>
        <input type="submit" value="Select" />
        </form>}{this.state.isHidden && <img width="5%" src={img1}/>}{this.state.isHidden && " " + player1.value}
        {!this.state.isHidden2 && <form method="get" action="" onSubmit={this.selectPlayer2.bind(this)}>
        <label>DARK SIDE:
          <select id= "O" name="player2" onChange={this.handleChange.bind(this)}>
            <option value=""></option>
            <option value="darth-vader">Darth Vader</option>
            <option value="emperor-palpatine">Emperor Palpatine</option>
            <option value="boba-fett">Boba Fett</option>
            <option value="greedo">Greedo</option>
            <option value="darth-maul">Darth Maul</option>
          </select></label>
        <input type="submit" value="Select" />
      </form>}{this.state.isHidden2 && " VS " + player2.value + " "} {this.state.isHidden2&& <img width="5%" src={img2}/> }
      </div>
    );
  }

}

export default SelectPlayer;
