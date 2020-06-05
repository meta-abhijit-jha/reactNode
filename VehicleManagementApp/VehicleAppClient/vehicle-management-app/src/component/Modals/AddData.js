import React from 'react'
import axios from 'axios'
import { Button, Modal, FormControl, DropdownButton, MenuItem, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Validator from '../Validator'

class AddData extends React.Component {
    constructor(props) {
        super(props)
        const { id, vehiclenumber, owner_name, purchased_on, last_repaired_on, model, makerTitle, modelTitle } = this.props

        this.state = {
            showModal: false,
            models: [],
            makers: [],
            id,
            vehiclenumber,
            owner_name,
            purchased_on,
            last_repaired_on,
            model,
            makerTitle: makerTitle,
            modelTitle: modelTitle
        }

        this.renderModal = this.renderModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.getModels = this.getModels.bind(this)
        this.handleVIN = this.handleVIN.bind(this)
        this.handleOwner = this.handleOwner.bind(this)
        this.handlePurchase = this.handlePurchase.bind(this)
        this.handleRepair = this.handleRepair.bind(this)
        this.handleModel = this.handleModel.bind(this)
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
                vehiclenumber: '',
                owner_name: '',
                purchased_on: '',
                last_repaired_on: '',
                model: null,
                showModal: false,
                makerTitle: 'Select Maker',
                modelTitle: 'Select Model'
            })
        } else {
            this.setState({
                showModal: false,
                toastMsg: ''
            })
        }
    }

    handleVIN(e) {
        this.setState({
            vehiclenumber: e.target.value
        })
    }

    handleOwner(e) {
        this.setState({
            owner_name: e.target.value
        })
    }

    handlePurchase(e) {
        this.setState({
            purchased_on: e.target.value
        })
    }

    handleRepair(e) {
        this.setState({
            last_repaired_on: e.target.value
        })
    }

    handleModel(eventKey, event) {
        this.setState({
            model: eventKey,
            modelTitle: event.target.title
        })
    }

    handleAdd() {
        const { vehiclenumber, owner_name, purchased_on, last_repaired_on, model } = this.state

        axios.post('/vehicleData', {
            vehiclenumber,
            owner_name,
            purchased_on,
            last_repaired_on,
            model
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
        const { id, vehiclenumber, owner_name, purchased_on, last_repaired_on, model } = this.state

        axios.put('/vehicleData', {
            id,
            vehiclenumber,
            owner_name,
            purchased_on,
            last_repaired_on,
            model
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

    getModels(eventKey, event) {
        axios.get(`/getAllModels/${eventKey}`)
            .then((res) => {
                this.setState({
                    models: res.data.vehicles
                })
            })
        this.setState({
            makerTitle: event.target.title
        })
    }

    componentDidMount() {
        axios.get(`getAllMakers`)
            .then((res) => {
                this.setState({
                    makers: res.data.vehicles
                })
            })
    }

    //Will Update Child State whenever changes come into props
    componentDidUpdate(prevProps) {
        const { id, vehiclenumber, owner_name, purchased_on, last_repaired_on, model, modelTitle, makerTitle } = this.props

        if (this.props !== prevProps) {
            this.setState({
                id,
                vehiclenumber,
                owner_name,
                purchased_on,
                last_repaired_on,
                model,
                modelTitle,
                makerTitle
            })
        }
    }

    render() {
        const { makers, models, vehiclenumber, owner_name, purchased_on, last_repaired_on, makerTitle, modelTitle, toastMsg } = this.state
        const { reqType } = this.props
        let showButton, title, launchButton

        const menuitems = makers.map((makers) =>
            <MenuItem eventKey={makers.id} onSelect={this.getModels} title={makers.manufacturer}>{makers.manufacturer}</MenuItem>
        )
        const menuitemsModel = models.map((models) =>
            <MenuItem eventKey={models.id} onSelect={this.handleModel} title={models.model}>{models.model}</MenuItem>
        )

        const tooltip = <Tooltip id="tooltip"><strong>Click to {reqType} data</strong></Tooltip>

        if (reqType == 'add') {
            showButton = <div className="addButton"><Button bsSize="small" bsStyle="success" onClick={this.renderModal}>+</Button></div>
            title = <Modal.Title>Add Vehicle Data</Modal.Title>
            launchButton = <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
        } else {
            showButton = (<Button bsSize="xsmall" bsStyle="success" onClick={this.renderModal}>Edit</Button>)
            title = <Modal.Title>Edit Vehicle Data</Modal.Title>
            launchButton = <Button bsStyle="primary" onClick={this.handleEdit}>Update</Button>
        }

        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header>
                        {title}
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl.Static>VIN:</FormControl.Static>
                        <FormControl type="text" value={vehiclenumber} placeholder="Enter VIN" onChange={this.handleVIN}></FormControl>
                        <Validator checkFor={vehiclenumber} type="textbox"></Validator>

                        <FormControl.Static>Owner:</FormControl.Static>
                        <FormControl type="text" value={owner_name} placeholder="Enter Owner Name" onChange={this.handleOwner}></FormControl>
                        <Validator checkFor={owner_name} type="textbox"></Validator>

                        <FormControl.Static>Date of purchase:</FormControl.Static>
                        <FormControl type="text" value={purchased_on} placeholder="Enter Date of Purchase" onChange={this.handlePurchase}></FormControl>
                        <Validator checkFor={purchased_on} type="textbox"></Validator>

                        <FormControl.Static>Date of last repairing:</FormControl.Static>
                        <FormControl type="text" value={last_repaired_on} placeholder="Enter Last Repairing date" onChange={this.handleRepair}></FormControl>
                        <Validator checkFor={last_repaired_on} type="textbox"></Validator>

                        <DropdownButton bsStyle="primary" title={makerTitle}>
                            {menuitems}
                        </DropdownButton>
                        <Validator checkFor={makerTitle=='Select Maker' ? null : makerTitle} ></Validator>

                        <DropdownButton bsStyle="primary" title={modelTitle}>
                            {menuitemsModel}
                        </DropdownButton>
                        <Validator checkFor={modelTitle=='Select Model' ? null : modelTitle} ></Validator>
                    </Modal.Body>

                    <Modal.Footer>
                        <FormControl.Static>{toastMsg}</FormControl.Static>
                        {launchButton}
                        <Button bsStyle="danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <OverlayTrigger placement="top" overlay={tooltip}>
                    {showButton}
                </OverlayTrigger>
            </div>
        )
    }
}

export default AddData;