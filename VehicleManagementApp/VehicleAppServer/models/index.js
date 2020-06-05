const dbConfig = require('../config/db-config')
const Sequelize = require('sequelize')

const { DB, USER, PASSWORD, HOST, dialect } = dbConfig

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.vehicleData = require('./vehicle-data')(sequelize)
db.vehicleModel = require('./vehicle-model')(sequelize)
db.vehicleMaker = require('./vehicle-maker')(sequelize)
db.vehicleType = require('./vehicle-type')(sequelize)

//Associations
db.vehicleMaker.hasMany(db.vehicleModel, {
    foreignKey: 'manufacturer'
})
db.vehicleModel.belongsTo(db.vehicleMaker, {
    foreignKey: 'manufacturer'
})
db.vehicleModel.hasMany(db.vehicleData, {
    foreignKey: 'model'
})
db.vehicleData.belongsTo(db.vehicleModel, {
    foreignKey: 'model'
})
db.vehicleType.hasOne(db.vehicleModel, {
    foreignKey: 'type'
})
db.vehicleModel.belongsTo(db.vehicleType, {
    foreignKey: 'type'
})

module.exports = db