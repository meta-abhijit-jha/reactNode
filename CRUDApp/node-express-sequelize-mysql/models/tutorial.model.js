module.exports = (sequelize, Sequelize) => {

    //'tutorial' represents a table in mySQL DB
    //Auto-generated columns in that table will be: id, title, description, published, createdAt, updatedAt
    const Tutorial = sequelize.define('tutorial', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    })

    return Tutorial
}

//Sequelizing removes headache of writing CRUD functions based on MySQL operations