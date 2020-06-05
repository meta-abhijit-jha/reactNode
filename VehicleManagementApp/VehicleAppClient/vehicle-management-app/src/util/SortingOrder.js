import React from 'react'
import { Button } from 'react-bootstrap'

class SortingOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orderBy: ''
        }

        this.orderFunction = this.orderFunction.bind(this)
    }

    orderFunction(e) {
        this.setState({
            orderBy: e.target.id
        }, () => {
            this.props.sortFunc(this.props.sortBy, this.state.orderBy)
        })
    }

    render() {
        return (
            <div>
                <Button bsSize="xsmall" id="ASC" onClick={this.orderFunction}>↑</Button>
                <Button bsSize="xsmall" id="DESC" onClick={this.orderFunction}>↓</Button>
            </div>
        )
    }
}

export default SortingOrder;