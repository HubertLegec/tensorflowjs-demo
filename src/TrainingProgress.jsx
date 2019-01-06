import React from 'react';
import { Line } from 'rc-progress';
import "./TrainingProgress.css"

export const TrainingProgress = ({progress}) => (
  <div className='progress'>
    <div className='text'>
      Training <span className='percent'>{progress.toFixed(1)}%</span> complete. To stop training, refresh or close page.
    </div>
    <Line percent={progress} />
  </div>
);
