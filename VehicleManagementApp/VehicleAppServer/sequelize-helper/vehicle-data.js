const db = require('../models')
const VehicleModel = db.vehicleModel
const VehicleMaker = db.vehicleMaker
const VehicleType = db.vehicleType
const { Op } = require('sequelize')

module.exports = (searchString, filterTypeCondition, yearCondition, sortBy) => {

    return {
        where: {
            vehiclenumber: searchString,
            purchased_on: {
                [Op.or]: yearCondition
            }
        },
        order: [sortBy],
        include: [{
            model: VehicleModel,
            where: {},
            include: [{
                model: VehicleMaker,
                where: {}
            }, {
                model: VehicleType,
                where: filterTypeCondition
            }]
        }]
    }

}