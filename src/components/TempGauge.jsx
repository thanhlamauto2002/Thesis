import GaugeComponent from 'react-gauge-component'
import React from 'react'

function TempGauge({ Temp }) {
  return (
    <div>
      <GaugeComponent
        type="semicircle"
        style={{ width: '220px', height: '125px', margin: '5px', marginLeft: '7px', transform: 'translate(0px, -5px)' }}
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 25,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'Low temperature!'
              }
            },
            {
              limit: 40,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'OK temperature!'
              }
            },
            {
              limit: 60, color: 'orange', showTick: true,
              tooltip: {
                text: 'High temperature!'
              }
            },
            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high temperature!'
              }
            }
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.80,
          width: 15,
          // elastic: true,
        }}
        labels={{
          valueLabel: {
            formatTextValue: value => 'Temperature:' + ' ' + value + ' ' + 'ºC', matchColorWithArc: 'true', style: { fontSize: '122px', transform: 'translate(0px, 28px)' }
          }
        }}
        value={Temp}
        minValue={10}
        maxValue={100} />
    </div>
  )
}
export default TempGauge