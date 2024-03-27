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
import UserManagement from '~/pages/UserManagement'
import AlarmBK from '~/pages/AlarmBK'
import AlarmHG from '~/pages/AlarmHG'
import AlarmTV from '~/pages/AlarmTV'
const AppRoute = ({ data1, data2, data3 }) => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stations' element={<Station />} />
        <Route path='/maps' element={<Map />} />
        <Route path='/alarm' element={<Alarm data1={data1} data2={data2} data3={data3} />} />
        <Route path='/login' element={<Login1 />} />
        <Route path='/report' element={<Report />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/usersmanage' element={<UserManagement />} />
        <Route path='/bachkhoastation' element={<BachKhoa data1={data1} />} />
        <Route path='/haugiangstation' element={<HauGiang data1={data2} />} />
        <Route path='/travinhstation' element={<TraVinh data1={data3} />} />
        {/* <Route path='/alarmbk' element={<AlarmBK />} />
        <Route path='/alarmhg' element={<AlarmHG />} />
        <Route path='/alarmtv' element={<AlarmTV  />} /> */}
      </Routes>
    </>
  )
}
export default AppRoute
