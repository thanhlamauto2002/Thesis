import GaugeComponent from 'react-gauge-component'
import React from 'react'

function GaugeCo({ valueCo }) {

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
              limit: 60,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'OK CO!'
              }
            },
            {
              color: '#EA4228',
              tooltip: {
                text: 'Too high CO!'
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
            formatTextValue: value => 'CO:' + ' ' + value + ' ' + 'mg/Nm3', matchColorWithArc: 'true', style: { fontSize: '93px', transform: 'translate(0px, 28px)' }
          }
        }}
        value={valueCo}
        minValue={10}
        maxValue={80} />
    </div>
  )
}
export default GaugeCo