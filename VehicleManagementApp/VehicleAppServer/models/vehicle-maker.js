const SEQ = require('sequelize')
module.exports = (sequelize) => {

    const VehicleManufacturer = sequelize.define('VehicleManufacturer', {
        id: {
            type: SEQ.INTEGER,
            primaryKey: true
        },
        manufacturer: {
            type: SEQ.STRING
        },
        country_of_origin: {
            type: SEQ.STRING
        }
    })

    return VehicleManufacturer

}