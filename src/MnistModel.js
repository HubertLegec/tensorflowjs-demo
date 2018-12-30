import * as tf from '@tensorflow/tfjs';
import {MnistData} from "./MnistData";

export class MnistModel {
  static TRAIN_EPOCHS = 2;
  static VALIDATION_SPLIT = 0.15;
  // How many examples the model should "see" before making a parameter update.
  static BATCH_SIZE = 64;
  static LEARNING_RATE = 0.15;

  _model;
  _data;
  _trainBatchCount = 0;
  _valAcc;
  _trainData;
  _testData;
  _totalNumBatches;

  constructor() {
    this._model = this.buildModel();
    this._data = new MnistData();
  }

  get optimizer() {
    return tf.train.sgd(MnistModel.LEARNING_RATE);
  }

  buildModel() {
    const model = tf.sequential();
    model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }));
    model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));
    model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling'
    }));
    model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({
      units: 10,
      kernelInitializer: 'VarianceScaling',
      activation: 'softmax'
    }));
    model.compile({
      optimizer: this.optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
    return model;
  }

  async loadData() {
    await this._data.load();
    this._trainData = this._data.trainData;
    this._testData = this._data.testData;
    this._totalNumBatches = Math.ceil(
      this._trainData.xs.shape[0] * (1 - MnistModel.VALIDATION_SPLIT) / MnistModel.BATCH_SIZE
    ) * MnistModel.TRAIN_EPOCHS;
  }

  async train(onBatchProcessed, onEpochProcessed) {

    // During the long-running fit() call for model training, we include
    // callbacks, so that we can plot the loss and accuracy values in the page
    // as the training progresses.
    await this._model.fit(this._trainData.xs, this._trainData.labels, {
      batchSize: MnistModel.BATCH_SIZE,
      validationSplit: MnistModel.VALIDATION_SPLIT,
      epochs: MnistModel.TRAIN_EPOCHS,
      callbacks: {
        onBatchEnd: (batch, logs) => this.onTrainingBatchEnd(batch, logs, onBatchProcessed),
        onEpochEnd: (epoch, logs) => this.onTrainEpochEnd(epoch, logs, onEpochProcessed)
      }
    });

    const testResult = this._model.evaluate(this._testData.xs, this._testData.labels);
    const testAccPercent = testResult[1].dataSync()[0] * 100;
    const finalValAccPercent = this._valAcc * 100;
    console.log('train - end', testAccPercent, finalValAccPercent);
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