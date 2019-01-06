import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Canvas} from "./Canvas";
import {Result} from "./Result";
import {Training} from "./Training";
import {base64ToImageData} from "./utils";
import {MnistModel} from "./MnistModel";

export const MNIST_MODEL = new MnistModel();

class App extends Component {
  MNIST_SIZE = 28;

  state = {
    image: undefined,
    result: undefined
  };

  render() {
    return <div className="app">
      <header className="app-header">
        <div><img src={logo} className="app-logo" alt="logo"/></div>
        <div>TensorFlow.js demo</div>
      </header>
      <section className="app-content">
        <Training/>
      </section>
      <section className="app-content">
        <Canvas onNewImage={image => this.onNewImage(image)}/>
        <Result digit={this.state.result}/>
      </section>
    </div>;
  }

  async onNewImage(base64Image) {
    if (base64Image === undefined) {
      this.setState({...this.state, result: undefined});
    } else {
      const image = await base64ToImageData(base64Image, this.MNIST_SIZE);
      const result = MNIST_MODEL.predict(image);
      this.setState({...this.state, result});
    }
  }
}

export default App;
