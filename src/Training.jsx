import React, {Component} from 'react';
import {MnistModel} from "./MnistModel";
import './Training.css';

export class Training extends Component {
  _mnistModel = new MnistModel();

  constructor(props) {
    super(props);
    this.state = {
      loss: undefined,
      accuracy: undefined,
      progress: undefined,
      validationLoss: undefined,
      validationAccuracy: undefined
    }
  }

  render() {
    return <div className='training'>
      <button onClick={() => this.onTrainClick()}>Train</button>
      <div>
        {this.renderProgress()}
        {this.renderValue('Loss', this.state.loss)}
        {this.renderValue('Accuracy', this.state.accuracy)}
        {this.renderValue('Validation Loss', this.state.validationLoss)}
        {this.renderValue('Validation accurracy', this.state.validationAccuracy)}
      </div>
    </div>;
  }

  renderProgress() {
    if (this.state.progress) {
      return <div>
        Training... ({this.state.progress.toFixed(1)}% complete). To stop training, refresh or close page.
      </div>;
    }
    return <div>Training not started yet.</div>;
  }

  renderValue(name, value) {
    return <div>{name}: {value ? value.toFixed(4) : 'N/A'}</div>;
  }

  async onTrainClick() {
    await this._mnistModel.loadData();
    console.log('onTrainClick - data loaded');
    await this._mnistModel.train(this.onBatchProcessed, this.onEpochProcessed);
    console.log('onTrainClick - training finished');
  }

  onBatchProcessed = (progress, loss, accuracy) => this.setState(
    {...this.state, loss, accuracy, progress}
  );

  onEpochProcessed = (progress, validationLoss, validationAccuracy) => this.setState(
    {...this.state, validationLoss, validationAccuracy}
  );
}