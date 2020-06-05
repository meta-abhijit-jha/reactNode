const db = require('../models')
const VehicleMaker = db.vehicleMaker
const VehicleModel = db.vehicleModel
const VehicleType = db.vehicleType

//Retrieve All Vehicle Models
exports.getAllModels = (req, res) => {
    const { makerId } = req.params

    VehicleModel.findAll({
        where: {
            manufacturer: makerId
        }
    })
        .then((data) => {
            res.json({
                "vehicles": data
            })
        })
}

//Retrieve All Vehicle Manufacturers
exports.getAllMakers = (req, res) => {

    VehicleMaker.findAll()
        .then((data) => {
            res.json({
                "vehicles": data
            })
        })
}

//Retrieve All Vehicle Types
exports.getAllTypes = (req, res) => {
     const { typeId } = req.params
     let condition = typeId ? {id: typeId} : null

    VehicleType.findAll({
        where: condition
    })
        .then((data) => {
            res.json({
                "vehicles": data
            })
        })
}