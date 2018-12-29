import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Canvas} from "./Canvas";
import {Result} from "./Result";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div><img src={logo} className="app-logo" alt="logo"/></div>
          <div>TensorFlow.js demo</div>
        </header>
        <section className="app-content">
          <Canvas/>
          <Result/>
        </section>
      </div>
    );
  }
}

export default App;
