import {layers, sequential, train} from "@tensorflow/tfjs";
const {conv2d, maxPooling2d, flatten, dense} = layers;

export class MnistModelBuilder {
  static LEARNING_RATE = 0.15;

  static build() {
    const model = sequential();
    model.add(conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 16, activation: 'relu'}));
    model.add(maxPooling2d({poolSize: 2, strides: 2}));
    model.add(conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(maxPooling2d({poolSize: 2, strides: 2}));
    model.add(conv2d({kernelSize: 3, filters: 32, activation: 'relu'}));
    model.add(flatten());
    model.add(dense({units: 64, activation: 'relu'}));
    model.add(dense({units: 10, activation: 'softmax'}));
    model.compile(
      {optimizer: MnistModelBuilder.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']}
    );
    return model;
  }

  static get optimizer() {
    return train.sgd(MnistModelBuilder.LEARNING_RATE);
  }
}
