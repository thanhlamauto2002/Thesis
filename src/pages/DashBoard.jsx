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
          <Link to="/bachkhoastation" className="dashboard-card-link">
            <CardBK />
          </Link>
        </div>
        <div className='dashboard-card dashboard-card3'>
          <Link to="/haugiangstation" className="dashboard-card-link">
            <CardHG />
          </Link>
        </div>
        <div className='dashboard-card dashboard-card4'>
          <Link to="/travinhstation" className="dashboard-card-link">
            <CardTV />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashBoard

