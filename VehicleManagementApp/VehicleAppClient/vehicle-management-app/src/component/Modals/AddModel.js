import React from 'react'
import axios from 'axios'
import { Button, Modal, FormControl, DropdownButton, MenuItem, Checkbox, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Validator from '../Validator'

class AddModel extends React.Component {
    constructor(props) {
        super(props)
        const { id, model, petrol, diesel, manufacturer, type, makerTitle, typeTitle } = this.props

        this.state = {
            showModal: false,
            makers: [],
            types: [],
            id,
            model,
            manufacturer,
            type,
            petrol_variant: petrol,
            diesel_variant: diesel,
            makerTitle,
            typeTitle
        }

        this.renderModal = this.renderModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleMaker = this.handleMaker.bind(this)
        this.handleType = this.handleType.bind(this)
        this.handleModel = this.handleModel.bind(this)
        this.handleVariant = this.handleVariant.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    renderModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        if (this.props.reqType == 'post') {
            this.setState({
                model: '',
                manufacturer: null,
                type: null,
                petrol_variant: false,
                diesel_variant: false,
                showModal: false
            })
        } else {
            this.setState({
                showModal: false,
                toastMsg: ''
            })
        }
    }

    handleMaker(eventKey, event) {
        this.setState({
            manufacturer: eventKey,
            makerTitle: event.target.title
        })
    }

    handleType(eventKey, event) {
        this.setState({
            type: eventKey,
            typeTitle: event.target.title
        })
    }

    handleModel(e) {
        this.setState({
            model: e.target.value
        })
    }

    handleVariant(e) {
        this.setState({
            [e.target.id]: e.target.checked
        })
    }

    handleAdd() {
        const { model, manufacturer, type, petrol_variant, diesel_variant } = this.state

        axios.post('/vehicleModel', {
            model,
            manufacturer,
            type,
            petrol_variant,
            diesel_variant
        })
            .then((response) => {
                this.setState({
                    toastMsg: response.data.message
                })
            }, (error) => {
                this.setState({
                    toastMsg: error.response.data.message
                })
            })
    }

    handleEdit() {
        const { id, model, manufacturer, type, petrol_variant, diesel_variant} = this.state

        axios.put('/vehicleModel', {
            id,
            model,
            manufacturer,
            type,
            petrol_variant,
            diesel_variant
        })
            .then((response) => {
                this.setState({
                    toastMsg: response.data.message
                })
            }, (error) => {
                this.setState({
                    toastMsg: error.response.data.message
                })
            })
    }

    componentDidMount() {
        axios.get(`/getAllMakers`)
            .then((res) => {
                this.setState({
                    makers: res.data.vehicles
                })
            })

        axios.get(`/getAllTypes`)
            .then((res) => {
                this.setState({
                    types: res.data.vehicles
                })
            })
    }

    //Will Update Child State whenever changes come into props
    componentDidUpdate(prevProps) {
        const { id, model, petrol, diesel, manufacturer, type, makerTitle, typeTitle } = this.props

        if (this.props !== prevProps) {
            this.setState({
                id,
                model,
                petrol_variant: petrol,
                diesel_variant: diesel,
                manufacturer,
                type,
                makerTitle,
                typeTitle
            })
        }
    }

    render() {
        const { makers, types, makerTitle, typeTitle, model, showModal, toastMsg, petrol_variant, diesel_variant, manufacturer, type } = this.state
        const { reqType } = this.props
        let showButton, title, launchButton

        const menuitems = makers.map((makers) =>
            <MenuItem eventKey={makers.id} onSelect={this.handleMaker} title={makers.manufacturer}>{makers.manufacturer}</MenuItem>
        )
        const menuitemsType = types.map((types) =>
            <MenuItem eventKey={types.id} onSelect={this.handleType} title={types.name}>{types.name}</MenuItem>
        )

        const tooltip = <Tooltip id="tooltip"><strong>Click to {reqType} data</strong></Tooltip>

        if (reqType == 'add') {
            showButton = (<div className="addButton"><Button bsStyle="success" bsSize="small" onClick={this.renderModal}>+</Button></div>)
            title = <Modal.Title>Add Vehicle Model</Modal.Title>
            launchButton = <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
        } else {
            showButton = (<Button bsSize="xsmall" bsStyle="success" onClick={this.renderModal}>Edit</Button>)
            title = <Modal.Title>Edit Vehicle Model</Modal.Title>
            launchButton = <Button bsStyle="primary" onClick={this.handleEdit}>Update</Button>
        }

        return (
            <div>
                <OverlayTrigger placement="top" overlay={tooltip}>
                    {showButton}
                </OverlayTrigger>
                <Modal show={showModal} onHide={this.closeModal}>
                    <Modal.Header>
                        {title}
                    </Modal.Header>

                    <Modal.Body>
                        <DropdownButton bsStyle="primary" title={makerTitle}>
                            {menuitems}
                        </DropdownButton>
                        <Validator checkFor={manufacturer}></Validator>

                        <DropdownButton bsStyle="primary" title={typeTitle}>
                            {menuitemsType}
                        </DropdownButton>
                        <Validator checkFor={type}></Validator>

                        <FormControl.Static>Model Name:</FormControl.Static>
                        <FormControl type="text" value={model} placeholder="Enter Model" onChange={this.handleModel}></FormControl>
                        <Validator checkFor={model} type="textbox"></Validator>

                        <FormControl.Static>Select Variant(s):</FormControl.Static>
                        <FormGroup>
                            <Checkbox inline id="petrol_variant" onChange={this.handleVariant} checked={petrol_variant}>Petrol</Checkbox>
                            <Checkbox inline id="diesel_variant" onChange={this.handleVariant} checked={diesel_variant}>Diesel</Checkbox>
                            <Validator checkFor={petrol_variant || diesel_variant}></Validator>
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <FormControl.Static>{toastMsg}</FormControl.Static>
                        {launchButton}
                        <Button bsStyle="danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default AddModel;