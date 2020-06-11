import React from 'react'
import { DropdownButton, Checkbox } from 'react-bootstrap'

class YearFilter extends React.Component {

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

        this.setState({ itemChecked })

        this.props.filterFunction(this.state.itemChecked)
    }

    render() {
        return (
            <div>
                <DropdownButton bsStyle="default" title="Year of Purchase">
                    <div className="dropdownCheckbox">
                        <Checkbox id="2016" onChange={this.handleCheckbox}>2016</Checkbox>
                        <Checkbox id="2017" onChange={this.handleCheckbox}>2017</Checkbox>
                        <Checkbox id="2018" onChange={this.handleCheckbox}>2018</Checkbox>
                        <Checkbox id="2019" onChange={this.handleCheckbox}>2019</Checkbox>
                        <Checkbox id="2020" onChange={this.handleCheckbox}>2020</Checkbox>
                    </div>
                </DropdownButton>
            </div>
        )
    }
}

export default YearFilter;