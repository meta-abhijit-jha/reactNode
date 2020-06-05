const db = require('../models')
const VehicleMaker = db.vehicleMaker
const VehicleType = db.vehicleType
const { Op } = require('sequelize')

module.exports = (searchString, filterTypeCondition, sortBy) => {

    return {
        where: {
            model: searchString,    //model is name of model
            petrol_variant: true,
            diesel_variant: true
        },
        order: [sortBy],
        include: [{
            model: VehicleMaker,   //model is property of include
            where: {}
        }, {
            model: VehicleType,
            where: filterTypeCondition
        }]
    }

}