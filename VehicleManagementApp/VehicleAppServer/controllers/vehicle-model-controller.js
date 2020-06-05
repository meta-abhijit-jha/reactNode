const db = require('../models')
const VehicleModel = db.vehicleModel
const { Op } = require('sequelize')

//Retrieve Vehicle Models
exports.getVehicleModel = (req, res) => {
    const { page, contentPerPage } = req.params
    const searchData = req.query.searchString
    let filterTypeCondition = null
    let sortBy = []

    //array which will store filters
    let filterArray = []
    let filterVariantArray = [false, false]

    //Handling Query String Params
    for (let [key, value] of Object.entries(req.query)) {
        if (value == 'true') {
            if (key == 'petrol') {
                filterVariantArray[0] = true
            }
            if (key == 'diesel') {
                filterVariantArray[1] = true
            }
            if ((key != 'petrol') && (key != 'diesel')) {
                filterArray.push(key)
            }
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

    let query = require('../sequelize-helper/vehicle-model')(searchData, filterTypeCondition, sortBy)

    //handling empty queries
    if (sortBy[0] == '') {
        delete query.order
    }
    if (searchData == '') {
        delete query.where.model
    }

    //handling variant filter
    variantFilter(filterVariantArray, query)

    VehicleModel.findAll(query)
        .then((data) => {
            if (!data.length) {
                delete query.where.model
                query.include[0].where.manufacturer = searchData
                return VehicleModel.findAll(query, filterTypeCondition, sortBy)
            }
            return data
        })
        .then((data) =>
            res.json({
                "vehicles": data.slice((page - 1) * contentPerPage, page * contentPerPage),
                "lastPage": countPages(data.length, contentPerPage),
                "lastId": data[data.length - 1].id
            })
        )
}

//Create new row in VehicleModel
exports.addVehicleModel = (req, res) => {
    const { model, manufacturer, type, petrol_variant, diesel_variant } = req.body

    if (!model) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        id: idGenerator(),
        model,
        manufacturer,
        type,
        petrol_variant,
        diesel_variant
    }

    VehicleModel.create(object)
        .then(data => {
            res.status(200).send({
                message: "Successfully Added"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Not added! Duplicate data found."
            })
        })

}

//Create new row in VehicleModel
exports.updateVehicleModel = (req, res) => {
    const { id, model, manufacturer, type, petrol_variant, diesel_variant } = req.body

    if (!model) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return
    }

    const object = {
        model,
        manufacturer,
        type,
        petrol_variant,
        diesel_variant
    }

    VehicleModel.update(object, {
        where: {id: id}
    })
        .then(data => {
            res.status(200).send({
                message: "Successfully Updated"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Unable to update! Duplicate data found."
            })
        })

}

function countPages(totalContent, contentPerPage) {
    return Math.ceil(totalContent / contentPerPage)
}

function variantFilter(filterVariantArray, query) {
    if ((!filterVariantArray[0]) && (!filterVariantArray[1])) {
        delete query.where.petrol_variant
        delete query.where.diesel_variant
    } else if ((filterVariantArray[0]) && (!filterVariantArray[1])) {
        delete query.where.diesel_variant
    } else if (!filterVariantArray[0]) {
        delete query.where.petrol_variant
    }
}

function sortingHandler(sortBy) {
    let tempArray = []

    if ((sortBy[0] == 'model') || (sortBy[0] == 'petrol_variant') || (sortBy[0] == 'diesel_variant')) {
        return sortBy
    } else if (sortBy[0] == 'manufacturer') {
        tempArray = ['VehicleManufacturer', sortBy[0], sortBy[1]]
    } else if (sortBy[0] == 'name') {
        tempArray = ['VehicleType', sortBy[0], sortBy[1]]
    } else {
        return sortBy
    }

    return tempArray
}

function idGenerator() {
    return Math.floor(Math.random()*10000) * Math.floor(Math.random()*1000)
}