import React from 'react'
import VehicleDataComponent from './VehicleDataComponent'
import VehicleMakerComponent from './VehicleMakerComponent'
import VehicleModelComponent from './VehicleModelComponent'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Search from './Search'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: this.props.page,
      searchData: '',
      typeFilter: {},
      variantFilter: {},
      sortBy: '',
      orderBy: ''
    }

    this.displayPage = this.displayPage.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleType = this.handleType.bind(this)
    this.handleVariant = this.handleVariant.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  handleNext(e) {
    const { page, searchData, typeFilter, variantFilter, sortBy, orderBy } = this.state

    if (this.props.last > page) {
      this.setState({
        page: page + 1
      })

      this.props.fetchData(page + 1, searchData, typeFilter, variantFilter, sortBy, orderBy)
    }
  }

  handlePrevious(e) {
    const { page, searchData, typeFilter, variantFilter, sortBy, orderBy } = this.state

    if (this.props.page !== 1) {
      this.setState({
        page: page - 1
      })

      this.props.fetchData(page - 1, searchData, typeFilter, variantFilter, sortBy, orderBy)
    }
  }

  displayPage() {
    const { screen, listItems } = this.props

    if (screen === "vehData") {
      return <VehicleDataComponent data={listItems} handleSort={this.handleSort}></VehicleDataComponent>
    } else if (screen === "vehModel") {
      return <VehicleModelComponent data={listItems} handleSort={this.handleSort}></VehicleModelComponent>
    } else {
      return <VehicleMakerComponent data={listItems} handleSort={this.handleSort}></VehicleMakerComponent>
    }
  }

  handleSearch(searchInput) {
    const startPage = 1
    this.setState({
      searchData: searchInput,
      page: startPage
    })

    const { typeFilter, variantFilter, sortBy, orderBy } = this.state
    this.props.fetchData(startPage, searchInput, typeFilter, variantFilter, sortBy, orderBy)
  }

  handleType(typeFilter) {
    const startPage = 1
    this.setState({ typeFilter, page: startPage })

    const { searchData, variantFilter, sortBy, orderBy } = this.state
    this.props.fetchData(startPage, searchData, typeFilter, variantFilter, sortBy, orderBy)
  }

  handleVariant(variantFilter) {
    const startPage = 1
    this.setState({ variantFilter, page: startPage })

    const { searchData, typeFilter, sortBy, orderBy } = this.state
    this.props.fetchData(startPage, searchData, typeFilter, variantFilter, sortBy, orderBy)
  }

  handleSort(sortBy, orderBy) {
    const startPage = 1
    this.setState({
      sortBy,
      page: startPage,
      orderBy
    })

    const { searchData, typeFilter, variantFilter } = this.state
    this.props.fetchData(startPage, searchData, typeFilter, variantFilter, sortBy, orderBy)
  }

  render() {
    return (
      <div>
        {this.displayPage()}
        <div>
          <ButtonToolbar>
            <Button bsStyle="success" onClick={this.handlePrevious}>Previous</Button>
            <Button bsStyle="success" onClick={this.handleNext}>Next</Button>
          </ButtonToolbar>
          <Search searchFunc={this.handleSearch} typeFilter={this.handleType} countryFilter={this.handleType} variantFilter={this.handleVariant} screen={this.props.screen} yearFilter={this.handleVariant}></Search>
        </div>
      </div>
    )
  }
}

export default Index