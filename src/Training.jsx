import React, {Component} from 'react';
import './Training.css';
import {MNIST_MODEL} from "./App";
import {lastArrayItem} from "./utils";
import Dimensions from 'react-dimensions';
import {TrainingLineChartComponent} from "./TrainingLineChart";

class TrainingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loss: [],
      accuracy: [],
      progress: undefined,
      validationLoss: [],
      validationAccuracy: [],
      trainingStarted: false
    }
  }

  render() {
    return <div className='training'>
      <div className='training-controls'>
        <button onClick={() => this.onTrainClick()}>Train</button>
        <div>
          {this.renderProgress()}
          {this.renderValue('Loss', lastArrayItem(this.state.loss))}
          {this.renderValue('Accuracy', lastArrayItem(this.state.accuracy))}
          {this.renderValue('Validation Loss', lastArrayItem(this.state.validationLoss))}
          {this.renderValue('Validation accurracy', lastArrayItem(this.state.validationAccuracy))}
        </div>
      </div>
      {this.state.trainingStarted ? this.renderCharts() : undefined}
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

  renderCharts() {
    const {containerWidth} = this.props;
    return <div className='training-charts'>
      <TrainingLineChartComponent containerWidth={containerWidth - 32} title="Training" chartData={this.chartData}/>
      <TrainingLineChartComponent containerWidth={containerWidth - 32} title="Validation" chartData={this.chartValidationData}/>
    </div>;
  }

  get chartData() {
    return this.state.accuracy
      .map((accuracy, batch) => ({idx: batch + 1, accuracy, loss: this.state.loss[batch]}));
  }

  get chartValidationData() {
    return this.state.validationAccuracy
      .map((accuracy, epoch) => ({idx: epoch + 1, accuracy, loss: this.state.validationLoss[epoch]}));
  }

  async onTrainClick() {
    await MNIST_MODEL.loadData();
    this.setState({...this.state, trainingStarted: true});
    await MNIST_MODEL.train(this.onBatchProcessed, this.onEpochProcessed);
  }

  onBatchProcessed = (progress, loss, accuracy) => this.setState({
    ...this.state,
    loss: [...this.state.loss, loss],
    accuracy: [...this.state.accuracy, accuracy],
    progress
  });

  onEpochProcessed = (progress, validationLoss, validationAccuracy) => this.setState({
    ...this.state,
    validationLoss: [...this.state.validationLoss, validationLoss],
    validationAccuracy: [...this.state.validationAccuracy, validationAccuracy]
  });
}

export const Training = Dimensions()(TrainingComponent);
