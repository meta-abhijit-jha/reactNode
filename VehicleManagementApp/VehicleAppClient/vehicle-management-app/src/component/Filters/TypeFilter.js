import React from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

class TypeFilter extends React.Component {

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
            <div>
                <strong>Vehicle Type</strong>
                <FormGroup>
                    <Checkbox inline id="Hatchback" onChange={this.handleCheckbox}>Hatchback</Checkbox>
                    <Checkbox inline id="Sedan" onChange={this.handleCheckbox}>Sedan</Checkbox>
                    <Checkbox inline id="SUV" onChange={this.handleCheckbox}>SUV</Checkbox>
                    <Checkbox inline id="MUV" onChange={this.handleCheckbox}>MUV</Checkbox>
                    <Checkbox inline id="Luxury" onChange={this.handleCheckbox}>Luxury</Checkbox>
                </FormGroup>
            </div>
        )
    }
}

export default TypeFilter;