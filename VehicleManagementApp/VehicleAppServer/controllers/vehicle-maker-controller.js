const db = require('../models')
const VehicleMaker = db.vehicleMaker
const { Op } = require('sequelize')

//Retrieve Vehicle Manufacturers
exports.getVehicleMaker = (req, res) => {
    const { page, contentPerPage } = req.params
    const searchData = req.query.searchString
    let filterCountryCondition = null
    let filterArray = []
    let sortBy = []

    //Handling Query String Params
    for (let [key, value] of Object.entries(req.query)) {
        if (value == 'true') {
            filterArray.push(key)
        } else if (key == 'sortBy') {
            sortBy[0] = `${value}`
        } else if (key == 'orderBy') {
            sortBy[1] = `${value}`
        }
    }

    if (filterArray.length) {
        filterCountryCondition = { [Op.or]: filterArray }
    }

    let query = require('../sequelize-helper/vehicle-maker')(searchData, filterCountryCondition, sortBy)

    //handling empty queries
    if (sortBy[0] == '') {
        delete query.order
    }
    if (searchData == '') {
        delete query.where.manufacturer
    }
    if (!filterArray.length) {
        delete query.where.country_of_origin
    }

    VehicleMaker.findAll(query)
        .then((data) => {
            res.json({
                "vehicles": data.slice((page - 1) * contentPerPage, page * contentPerPage),
                "lastPage": countPages(data.length, contentPerPage),
                "lastId": data[data.length - 1].id
            })
        })
        .catch(err => {
            res.status(404).send({
                message: "Not found"
            })
        })
}

//Create new row in VehicleMaker
exports.addVehicleMaker = (req, res) => {
    const { manufacturer, country_of_origin } = req.body

    if (!manufacturer) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        id: idGenerator(),
        manufacturer,
        country_of_origin
    }

    VehicleMaker.create(object)
        .then(data => {
            res.status(200).send({
                message: "Successfully Added"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to add! Duplicate data found."
            })
        })

}

//Update row in VehicleMaker
exports.updateVehicleMaker = (req, res) => {
    const { id, manufacturer, country_of_origin } = req.body

    if (!manufacturer) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        manufacturer,
        country_of_origin
    }

    VehicleMaker.update(object, {
        where: { id: id }
    })
        .then(data => {
            res.status(200).send({
                message: "Update Successful"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to update! Duplicate data found."
            })
        })

}

//Delete in Vehicle Maker
exports.deleteVehicleMaker = (req, res) => {
    const id = req.params.id

    VehicleMaker.destroy({
        where: { id: id }
    })
        .then(data => {
            res.send({
                message: "Deleted Successfully"
            })

        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete because associate data still exist. If you want to delete, then remove associated data from other pages first."
            })
        })
}

function countPages(totalContent, contentPerPage) {
    return Math.ceil(totalContent / contentPerPage)
}

function idGenerator() {
    return Math.floor(Math.random() * 10000) * Math.floor(Math.random() * 1000)
}