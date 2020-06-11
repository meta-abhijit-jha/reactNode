import React from 'react'
import axios from 'axios'
import { Button, Modal, FormControl, DropdownButton, MenuItem, OverlayTrigger, Tooltip } from 'react-bootstrap'
import ValidateIt from './ValidatorMain'

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
            modelTitle: modelTitle,
            warningVehicleNumber: '',
            warningOwner: '',
            warningPurchased: '',
            warningRepaired: '',
            warningMain: ''
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
        this.submitChecker = this.submitChecker.bind(this)
    }

    renderModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        if (this.props.reqType == 'add') {
            this.setState({
                vehiclenumber: '',
                owner_name: '',
                purchased_on: '',
                last_repaired_on: '',
                model: null,
                showModal: false,
                makerTitle: 'Select Maker',
                modelTitle: 'Select Model',
                warningVehicleNumber: '',
                warningOwner: '',
                warningPurchased: '',
                warningRepaired: '',
                warningMain: ''
            })
        } else {
            this.setState({
                showModal: false,
                toastMsg: ''
            })
        }
    }

    submitChecker() {
        const { vehiclenumber, owner_name, purchased_on, last_repaired_on, modelTitle, makerTitle } = this.state

        if ((this.props.checkValid('VIN', 'addData', vehiclenumber) == '')
            && (this.props.checkValid('owner', 'addData', owner_name) == '')
            && (this.props.checkValid('purchased', 'addData', purchased_on) == '')
            && (this.props.checkValid('repaired', 'addData', last_repaired_on) == '')
            && (modelTitle!='Select Model')
            && (makerTitle!='Select Maker')
        ) {
            return true
        }

        this.setState({
            warningMain: 'Please fill all the required information'
        })
        return false
    }

    handleVIN(e) {
        const warning = this.props.checkValid('VIN', 'addData', e.target.value)

        this.setState({
            vehiclenumber: e.target.value,
            warningVehicleNumber: warning
        })
    }

    handleOwner(e) {
        const warning = this.props.checkValid('owner', 'addData', e.target.value)

        this.setState({
            owner_name: e.target.value,
            warningOwner: warning
        })
    }

    handlePurchase(e) {
        const warning = this.props.checkValid('purchased', 'addData', e.target.value)

        this.setState({
            purchased_on: e.target.value,
            warningPurchased: warning
        })
    }

    handleRepair(e) {
        const warning = this.props.checkValid('repaired', 'addData', e.target.value)

        this.setState({
            last_repaired_on: e.target.value,
            warningRepaired: warning
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

        if (!this.submitChecker()) {
            return
        }

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

        if (!this.submitChecker()) {
            return
        }

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
        const { makers, models, vehiclenumber, owner_name, purchased_on, last_repaired_on, makerTitle, modelTitle, toastMsg, warningMain, warningOwner, warningRepaired, warningVehicleNumber, warningPurchased } = this.state
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
                        <p className="warning">{warningMain}</p>

                        <FormControl.Static>VIN:</FormControl.Static>
                        <FormControl type="text" value={vehiclenumber} placeholder="Enter VIN" onChange={this.handleVIN}></FormControl>
                        <small className="warning">{warningVehicleNumber}</small>

                        <FormControl.Static>Owner:</FormControl.Static>
                        <FormControl type="text" value={owner_name} placeholder="Enter Owner Name" onChange={this.handleOwner}></FormControl>
                        <small className="warning">{warningOwner}</small>

                        <FormControl.Static>Date of purchase:</FormControl.Static>
                        <FormControl type="text" value={purchased_on} placeholder="Enter Date of Purchase" onChange={this.handlePurchase}></FormControl>
                        <small className="warning">{warningPurchased}</small>

                        <FormControl.Static>Date of last repairing:</FormControl.Static>
                        <FormControl type="text" value={last_repaired_on} placeholder="Enter Last Repairing date" onChange={this.handleRepair}></FormControl>
                        <p><small className="warning">{warningRepaired}</small></p>

                        <DropdownButton bsStyle="primary" title={makerTitle}>
                            {menuitems}
                        </DropdownButton>

                        <DropdownButton bsStyle="primary" title={modelTitle}>
                            {menuitemsModel}
                        </DropdownButton>
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

export default ValidateIt(AddData)