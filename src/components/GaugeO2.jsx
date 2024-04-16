import GaugeComponent from 'react-gauge-component'
import React from 'react'

function GaugeO2({ valueO2 }) {
  return (
    <div>
      <GaugeComponent
        type="semicircle"
        style={{ width: '200px', height: '125px', margin: '5px', marginLeft: '-10px' }}
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 40,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'OK O2!'
              }
            },

            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high O2!'
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
            formatTextValue: value => 'O2:' + ' ' + value + ' ' + '%V', matchColorWithArc: 'true', style: { fontSize: '70px', transform: 'translate(0px, 28px)' }
          }
        }}
        value={valueO2}
        minValue={10}
        maxValue={80} />
    </div>
  )
}
export default GaugeO2