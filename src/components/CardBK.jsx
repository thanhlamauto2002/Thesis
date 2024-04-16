
import { Divider } from '@mui/material'
import TempGauge from '~/components/TempGauge'
import PressComponent from './GaugeDust';
import GaugeCo from './GaugeCo';
import GaugeNo from './GaugeNo';
import GaugeSo2 from './GaugeSo2';
import GaugeO2 from './GaugeO2';
import Typography from '@mui/material/Typography'
const CardBK = ({ data1 }) => {


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
  const statusClass1 = getStatusClass(data1.StatusTemp);
  const statusClass2 = getStatusClass(data1.StatusDust);
  const statusClass3 = getStatusClass(data1.StatusCO);
  const statusClass4 = getStatusClass(data1.StatusNO);
  const statusClass5 = getStatusClass(data1.StatusSO2);
  const statusClass6 = getStatusClass(data1.StatusO2);
  return (
    <div className="card-station">
      <div className="card-header">
        Bach Khoa Station
      </div>
      <Divider />
      <div className="card-body">
        <div className='card-box'>
          < TempGauge Temp={data1.Temperature} />
          <Typography variant="h6" className={statusClass1} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusTemp}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div className='card-box'>
          < PressComponent Dust={data1.Dust} />
          <Typography variant="h6" className={statusClass2} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusDust}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeCo valueCo={data1.CO} />
          <Typography variant="h6" className={statusClass3} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusCO}</Typography> {/* Hiển thị tên của biểu đồ */}

        </div>
        <div>
          <GaugeNo valueNo={data1.NO} />
          <Typography variant="h6" className={statusClass4} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusNO} </Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeSo2 valueSo2={data1.SO2} />
          <Typography variant="h6" className={statusClass5} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusSO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
        <div>
          <GaugeO2 valueO2={data1.O2} />
          <Typography variant="h6" className={statusClass6} style={{ fontSize: '1.09rem', marginTop: '16px' }}>Signal Status: {data1.StatusO2}</Typography> {/* Hiển thị tên của biểu đồ */}
        </div>
      </div>
    </div>
  )
}
export default CardBK



