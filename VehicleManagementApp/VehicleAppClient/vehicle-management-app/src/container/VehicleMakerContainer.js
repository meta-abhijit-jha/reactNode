import React from 'react'
import axios from 'axios'
import Index from '../component/Index'
import { Alert } from 'react-bootstrap'

class VehicleMakerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentPerPage: 3,
      details: [],
      page: 1,
      searchData: '',
      filterInput: {},
      moreFilter: {},
      sortBy: '',
      orderBy: '',
      warningMsg: '',
      showList: true,
    }

    this.getData = this.getData.bind(this)
    this.showAlert = this.showAlert.bind(this)
  }

  showAlert() {
    const { warningMsg } = this.state
    if (warningMsg != '') {
      return <Alert bsStyle="danger">{warningMsg}</Alert>
    }
  }

  getData(page, searchData, filterData, moreFilter, sortBy, orderBy) {

    let filterString = ''

    for (let [key, value] of Object.entries(filterData)) {
      filterString = filterString + key + '=' + value + '&'
    }

    axios.get(`/vehicleMaker/${page}/${this.state.contentPerPage}?searchString=${searchData}&${filterString}sortBy=${sortBy}&orderBy=${orderBy}`)
      .then((res) => {
        this.setState({
          page: page,
          details: res.data.vehicles,
          lastPage: res.data.lastPage,
          searchData: searchData,
          warningMsg: '',
          showList: true
        })
      }, (error) => {
        this.setState({
          warningMsg: error.response.data.message,
          showList: false
        })
      })
  }

  componentDidMount() {
    const { page, searchData, filterInput, moreFilter, sortBy, orderBy } = this.state

    this.getData(page, searchData, filterInput, moreFilter, sortBy, orderBy)
  }

  render() {
    const { page, details, lastPage, showList} = this.state

    return (
      <div>
        {this.showAlert()}
        <Index listItems={details} last={lastPage} page={page} fetchData={this.getData} screen="vehMaker" showList={showList}>
        </Index>
      </div>
    )
  }
}

export default VehicleMakerContainer;