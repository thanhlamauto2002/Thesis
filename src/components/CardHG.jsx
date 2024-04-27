
import { Divider } from '@mui/material'
import TempGauge from '~/components/TempGauge'
import PressComponent from './GaugeO2';
import Typography from '@mui/material/Typography'

const CardHG = ({ data2, isExceedHG, isExceed90HG }) => {
  const getStatusClass = (status) => {
    if (status === 'Error') {
      return 'error';
    } else if (status === 'Calib') {
      return 'calib';
    } else if (status === 'Normal') {
      return 'normal';
    } else {
      return ''; // Trường hợp mặc định, bạn có thể thay đổi thành lớp CSS mặc định hoặc xử lý khác
    }
  };
  const getColor = (gas, gas90) => {
    if (gas) {
      return 'red-dashboard';
    } else if (gas90) {
      return 'orange-dashboard ';
    } else {
      return 'green-dashboard ';
    }
  };
  const colorCO = getColor(isExceedHG.CO, isExceed90HG.CO)
  const colorNO = getColor(isExceedHG.NO, isExceed90HG.NO)
  const colorSO2 = getColor(isExceedHG.SO2, isExceed90HG.SO2)
  const colorDust = getColor(isExceedHG.Dust, isExceed90HG.Dust)
  const statusClass1 = getStatusClass(data2.StatusTemp);
  const statusClass2 = getStatusClass(data2.StatusDust);
  const statusClass3 = getStatusClass(data2.StatusCO);
  const statusClass4 = getStatusClass(data2.StatusNO);
  const statusClass5 = getStatusClass(data2.StatusSO2);
  const statusClass6 = getStatusClass(data2.StatusO2);
  return (
    <div className="card-station">
      <div className="card-header">
        Hau Giang Station <label>{data2.Date}</label>
      </div>
      <Divider />
      <div className="card-body">
        <div className='gaugeTemp'>
          < TempGauge Temp={data2.Temperature} />
          <Typography variant="h6" className={statusClass1} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data2.StatusTemp}</Typography>
        </div>
        <div className='gaugeO2'>
          < PressComponent O2={data2.O2} />
          <Typography variant="h6" className={statusClass6} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data2.StatusO2}</Typography>
        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>CO</Typography>
          <Typography className={colorCO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data2.CO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass3} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusCO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>NO</Typography>
          <Typography className={colorNO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data2.NO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass4} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusNO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>SO2</Typography>
          <Typography className={colorSO2} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data2.SO2}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass5} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusSO2}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>Dust</Typography>
          <Typography className={colorDust} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data2.Dust}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass2} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data2.StatusDust}</Typography>

        </div>
      </div>
    </div >
  )
}
export default CardHG



