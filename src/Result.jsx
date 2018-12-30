import React, {Component} from 'react';
import './Result.css';

export class Result extends Component {
  render() {
    return <div className='result-component'>
      {this.isResultPresent() ? this.renderResult() : this.renderNoResult()}
    </div>;
  }

  renderResult() {
    const {digit} = this.props;
    return <div className='result'>{digit}</div>;
  }

  renderNoResult() {
    return <div className='no-result'>Recognized digit will appear here</div>;
  }

  isResultPresent() {
    const {digit} = this.props;
    return digit !== null && digit !== undefined;
  }
}