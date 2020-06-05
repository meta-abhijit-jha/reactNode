const SEQ = require('sequelize')
module.exports = (sequelize) => {

    const VehicleType = sequelize.define('VehicleType', {
        id: {
            type: SEQ.INTEGER,
            primaryKey: true,
        },
        name: {
            type: SEQ.STRING
        }
    })

    return VehicleType

}