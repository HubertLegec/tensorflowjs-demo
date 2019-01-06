import React from 'react';
import "./Measure.css";

export const Measure = ({name, value}) => (
  <div className="measure">
        <div className="name">{name}</div>
        <div className="value">{value ? value.toFixed(4) : 'N/A'}</div>
    </div>
);
