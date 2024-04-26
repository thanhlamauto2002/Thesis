import React from 'react'
import GaugeComponent from 'react-gauge-component'

function PressComponent({ O2 }) {

  return (
    <div> <GaugeComponent
      type="semicircle"
      style={{ width: '220px', height: '125px', margin: '5px', marginLeft: '7px', transform: 'translate(0px, -5px)' }}
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        // gradient: true,
        subArcs: [
          {
            limit: 19.5,
            color: 'orange',
            showTick: true,
            tooltip: {
              text: 'Low O2!'
            },

          },
          {
            limit: 21,
            color: 'green',
            showTick: true,
            tooltip: {
              text: 'Normal O2!'
            },

          },
          {
            color: '#EA4228',
            tooltip: {
              text: 'High O2!'
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
          formatTextValue: value => 'O2:' + ' ' + value + ' ' + '%V', matchColorWithArc: 'true', style: { fontSize: '60px', transform: 'translate(0px, 28px)' }
        }
      }}
      value={O2}
      minValue={0}
      maxValue={25} />
    </div>
  )
}

export default PressComponent