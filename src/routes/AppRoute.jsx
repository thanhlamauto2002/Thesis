import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'
import Station from '~/pages/Stations/Station1'
import Map from '~/pages/Map1'
import Login1 from '~/pages/LoginForm/Login1'
import Home from '~/pages/Home1'
import BachKhoa from '~/pages/BachKhoa'
import HauGiang from '~/pages/HauGiang'
import TraVinh from '~/pages/TraVinh'
import Alarm from '~/pages/Alarm'
import Report from '~/pages/report'
import DashBoard from '~/pages/DashBoard'
import SideBar from '~/components/SideBar'
const AppRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stations' element={<Station />} />
        <Route path='/maps' element={<Map />} />
        <Route path='/alarm' element={<Alarm />} />
        <Route path='/login' element={<Login1 />} />
        <Route path='/report' element={<Report />} />
        <Route path='/dashboard' element={<DashBoard />} />
        {/* <Route path='/bachkhoastation' element={<BachKhoa />} />
      <Route path='/haugiangstation' element={<HauGiang />} />
      <Route path='/travinhstation' element={<TraVinh />} /> */}
      </Routes>
    </>
  )
}
export default AppRoute
