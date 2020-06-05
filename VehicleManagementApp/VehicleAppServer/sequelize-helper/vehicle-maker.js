const db = require('../models')

module.exports = (searchString, filterCountryCondition, sortBy) => {

    return {
        where: {
            manufacturer: searchString,
            country_of_origin: filterCountryCondition
        },
        order: [sortBy]
    }

}