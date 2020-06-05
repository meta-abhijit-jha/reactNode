const db = require('../models')
const VehicleData = db.vehicleData
const { Op } = require('sequelize')
const VehicleMaker = db.vehicleMaker
const VehicleType = db.vehicleType

//Retrieve Vehicle Data
exports.getVehicleData = (req, res) => {
    const { page, contentPerPage } = req.params
    const searchData = req.query.searchString
    let filterTypeCondition = null
    let filterArray = []
    let filterYearCondition = []
    let sortBy = []

    //Handling query string params
    for (let [key, value] of Object.entries(req.query)) {
        if (value == 'true') {
            filterArray.push(key)
        } else if ((value != 'false') && (key != 'searchString') && (key != 'sortBy') && (key != 'orderBy')) {
            filterYearCondition.push({ [Op.like]: `%${key}` })
        } else if (key == 'sortBy') {
            sortBy[0] = `${value}`
        } else if (key == 'orderBy') {
            sortBy[1] = `${value}`
        }
    }

    if (filterArray.length) {
        filterTypeCondition = { name: { [Op.or]: filterArray } }
    }

    sortBy = sortingHandler(sortBy)

    let query = require('../sequelize-helper/vehicle-data')(searchData, filterTypeCondition, filterYearCondition, sortBy)

    //handling empty queries
    if (sortBy[0] == '') {
        delete query.order
    }
    if (searchData == '') {
        delete query.where.vehiclenumber
    }

    VehicleData.findAll(query)
        .then((data) => {
            if (!data.length) {
                delete query.where.vehiclenumber
                query.where.owner_name = searchData
                return VehicleData.findAll(query)
            }
            return data
        })
        .then((data) => {
            if (!data.length) {
                delete query.where.owner_name
                query.include[0].where.model = searchData
                return VehicleData.findAll(query)
            }
            return data
        })
        .then((data) => {
            if (!data.length) {
                delete query.include[0].where.model
                query.include[0].include[0].where.manufacturer = searchData
                return VehicleData.findAll(query)
            }
            return data
        })
        .then((data) =>
            res.json({
                "vehicles": data.slice((page - 1) * contentPerPage, page * contentPerPage),
                "lastPage": countPages(data.length, contentPerPage)
            })
        )
}

//Create new row in VehicleData
exports.addVehicleData = (req, res) => {
    const { vehiclenumber, owner_name, purchased_on, last_repaired_on, model } = req.body

    if (!vehiclenumber) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        id: idGenerator(),
        vehiclenumber,
        owner_name,
        purchased_on,
        last_repaired_on,
        model
    }

    VehicleData.create(object)
        .then(data => {
            res.status(200).send({
                message: "Successfully Added"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error occurred! Duplicate data found"
            })
        })
}

exports.updateVehicleData = (req, res) => {
    const { id, vehiclenumber, owner_name, purchased_on, last_repaired_on, model } = req.body

    if (!vehiclenumber) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        vehiclenumber,
        owner_name,
        purchased_on,
        last_repaired_on,
        model
    }

    VehicleData.update(object, {
        where: {id:id}
    })
        .then(data => {
            res.status(200).send({
                message: "Update Successful"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to Update! Duplicate data found"
            })
        })
}

//Handle Sorting Functionality
function sortingHandler(sortBy) {
    let tempArray = []

    if ((sortBy[0] == 'vehiclenumber') || (sortBy[0] == 'owner_name') || (sortBy[0] == 'purchased_on') || (sortBy[0] == 'last_repaired_on')) {
        return sortBy
    } else if (sortBy[0] == 'model') {
        tempArray = ['VehicleModel', sortBy[0], sortBy[1]]
    } else if (sortBy[0] == 'manufacturer') {
        tempArray = ['VehicleModel', { model: VehicleMaker }, sortBy[0], sortBy[1]]
    } else if (sortBy[0] == 'name') {
        tempArray = ['VehicleModel', { model: VehicleType }, sortBy[0], sortBy[1]]
    } else {
        return sortBy
    }

    return tempArray
}

function countPages(totalContent, contentPerPage) {
    return Math.ceil(totalContent / contentPerPage)
}

function idGenerator() {
    return Math.floor(Math.random() * 10000) * Math.floor(Math.random() * 1000)
}

