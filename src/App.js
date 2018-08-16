import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tic Tac Toe</h1>
        </header>

        <Board />

      </div>
    );
  }
}

export default App;
