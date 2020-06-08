module.exports = app => {
    
    const vehicleDataController = require('../controllers/vehicle-data-controller')
    const vehicleMakerController = require('../controllers/vehicle-maker-controller')
    const vehicleModelController = require('../controllers/vehicle-model-controller')
    const getAllController = require('../controllers/get-all-controller')
    const router = require('express').Router()

    //To retrieve Vehicle Data
    router.get('/vehicleData/:page/:contentPerPage', vehicleDataController.getVehicleData)

    //To retrieve Vehicle Model
    router.get('/vehicleModel/:page/:contentPerPage', vehicleModelController.getVehicleModel)

    //To retrieve Vehicle Maker
    router.get('/vehicleMaker/:page/:contentPerPage', vehicleMakerController.getVehicleMaker)

    //To retrieve all Vehicle Models at once
    router.get('/getAllModels/:makerId', getAllController.getAllModels)

    //To retrieve all Vehicle Makers at once
    router.get('/getAllMakers', getAllController.getAllMakers)

    //To retrieve all Vehicle Types at once
    router.get('/getAllTypes/:typeId', getAllController.getAllTypes)
    router.get('/getAllTypes', getAllController.getAllTypes)

    //To add in Vehicle Maker
    router.post('/vehicleMaker', vehicleMakerController.addVehicleMaker)

    //To add in Vehicle Model
    router.post('/VehicleModel', vehicleModelController.addVehicleModel)

    //To add in Vehicle Data
    router.post('/VehicleData', vehicleDataController.addVehicleData)

    //To update in Vehicle Maker
    router.put('/vehicleMaker', vehicleMakerController.updateVehicleMaker)

    //To update in Vehicle Model
    router.put('/VehicleModel', vehicleModelController.updateVehicleModel)

    //To add in Vehicle Data
    router.put('/VehicleData', vehicleDataController.updateVehicleData)

    //To delete in Vehicle Maker
    router.delete('/vehicleMaker/:id', vehicleMakerController.deleteVehicleMaker)

    //To delete in Vehicle Model
    router.delete('/VehicleModel/:id', vehicleModelController.deleteVehicleModel)

    //To delete in Vehicle Data
    router.delete('/VehicleData/:id', vehicleDataController.deleteVehicleData)

    app.use('/', router)
}