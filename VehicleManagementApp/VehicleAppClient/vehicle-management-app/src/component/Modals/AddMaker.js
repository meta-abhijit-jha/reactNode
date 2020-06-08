import React from 'react'
import axios from 'axios'
import { Button, Modal, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import ValidateIt from './ValidatorMain'

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
            warningMain: ''
        }

        this.renderModal = this.renderModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleCountry = this.handleCountry.bind(this)
        this.handleMakerName = this.handleMakerName.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.emptyChecker = this.emptyChecker.bind(this)
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
                warningMain: '',
                showModal: false
            })
        } else {
            this.setState({ showModal: false })
        }
    }

    emptyChecker() {
        const { manufacturer, country } = this.state
        if (!manufacturer || !country  || manufacturer.charCodeAt(0) == 32 || country.charCodeAt(0) == 32) {
            this.setState({
                warningMain: 'Please fill all the required information'
            })

            return false
        }

        return true
    }

    handleMakerName(e) {
        const warning = this.props.checkValid('manufacturer', 'addMaker', e.target.value)

        this.setState({
            warningMaker: warning,
            manufacturer: e.target.value
        })
    }

    handleCountry(e) {
        const warning = this.props.checkValid('country', 'addMaker', e.target.value)

        this.setState({
            warningCountry: warning,
            country: e.target.value
        })
    }

    handleAdd() {
        const { manufacturer, country } = this.state

        if (!this.emptyChecker()) {
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

    handleEdit() {
        const { id, manufacturer, country } = this.state

        if (!this.emptyChecker()) {
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
        const { showModal, manufacturer, country, toastMsg, warningMaker, warningCountry, warningMain } = this.state
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
                        <p className="warning">{warningMain}</p>
                        <FormControl.Static>Manufacturer:</FormControl.Static>
                        <FormControl type="text" value={manufacturer} placeholder="Enter Manufacturer's Name" onChange={this.handleMakerName} ></FormControl>
                        <small className="warning">{warningMaker}</small>

                        <FormControl.Static>Country of Origin:</FormControl.Static>
                        <FormControl type="text" value={country} placeholder="Enter Country Name" onChange={this.handleCountry} ></FormControl>
                        <small className="warning">{warningCountry}</small>
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

export default ValidateIt(AddMaker)