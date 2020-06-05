import React from 'react'
import axios from 'axios'
import { Button, Modal, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Validator from '../Validator'

class AddMaker extends React.Component {
    constructor(props) {
        super(props)

        const { id, manufacturer, country_of_origin } = this.props

        this.state = {
            showModal: false,
            id: id,
            manufacturer: manufacturer,
            country: country_of_origin,
            buttonStatus: true,
            warningMaker: '',
            warningCountry: '',
            validCount: 0
        }

        this.renderModal = this.renderModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleCountry = this.handleCountry.bind(this)
        this.handleMakerName = this.handleMakerName.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleValidation = this.handleValidation.bind(this)
    }

    renderModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        if (this.props.reqType == 'add') {
            this.setState({
                manufacturer: '',
                country: '',
                toastMsg: '',
                warningCountry: '',
                warningMaker: '',
                showModal: false
            })
        } else {
            this.setState({ showModal: false })
        }
    }

    handleMakerName(e) {
        this.setState({
            manufacturer: e.target.value
        })
    }

    handleCountry(e) {
        this.setState({
            country: e.target.value
        })
    }

   handleAdd() {
        const { manufacturer, country } = this.state
        const obj = { manufacturer, country }
        const validFor = 2

        this.handleValidation(obj)

        if (this.state.validCount != validFor) {
            return
        }

        axios.post('/vehicleMaker', {
            manufacturer,
            country_of_origin: country
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

    handleValidation(obj) {
        const validity = require('../../util/validator')(obj, "addMaker")
        const { manufacturer, country, validCount } = validity
        this.setState({
            warningMaker: manufacturer,
            warningCountry: country,
            validCount
        })
    }

    handleEdit() {
        const { id, manufacturer, country } = this.state
        const obj = { manufacturer, country }
        const validFor = 2

        this.handleValidation(obj)

        if (this.state.validCount != validFor) {
            return
        }

        axios.put('/vehicleMaker', {
            id,
            manufacturer,
            country_of_origin: country
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

    //Will Update Child State whenever changes come into props
    componentDidUpdate(prevProps) {
        const { id, manufacturer, country_of_origin } = this.props

        if (this.props !== prevProps) {
            this.setState({
                id,
                manufacturer,
                country: country_of_origin
            })
        }
    }

    render() {
        const { reqType } = this.props
        const { showModal, manufacturer, country, toastMsg, warningMaker, warningCountry } = this.state
        let showButton, title, launchButton
        const tooltip = <Tooltip id="tooltip"><strong>Click to {reqType} data</strong></Tooltip>

        if (reqType == 'add') {
            showButton = (<div className="addButton"><Button bsSize="small" bsStyle="success" onClick={this.renderModal}>+</Button></div>)
            title = <Modal.Title>Add Vehicle Maker</Modal.Title>
            launchButton = <Button bsStyle="primary" onClick={this.handleAdd}>Add</Button>
        } else {
            showButton = (<Button bsSize="xsmall" bsStyle="success" onClick={this.renderModal}>Edit</Button>)
            title = <Modal.Title>Edit Vehicle Maker</Modal.Title>
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
                        <FormControl.Static>Manufacturer:</FormControl.Static>
                        <FormControl type="text" value={manufacturer} placeholder="Enter Manufacturer's Name" onChange={this.handleMakerName} ></FormControl>
                        <small>{warningMaker}</small>

                        <FormControl.Static>Country of Origin:</FormControl.Static>
                        <FormControl type="text" value={country} placeholder="Enter Country Name" onChange={this.handleCountry} ></FormControl>
                        <small>{warningCountry}</small>
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

export default AddMaker;