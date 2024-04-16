import GaugeComponent from 'react-gauge-component'
import React from 'react'

function GaugeSo2({ valueSo2 }) {
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
                text: 'OK SO2!'
              }
            },

            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high SO2!'
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
            formatTextValue: value => 'SO2:' + ' ' + value + ' ' + 'mg/Nm3', matchColorWithArc: 'true', style: { fontSize: '99px', transform: 'translate(0px, 28px)' }
          }
        }}
        value={valueSo2}
        minValue={10}
        maxValue={80} />
    </div>
  )
}
export default GaugeSo2