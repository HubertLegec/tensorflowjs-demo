import React, {Component} from 'react';
import './Training.css';
import {MNIST_MODEL} from "./App";
import Dimensions from 'react-dimensions';
import {TrainingLineChartComponent} from "./TrainingLineChart";
import {TrainingProgress} from "./TrainingProgress";

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
      {this.state.trainingStarted && this.state.progress ?
        <TrainingProgress progress={this.state.progress}/> :
        this.renderNotStarted()
      }
      {this.state.trainingStarted ? this.renderCharts() : undefined}
    </div>;
  }

  renderNotStarted() {
    return <div>
      <div>Training not started yet. Select number of epochs and click button to start.</div>
      <div>
        <button onClick={() => this.onTrainClick()}>Train</button>
      </div>
    </div>;
  }

  renderCharts() {
    const {containerWidth} = this.props;
    return <div className='training-charts'>
      <TrainingLineChartComponent containerWidth={containerWidth - 32} title="Training" chartData={this.chartData}/>
      <TrainingLineChartComponent containerWidth={containerWidth - 32} title="Validation"
                                  chartData={this.chartValidationData}/>
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
    await MNIST_MODEL.train(this.onBatchProcessed, this.onEpochProcessed, this.onTrainingFinished);
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

  onTrainingFinished = (result) => {
    const {onTrainingFinished} = this.props;
    onTrainingFinished(result);
  };
}

export const Training = Dimensions()(TrainingComponent);
