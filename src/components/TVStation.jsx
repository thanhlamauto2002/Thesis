
import * as React from 'react'
import { useState, useEffect } from 'react'
import ChartSo2 from '~/components/ChartSo2'
import ChartCo2 from '~/components/ChartCo2'
import ChartNo2 from '~/components/ChartNo2'
import ChartO2 from '~/components/ChartO2'
import ChartTemp from '~/components/ChartTemp'
import ChartPressure from '~/components/ChartPressure'
function TraVinhComp({ data1 }) {

  return (
    <div className='chart-container'>
      <div className="grid-container">
        <div className="chart"><ChartSo2 data={data1.map(entry => ({ time: entry.time, value: entry.so2 }))} /></div>
        <div className="chart"><ChartCo2 data={data1.map(entry => ({ time: entry.time, value: entry.co }))} /></div>
        <div className="chart"><ChartNo2 data={data1.map(entry => ({ time: entry.time, value: entry.no }))} /></div>
        <div className="chart"><ChartO2 data={data1.map(entry => ({ time: entry.time, value: entry.o2 }))} /></div>
        <div className="chart"><ChartTemp data={data1.map(entry => ({ time: entry.time, value: entry.temperature }))} /></div>
        <div className="chart"><ChartPressure data={data1.map(entry => ({ time: entry.time, value: entry.dust }))} /></div>
      </div>
    </div>
  );
}


export default TraVinhComp