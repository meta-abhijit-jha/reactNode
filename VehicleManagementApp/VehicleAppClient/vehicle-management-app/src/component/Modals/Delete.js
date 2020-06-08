import React, { Component } from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap'
import axios from 'axios'

class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.renderModal = this.renderModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.delete = this.delete.bind(this)
    }

    renderModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    delete() {
        const { screen, id } = this.props
        axios.delete(`${screen}/${id}`)
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

    render() {
        const { showModal } = this.state
        return (
            <div>
                <Button bsStyle="danger" bsSize="xsmall" onClick={this.renderModal}>Delete</Button>
                <Modal show={showModal} onHide={this.closeModal} >
                    <Modal.Header><strong>Are you sure?</strong></Modal.Header>
                    <Modal.Footer>
                        <FormControl.Static><small className="warning">{this.state.toastMsg}</small></FormControl.Static>
                        <Button bsStyle="danger" onClick={this.delete}>Delete</Button>
                        <Button bsStyle="primary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Delete