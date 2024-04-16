import React from 'react'
import GaugeComponent from 'react-gauge-component'

function PressComponent({ Dust }) {
  return (
    <div> <GaugeComponent
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
              text: 'OK Dust!'
            },

          },
          {
            limit: 65,
            color: '#F5CD19',
            showTick: true,
            tooltip: {
              text: 'High dust!'
            }
          },

          {
            color: '#EA4228',
            tooltip: {
              text: 'Too high dust!'
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
          formatTextValue: value => 'Dust:' + ' ' + value + ' ' + 'mg/Nm3', matchColorWithArc: 'true', style: { fontSize: '105px', transform: 'translate(0px, 28px)' }
        }
      }}
      value={Dust}
      minValue={30}
      maxValue={80} />
    </div>
  )
}

export default PressComponent