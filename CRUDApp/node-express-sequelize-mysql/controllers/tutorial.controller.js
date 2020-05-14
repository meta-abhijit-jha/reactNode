const db = require('../models')
const Tutorial = db.tutorials
const Op = db.Sequelize.Op

//Store a new Tutorial
exports.create = (req, res) => {
    //validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can't be empty!"
        })
        return;
    }

    //Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    //Saving Tutorial in DB
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data)  //doubt
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while creating the Tutorial"
            })
        })
}

//Retrieve all Tutorials
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { [Op.like]: "%${title}%" } } : null
    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving tutorials"
            })
        })
}

//Find Tutorial by id
exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findByPk(id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving tutorial with id = " + id
            })
        })
}

//Update tutorial by id
exports.update = (req, res) => {
    const id = req.params.id

    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated Successfully"
                })
            } else {
                res.send({
                    message: "Maybe Tutorial is not there or request body is empty"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while updating tutorial with id = " + id
            })
        })
}

//Delete a Tutorial by id
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted Successfully"
                })
            } else {
                res.send({
                    message: "Can't delete tutorial. Maybe not present in the DB."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id = " + id
            })
        })
}

//Delete All Tutorials
exports.deleteAll = (req, res) => {
    //If truncate set to true, dialects that support it will use TRUNCATE instead of DELETE FROM. If a table is truncated the where and limit options are ignored
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: "Deleted Successfully"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while deleting all tutorials"
            })
        })
}

//Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
        where: { published: true }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Occurred while retrieving tutorials"
            })
        })
}