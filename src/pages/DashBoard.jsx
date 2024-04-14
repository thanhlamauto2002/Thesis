import CardStationComponent from '~/components/CardStation'
import CardUserComponent from '~/components/CardRadar'
import CardBK from '~/components/CardBK'
import CardHG from '~/components/CardHG'
import CardTV from '~/components/CardTV'
import { Link } from 'react-router-dom'
function DashBoard({ data1, data2, data3 }) {
  return (
    <div className='dashboard-container'>
      <div className='dashboard-cards'>
        <div className='dashboard-card dashboard-card2'>
          <CardBK data1={data1} />
        </div>
        <div className='dashboard-card dashboard-card3'>
          <CardHG data2={data2} />
        </div>
        <div className='dashboard-card dashboard-card4'>
          <CardTV data3={data3} />
        </div>
      </div>
    </div>
  )
}

export default DashBoard

