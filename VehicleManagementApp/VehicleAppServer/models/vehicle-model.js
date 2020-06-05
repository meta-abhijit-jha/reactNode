const SEQ = require('sequelize')
module.exports = (sequelize) => {

    const VehicleModel = sequelize.define('VehicleModel', {
        id: {
            type: SEQ.INTEGER,
            primaryKey: true,
        },
        model: {
            type: SEQ.STRING
        },
        manufacturer: {
            type: SEQ.INTEGER
        },
        type: {
            type: SEQ.INTEGER
        },
        petrol_variant: {
            type: SEQ.BOOLEAN
        },
        diesel_variant: {
            type: SEQ.BOOLEAN
        }
    })

    return VehicleModel

}