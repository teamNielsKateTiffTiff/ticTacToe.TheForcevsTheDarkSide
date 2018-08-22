import React, { Component } from 'react';
import './board.css'


class SelectPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      player1: {id: null, name: null, value: null},
      player2: {id: null, name: null, value: null},
      isHidden: false,
      isHidden2: false,
      light_side: [" ", "han solo", "luke skywalker", "leia organa", "chewbacca", "yoda", "admiral ackbar", "c3p0", "ewok", "lando calrissian", "obiwan kenobi", "qui gon jinn", "r2d2"],
      dark_side: [" ", "darth vader", "emperor palpatine", "boba fett", "greedo", "darth maul", "clone trooper", "jabba the hutt", "jango fett", "storm trooper"],
      aiOn: false,
      ai_ops: [" ", "On", "Off"]
    };
  }

  selectPlayer1(e){
    e.preventDefault();
    if(this.state.player1.value){
      this.props.selectPlayer(this.state.player1);
      this.setState({isHidden: !this.state.isHidden});
    }
  }

  selectPlayer2(e){
    e.preventDefault();
    if(this.state.player2.value){
      this.props.selectPlayer(this.state.player2);
      this.setState({isHidden2: !this.state.isHidden2})
    }
  }

  handleChange(e){
    let {id, name, value} = e.target
    //console.log("in player select.. ", id, name, value);
    if(id === "X"){
      this.setState({ player1: {id: id, name: name, value: value} });
    }
    if(id === "O"){
      this.setState({ player2: {id: id, name: name, value: value} });
    }
  }

  handleAI(e){
    let { value } = e.target;
    console.log(value);
    //Returns true or false to aiStatus in boardJS
    if(value !== ""){
      if(value === "On"){
        this.props.aiStatus(true);
      }
      if(value === "Off"){
        this.props.aiStatus(false);
      }
    }
  }

  reset(){
    this.setState({
        player1: {id: null, name: null, value: null},
        player2: {id: null, name: null, value: null},
        isHidden: false,
        isHidden2: false,
        aiOn: false
    });
    this.render();
  }

  render(){
    console.log("STATE SelectPlayer: ", this.state);
    //Assign all variables to be used.
    let {player1, player2, isHidden, isHidden2, light_side, dark_side, ai_ops } = this.state;
    let player1icon;
    let player2icon;
    //Checks is players have value and creates the img path
    if(player1.value){
      player1icon = player1.value.split(" ").join("-");
    }
    if(player2.value){
      player2icon = player2.value.split(" ").join("-");
    }
    let img1 = "./img/"+player1icon+".png";
    let img2 = "./img/"+player2icon+".png"
    //generates the select options from array of characters.
    let options_ls = light_side.map((value, i) => {
      //console.log(value, i);
      return (
        <option key={i.toString()} value={value}>{value.toUpperCase()}</option>
      )
    });
    //generates the select options from array of characters.
    let options_ds = dark_side.map((value, i) => {
      //console.log(value, i);
      return (
        <option key={i.toString()} value={value}>{value.toUpperCase()}</option>
      )
    });
    let options_ai = ai_ops.map((value, i) => {
      return (
        <option key={i.toString()} value={value}>{value}</option>
        )
    });
    return(
      <div>
        {!isHidden && <form method="get" action="" onSubmit={this.selectPlayer1.bind(this)}>
          <label>LIGHT SIDE: <select id="X" name="player1" onChange={this.handleChange.bind(this)}>
            {options_ls}
          </select></label>
        <input type="submit" value="Select" />
        </form>}{isHidden && <img width="5%" src={img1}/>}{isHidden && " " + player1.value}
        {!isHidden2 && <form method="get" action="" onSubmit={this.selectPlayer2.bind(this)}>
          <label>DARK SIDE: <select id= "O" name="player2" onChange={this.handleChange.bind(this)}>
            {options_ds}
          </select></label>
        <input type="submit" value="Select" />
      </form>}{isHidden2 && " VS " + player2.value + " "} {isHidden2&& <img width="5%" src={img2}/> }
      <form method="get" action="" onSubmit={this.selectPlayer1.bind(this)}>
        <label>AI: <select name="ai" onChange={this.handleAI.bind(this)}>
          {options_ai}
          </select></label>
      </form>
      </div>
    );
  }

}

export default SelectPlayer;
