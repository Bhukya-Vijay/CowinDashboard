import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverageData: [],
    vaccinationByGenderData: [],
    vaccinationByAgeData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCowinData()
  }

  getCowinData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const formattedCoverageData = data.last_7_days_vaccination.map(
        eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          doseOne: eachDay.dose_1,
          doseTwo: eachDay.dose_2,
        }),
      )
      this.setState({
        vaccinationCoverageData: formattedCoverageData,
        vaccinationByGenderData: data.vaccination_by_gender,
        vaccinationByAgeData: data.vaccination_by_age,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {
      vaccinationCoverageData,
      vaccinationByAgeData,
      vaccinationByGenderData,
    } = this.state

    return (
      <div className="charts-container">
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationCoverageData}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeDetails={vaccinationByAgeData} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCharts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-card">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-name">Co-WIN</h1>
          </div>
          <h1 className="description">CoWIN Vaccination In India</h1>
          {this.renderCharts()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
