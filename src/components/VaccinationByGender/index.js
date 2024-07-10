import './index.css'
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props

  return (
    <div className="gender-data-card">
      <h1 className="by-gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="60%"
          cy="40%"
          data={vaccinationByGenderDetails}
          startAngle={0}
          endAngle={180}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
