import React from 'react'
import { Table } from 'react-bootstrap'
import SortingOrder from '../util/SortingOrder'
import AddMaker from './Modals/AddMaker'
import Delete from './Modals/Delete'

class VehicleMakerComponent extends React.Component {

    constructor(props) {
        super(props)
        this.sortFunction = this.sortFunction.bind(this)
    }

    sortFunction(sortBy, orderBy) {
        this.props.handleSort(sortBy, orderBy)
    }

    render() {
        const { data, showList } = this.props

        const tableRow = data.map((data) =>
            <tr>
                <td>{data.manufacturer}</td>
                <td>{data.country_of_origin}</td>
                <td>
                    <AddMaker
                        reqType="update"
                        id={data.id}
                        manufacturer={data.manufacturer}
                        country_of_origin={data.country_of_origin}>
                    </AddMaker>
                </td>
                <td><Delete id={data.id} screen="vehicleMaker"></Delete></td>
            </tr>
        )
        
        if(!showList) {
            return (
                <div><h1>Vehicle Maker Page</h1></div>
            )
        }

        return (
            <div>
                <h1>Vehicle Maker Page</h1>
                <AddMaker reqType="add"></AddMaker>
                <Table bordered hover responsive condensed>
                    <thead>
                        <tr>
                            <th>Manufacturer<SortingOrder sortBy="manufacturer" sortFunc={this.sortFunction} /></th>
                            <th>Country of Origin<SortingOrder sortBy="country_of_origin" sortFunc={this.sortFunction} /></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{tableRow}</tbody>
                </Table>
            </div>
        )
    }
}

export default VehicleMakerComponent;