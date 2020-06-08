import React from 'react'
import { Table } from 'react-bootstrap'
import SortingOrder from '../util/SortingOrder'
import AddModel from './Modals/AddModel'
import Delete from './Modals/Delete'

class VehicleModelComponent extends React.Component {

    constructor(props) {
        super(props)
        this.sortFunction = this.sortFunction.bind(this)
    }

    sortFunction(sortBy, orderBy) {
        this.props.handleSort(sortBy, orderBy)
    }

    render() {
        const { data } = this.props

        const tableRow = data.map((data) =>
            <tr>
                <td>{data.model}</td>
                <td>{data.VehicleManufacturer.manufacturer}</td>
                <td>{data.VehicleType.name}</td>
                <td>{data.petrol_variant ? "Yes" : "No"}</td>
                <td>{data.diesel_variant ? "Yes" : "No"}</td>
                <td>
                    <AddModel
                        reqType="update"
                        id={data.id}
                        model={data.model}
                        type={data.type}
                        manufacturer={data.manufacturer}
                        petrol={data.petrol_variant}
                        diesel={data.diesel_variant}
                        makerTitle={data.VehicleManufacturer.manufacturer}
                        typeTitle={data.VehicleType.name}>
                    </AddModel>
                </td>
                <td><Delete id={data.id} screen="vehicleModel"></Delete></td>
            </tr>
        )

        return (
            <div>
                <h1>Vehicle Model Page</h1>
                <AddModel reqType="add" makerTitle="Select Maker" typeTitle="Select Type"></AddModel>
                <Table bordered hover responsive condensed>
                    <thead>
                        <tr>
                            <th>Car Model<SortingOrder sortBy='model' sortFunc={this.sortFunction} /></th>
                            <th>Manufacturer<SortingOrder sortBy='manufacturer' sortFunc={this.sortFunction} /></th>
                            <th>Type of Car<SortingOrder sortBy='name' sortFunc={this.sortFunction} /></th>
                            <th>Petrol Variant<SortingOrder sortBy='petrol_variant' sortFunc={this.sortFunction} /></th>
                            <th>Diesel Variant<SortingOrder sortBy='diesel_variant' sortFunc={this.sortFunction} /></th>
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

export default VehicleModelComponent;