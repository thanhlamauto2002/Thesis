import React from 'react'
import GaugeComponent from 'react-gauge-component'

function PressComponent({ Press }) {
  return (
    <div> <GaugeComponent
      type="semicircle"
      style={{ width: '320px', height: '180px', margin: '5px' }}
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        // gradient: true,
        subArcs: [
          {
            limit: 40,
            color: '#EA4228',
            showTick: true,
            tooltip: {
              text: 'Too low pressure!'
            },
            // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
            // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
            // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
          },
          {
            limit: 55,
            color: '#F5CD19',
            showTick: true,
            tooltip: {
              text: 'Low pressure!'
            }
          },
          {
            limit: 65,
            color: '#5BE12C',
            showTick: true,
            tooltip: {
              text: 'OK pressure!'
            }
          },
          {
            limit: 80, color: '#F5CD19', showTick: true,
            tooltip: {
              text: 'High pressure!'
            }
          },
          {
            color: '#EA4228',
            tooltip: {
              text: 'Too high pressure!'
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
          formatTextValue: value => 'Pressure:' + ' ' + value + 'psi', matchColorWithArc: 'true', style: { fontSize: '80px', transform: 'translate(10px, 50px)' }
        }
      }}
      value={Press}
      minValue={30}
      maxValue={100} />
    </div>
  )
}

export default PressComponent