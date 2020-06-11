import React from 'react'
import { Table } from 'react-bootstrap'
import SortingOrder from '../util/SortingOrder'
import AddData from './Modals/AddData'
import Delete from './Modals/Delete'

class VehicleDataComponent extends React.Component {

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
                <td>{data.vehiclenumber}</td>
                <td>{data.owner_name}</td>
                <td>{data.purchased_on}</td>
                <td>{data.last_repaired_on}</td>
                <td>{data.VehicleModel.model}</td>
                <td>{data.VehicleModel.VehicleManufacturer.manufacturer}</td>
                <td>{data.VehicleModel.VehicleType.name}</td>
                <td>
                    <AddData
                        reqType="update"
                        id={data.id}
                        vehiclenumber={data.vehiclenumber}
                        owner_name={data.owner_name}
                        purchased_on={data.purchased_on}
                        last_repaired_on={data.last_repaired_on}
                        model={data.model}
                        modelTitle={data.VehicleModel.model}
                        makerTitle="Select Maker">
                    </AddData>
                </td>
                <td><Delete id={data.id} screen="vehicleData"></Delete></td>
            </tr>
        )

        if(!showList) {
            return (
                <div><h1>Vehicle Data Page</h1></div>
            )
        }

        return (
            <div>
                <h1>Vehicle Data Page</h1>
                <AddData reqType='add' modelTitle='Select Model' makerTitle='Select Maker'></AddData>
                <Table bordered hover responsive condensed>
                    <thead>
                        <tr>
                            <th>VIN<SortingOrder sortBy="vehiclenumber" sortFunc={this.sortFunction} /></th>
                            <th>Owner<SortingOrder sortBy="owner_name" sortFunc={this.sortFunction} /></th>
                            <th>Date of Purchase<SortingOrder sortBy="purchased_on" sortFunc={this.sortFunction} /></th>
                            <th>Last Repairing Date<SortingOrder sortBy="last_repaired_on" sortFunc={this.sortFunction} /></th>
                            <th>Vehicle Model<SortingOrder sortBy="model" sortFunc={this.sortFunction} /></th>
                            <th>Vehicle Manufacturer<SortingOrder sortBy="manufacturer" sortFunc={this.sortFunction} /></th>
                            <th>Vehicle Type<SortingOrder sortBy="name" sortFunc={this.sortFunction} /></th>
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

export default VehicleDataComponent;