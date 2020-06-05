import React from 'react'
import { Button } from 'react-bootstrap'
import TypeFilter from './Filters/TypeFilter'
import CountryFilter from './Filters/CountryFilter'
import VariantFilter from './Filters/VariantFilter'
import YearFilter from './Filters/YearFilter'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleTypeFilter = this.handleTypeFilter.bind(this)
        this.displayFilters = this.displayFilters.bind(this)
        this.countryFilter = this.countryFilter.bind(this)
        this.handleVariantFilter = this.handleVariantFilter.bind(this)   //for year and car variant filter

        this.state = {
            inputValue: '',
            typefilter: {},
            countryfilter: {},
            variantfilter: {},
        }
    }

    handleClick() {
        this.props.searchFunc(this.state.inputValue)
    }

    handleOnChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleTypeFilter(filterInput) {
        this.setState({
            typefilter: filterInput
        }, () => {
            this.props.typeFilter(this.state.typefilter)
        })
    }

    countryFilter(filterInput) {
        this.setState({
            countryfilter: filterInput
        }, () => {
            this.props.countryFilter(this.state.countryfilter)
        })
    }

    handleVariantFilter(filterInput) {
        this.setState({
            variantfilter: filterInput
        }, () => {
            this.props.variantFilter(this.state.variantfilter)
        })
    }

    displayFilters() {
        const { screen } = this.props

        if (screen === "vehData") {
            return (
                <div className="dataFilter">
                    <YearFilter filterFunction={this.handleVariantFilter}></YearFilter>
                    <TypeFilter filterFunction={this.handleTypeFilter}></TypeFilter>
                </div>
            )
        } else if (screen === "vehModel") {
            return (
                <div className="modelFilters">
                    <div className="childFilter"><TypeFilter filterFunction={this.handleTypeFilter}></TypeFilter></div>
                    <div className="childFilter"><VariantFilter filterFunction={this.handleVariantFilter}></VariantFilter></div>
                </div>
            )
        } else {
            return <CountryFilter filterFunction={this.countryFilter}></CountryFilter>
        }
    }

    render() {
        return (
            <div className="searchDiv">
                <span>Search Data: </span>
                <input type="text" onChange={this.handleOnChange}></input>
                <Button bsStyle="success" bsSize="small" onClick={this.handleClick}>Go</Button>
                <h3>Apply Filters:</h3>
                <div className="filters">{this.displayFilters()}</div>
            </div>
        )
    }
}

export default Search;