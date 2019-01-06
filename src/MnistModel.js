import * as tf from '@tensorflow/tfjs';
import {MnistData} from "./MnistData";
import {MnistModelBuilder} from "./MnistModelBuilder";

export class MnistModel {
  static VALIDATION_SPLIT = 0.15;
  // How many examples the model should "see" before making a parameter update.
  static BATCH_SIZE = 128;

  trainEpochs = 5;
  _model;
  _data;
  _trainBatchCount = 0;
  _valAcc;
  _trainData;
  _testData;
  _totalNumBatches;

  constructor() {
    this._model = MnistModelBuilder.build();
    this._data = new MnistData();
  }

  async loadData() {
    await this._data.load();
    this._trainData = this._data.trainData;
    this._testData = this._data.testData;
    this._totalNumBatches = Math.ceil(
      this._trainData.xs.shape[0] * (1 - MnistModel.VALIDATION_SPLIT) / MnistModel.BATCH_SIZE
    ) * this.trainEpochs;
  }

  async train(onBatchProcessed, onEpochProcessed, onFinished) {
    // During the long-running fit() call for model training, we include
    // callbacks, so that we can plot the loss and accuracy values in the page
    // as the training progresses.
    await this._model.fit(this._trainData.xs, this._trainData.labels, {
      batchSize: MnistModel.BATCH_SIZE,
      validationSplit: MnistModel.VALIDATION_SPLIT,
      epochs: this.trainEpochs,
      callbacks: {
        onBatchEnd: (batch, logs) => this.onTrainingBatchEnd(batch, logs, onBatchProcessed),
        onEpochEnd: (epoch, logs) => this.onTrainEpochEnd(epoch, logs, onEpochProcessed)
      }
    });
    const testResult = this._model.evaluate(this._testData.xs, this._testData.labels);
    // const testAccPercent = testResult[1].dataSync()[0] * 100;
    // const finalValAccPercent = this._valAcc * 100;
    onFinished(testResult);
  }

  predict(imageData) {
    let inputTensor = tf.fromPixels(imageData, 1)
      .reshape([1, 28, 28, 1])
      .cast('float32')
      .div(tf.scalar(255));
    const predictionResult = this._model.predict(inputTensor).dataSync();

    console.log('predict - output', predictionResult);
    return predictionResult.indexOf(Math.max(...predictionResult));
  }

  async onTrainingBatchEnd(batch, logs, callback) {
    this._trainBatchCount++;
    const progress = this._trainBatchCount / this._totalNumBatches * 100;
    callback(progress, logs.loss, logs.acc);
    await tf.nextFrame();
  }

  async onTrainEpochEnd(epoch, logs, callback) {
    this._valAcc = logs.val_acc;
    callback(this._trainBatchCount, logs.loss, logs.acc);
    await tf.nextFrame();
  }
}
