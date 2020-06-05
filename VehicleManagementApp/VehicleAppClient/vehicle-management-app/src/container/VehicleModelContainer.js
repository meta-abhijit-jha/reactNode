import React from 'react'
import axios from 'axios'
import Index from '../component/Index'

class VehicleModelContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentPerPage: 5,
      details: [],
      page: 1,
      searchData: '',
      filterType: {},
      filterVariant: {},
      sortBy: '',
      orderBy: ''
    }

    this.getData = this.getData.bind(this)
  }


  getData(page, searchData, filterType, filterVariant, sortBy, orderBy) {
    let filterString = ''

    for (let [key, value] of Object.entries(filterType)) {
      filterString = filterString + key + '=' + value + '&'
    }

    for (let [key, value] of Object.entries(filterVariant)) {
      filterString = filterString + key + '=' + value + '&'
    }

    axios.get(`/vehicleModel/${page}/${this.state.contentPerPage}?searchString=${searchData}&${filterString}sortBy=${sortBy}&orderBy=${orderBy}`)
      .then((res) => {
        this.setState({
          page: page,
          details: res.data.vehicles,
          lastPage: res.data.lastPage,
          searchData: searchData
        })
      })
  }

  componentDidMount() {
    const {page, searchData, filterType, filterVariant, sortBy, orderBy} = this.state

    this.getData(page, searchData, filterType, filterVariant, sortBy, orderBy)
  }

  render() {
    const { page, details, lastPage } = this.state

    return (
      <div>
        <Index listItems={details} last={lastPage} page={page} fetchData={this.getData} screen="vehModel">
        </Index>
      </div>
    )
  }
}

export default VehicleModelContainer;