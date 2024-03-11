import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'

function HauGiang() {
  return (
    <div className='chart-container'>
      <div className='row'>
        <div className='col'>
          <Typography className='titlte'>SO2</Typography>
          <LineChart className='chart1'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: 'Time' }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
        <div className='col'>
          <Typography className='titlte'>CO2</Typography>
          <LineChart className='chart2'
            title='CO2'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
        <div className='col'>
          <Typography className='titlte'>NO2</Typography>
          <LineChart className='chart3'
            title='NO2'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Typography className='titlte'>CO</Typography>
          <LineChart className='chart4'
            title='CO'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
        <div className='col'>
          <Typography className='titlte'>NO</Typography>
          <LineChart className='chart5'
            title='NO'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
        <div className='col'>
          <Typography className='titlte'>H2S</Typography>
          <LineChart className='chart6'
            title='H2S'
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
            series={[
              {
                data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                showMark: ({ index }) => index % 2 === 0
              }
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}
export default HauGiang