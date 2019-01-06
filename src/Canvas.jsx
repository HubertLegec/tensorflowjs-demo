import React, {Component} from 'react';
import {SketchField, Tools} from 'react-sketch';
import Dimensions from 'react-dimensions';
import "./Canvas.css"


class CanvasComponent extends Component {
  _sketch = null;

  render() {
    const {containerWidth, disabled} = this.props;
    const canvasSize = `${containerWidth - 16}px`;
    return <div className='canvas'>
      <header className='canvas-header'>Write your digit below:</header>
      <SketchField width={canvasSize}
                   height={canvasSize}
                   tool={Tools.Pencil}
                   backgroundColor='#ffffff'
                   lineColor='black'
                   lineWidth={50}
                   ref={c => (this._sketch = c)}/>
      <div className='canvas-actions'>
        <button disabled={disabled} onClick={this.onClearClick}>Clear</button>
        <button disabled={disabled} onClick={this.onRecognizeClick}>Recognize</button>
      </div>
    </div>;
  }

  onClearClick = () => {
    const {onNewImage} = this.props;
    this._sketch.clear();
    onNewImage(undefined);
  };

  onRecognizeClick = () => {
    const {onNewImage} = this.props;
    const image = this.sketchImage;
    onNewImage(image);
  };

  get sketchImage() {
    return this._sketch.toDataURL();
  }
}

export const Canvas = Dimensions()(CanvasComponent);
