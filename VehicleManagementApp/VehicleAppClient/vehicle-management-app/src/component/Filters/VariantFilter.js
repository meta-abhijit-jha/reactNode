import React from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

class VariantFilter extends React.Component {

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
                <strong>Variant</strong>
                <FormGroup>
                    <Checkbox inline id="petrol" onChange={this.handleCheckbox}>Petrol</Checkbox>
                    <Checkbox inline id="diesel" onChange={this.handleCheckbox}>Diesel</Checkbox>
                </FormGroup>
            </div>
        )
    }
}

export default VariantFilter;