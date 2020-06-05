import React from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

class CountryFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemChecked: {}
        }
        
        this.handleCheckbox = this.handleCheckbox.bind(this)
    }

    handleCheckbox(e) {
        let itemChecked = this.state.itemChecked
        itemChecked[e.target.id] = e.target.checked
        
        this.setState({itemChecked})

        this.props.filterFunction(this.state.itemChecked)
    }

    render() {
        return (
            <div className="countryFilter">
                <strong>Countries</strong>
                <FormGroup>
                    <Checkbox inline id="India" onChange={this.handleCheckbox}>India</Checkbox>
                    <Checkbox inline id="South Korea" onChange={this.handleCheckbox}>South Korea</Checkbox>
                    <Checkbox inline id="US" onChange={this.handleCheckbox}>US</Checkbox>
                    <Checkbox inline id="Japan" onChange={this.handleCheckbox}>Japan</Checkbox>
                    <Checkbox inline id="Germany" onChange={this.handleCheckbox}>Germany</Checkbox>
                    <Checkbox inline id="France" onChange={this.handleCheckbox}>France</Checkbox>
                </FormGroup>
            </div>
        )
    }
}

export default CountryFilter