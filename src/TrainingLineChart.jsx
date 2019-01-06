import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import './TrainingLineChart.css';
import {Measure} from "./Measure";
import {lastArrayItem} from "./utils";

export const TrainingLineChartComponent = ({containerWidth, chartData, title}) => (
  <div className="training-line-chart">
    <div className='title'>{title}</div>
    <div className='measures'>
      <Measure name='Accuracy'
               value={lastArrayItem(chartData.map(v => v.accuracy))}/>
      <Measure name='Loss'
               value={lastArrayItem(chartData.map(v => v.loss))}/>
    </div>
    <ResponsiveContainer aspect={3} width={containerWidth}>
      <LineChart data={chartData}>
        <XAxis dataKey="idx"
               minTickGap={10}/>
        <YAxis yAxisId="left"
               label={{value: "Accuracy", angle: -90, position: 'insideLeft'}}/>
        <YAxis yAxisId="right"
               orientation="right"
               label={{value: "Loss", angle: -90, position: 'insideRight'}}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend/>
        <Line yAxisId="left"
              type="monotone"
              dataKey="accuracy"
              stroke="#8884d8"
              activeDot={{r: 8}}/>
        <Line yAxisId="right"
              type="monotone"
              dataKey="loss"
              stroke="#82ca9d"/>
      </LineChart>
    </ResponsiveContainer>
  </div>
);
