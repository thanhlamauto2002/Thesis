import CardStationComponent from '~/components/CardStation'
import CardUserComponent from '~/components/CardRadar'
import CardBK from '~/components/CardBK'
import CardHG from '~/components/CardHG'
import CardTV from '~/components/CardTV'
import { Link } from 'react-router-dom'
function DashBoard({ data1, data2, data3 }) {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-card1'>
        <CardUserComponent data1={data1} data2={data2} data3={data3} />
      </div>
      <div className='dashboard-cards'>
        <div className='dashboard-card dashboard-card2'>
          <CardBK temp={data1.Temperature} press={data1.Pressure} />
        </div>
        <div className='dashboard-card dashboard-card3'>
          <CardHG temp={data2.Temperature} press={data2.Pressure} />
        </div>
        <div className='dashboard-card dashboard-card4'>
          <CardTV temp={data3.Temperature} press={data3.Pressure} />
        </div>
      </div>
    </div>
  )
}

export default DashBoard

