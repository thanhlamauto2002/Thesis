import GaugeComponent from 'react-gauge-component'
import React from 'react'

function GaugeNo({ valueNo }) {
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
                text: 'OK NO!'
              }
            },

            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high NO!'
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
            formatTextValue: value => 'NO:' + ' ' + value + ' ' + 'mg/Nm3', matchColorWithArc: 'true', style: { fontSize: '87px', transform: 'translate(0px, 28px)' }
          }
        }}
        value={valueNo}
        minValue={10}
        maxValue={80} />
    </div>
  )
}
export default GaugeNo