import CardStationComponent from '~/components/CardStation'
import CardUserComponent from '~/components/CardUser'
import CardBK from '~/components/CardBK'
import CardHG from '~/components/CardHG'
import CardTV from '~/components/CardTV'
import { Link } from 'react-router-dom'
function DashBoard() {
  return (
    <div className='dashboard-container'>

      <div className='dashboard-card1'>
        <Link to="/usersmanage" className="dashboard-card-link">
          <CardUserComponent />
        </Link>
      </div>
      <div className='dashboard-card2'>
        <Link to="/bachkhoastation" className="dashboard-card-link">
          <CardBK />
        </Link>
      </div>
      <div className='dashboard-card3 '>
        <Link to="/haugiangstation" className="dashboard-card-link">
          <CardHG />
        </Link>
      </div>
      <div className='dashboard-card4'>
        <Link to="/travinhstation" className="dashboard-card-link">
          <CardTV />
        </Link>
      </div>
    </div >

  )
}

export default DashBoard

