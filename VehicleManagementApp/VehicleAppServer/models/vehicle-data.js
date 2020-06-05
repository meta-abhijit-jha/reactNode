const SEQ = require('sequelize')
module.exports = (sequelize) => {

    const VehicleData = sequelize.define('VehicleData', {
        id: {
            type: SEQ.INTEGER,
            primaryKey: true,
        },
        vehiclenumber: {
            type: SEQ.STRING
        },
        owner_name: {
            type: SEQ.STRING
        },
        purchased_on: {
            type: SEQ.STRING
        },
        last_repaired_on: {
            type: SEQ.STRING
        },
        model: {
            type: SEQ.INTEGER
        }
    })

    return VehicleData

}