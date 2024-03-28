import RadarChart1 from '~/components/RadarChart'

const CardUserComponent = ({ data1, data2, data3 }) => {
  return (
    <div className="card-radar">
      <RadarChart1 data1={data1} data2={data2} data3={data3} />
    </div>
  )
}
export default CardUserComponent



