import React from 'react';
import { Line } from 'rc-progress';
import "./TrainingProgress.css"

export const TrainingProgress = ({progress, currentEpoch, epochs}) => (
  <div className='progress'>
    <div className='text'>
      Training <span className='percent'>{progress.toFixed(1)}%</span> complete. Epoch {currentEpoch}/{epochs}.
      To stop training, refresh or close page.
    </div>
    <Line percent={progress} />
  </div>
);
