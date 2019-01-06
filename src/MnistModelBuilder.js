import * as tf from "@tensorflow/tfjs";

export class MnistModelBuilder {
  static LEARNING_RATE = 0.15;

  static build() {
    const model = tf.sequential();
    model.add(tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 16, activation: 'relu'}));
    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(tf.layers.maxPooling2d({poolSize: 2, strides: 2}));
    model.add(tf.layers.conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({units: 64, activation: 'relu'}));
    model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    model.compile(
      {optimizer: MnistModelBuilder.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']}
    );
    return model;
  }

  static get optimizer() {
    return tf.train.sgd(MnistModelBuilder.LEARNING_RATE);
  }
}
