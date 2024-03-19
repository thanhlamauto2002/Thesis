import NavStation from '~/pages/Stations/NavStation'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'

function Station() {
  return (
    <div className="station-container">
      <div className="select-station">
        <NavStation />
      </div>
      <div className='station-home'>
      </div>
    </div>
  )
}

export default Station