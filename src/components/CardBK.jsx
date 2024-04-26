
import { Divider } from '@mui/material'
import TempGauge from '~/components/TempGauge'
import PressComponent from './GaugeO2';
import Typography from '@mui/material/Typography'
const CardBK = ({ data1, isExceedBK, isExceed90BK }) => {


  // Hàm để trả về lớp CSS dựa trên trạng thái
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
  const colorCO = getColor(isExceedBK.CO, isExceed90BK.CO)
  const colorNO = getColor(isExceedBK.NO, isExceed90BK.NO)
  const colorSO2 = getColor(isExceedBK.SO2, isExceed90BK.SO2)
  const colorDust = getColor(isExceedBK.Dust, isExceed90BK.Dust)

  const statusClass1 = getStatusClass(data1.StatusTemp);
  const statusClass2 = getStatusClass(data1.StatusDust);
  const statusClass3 = getStatusClass(data1.StatusCO);
  const statusClass4 = getStatusClass(data1.StatusNO);
  const statusClass5 = getStatusClass(data1.StatusSO2);
  const statusClass6 = getStatusClass(data1.StatusO2);
  return (
    <div className="card-station">
      <div className="card-header">
        Bach Khoa Station <label>{data1.Date}</label>
      </div>
      <Divider />
      <div className="card-body">
        <div className='gaugeTemp'>
          < TempGauge Temp={data1.Temperature} />
          <Typography variant="h6" className={statusClass1} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data1.StatusTemp}</Typography>
        </div>
        <div className='gaugeO2'>
          < PressComponent O2={data1.O2} />
          <Typography variant="h6" className={statusClass2} style={{ fontSize: '1.09rem', transform: 'translate(0px, -10px)' }}>Signal Status: {data1.StatusO2}</Typography>
        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>CO</Typography>
          <Typography className={colorCO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data1.CO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass3} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusCO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>NO</Typography>
          <Typography className={colorNO} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data1.NO}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass4} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusNO}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>SO2</Typography>
          <Typography className={colorSO2} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data1.SO2}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass5} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusSO2}</Typography>

        </div>
        <div className='infoAir'>
          <Typography variant="h5" style={{ fontWeight: 'bolder', color: 'black' }}>Dust</Typography>
          <Typography className={colorDust} variant="h5" style={{ fontSize: '1.8rem', fontWeight: 'bolder' }}>{data1.Dust}</Typography>
          <Typography variant="h6" style={{ fontSize: '1.09rem', color: 'black' }}>mg/Nm3</Typography>
          <Typography variant="h6" className={statusClass6} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusDust}</Typography>

        </div>
      </div>
    </div >
  )
}
export default CardBK



