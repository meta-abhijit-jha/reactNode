module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "testdb",
    dialect: "mysql",
    //pool is optional in mysql connection, used for sequelize pool config.
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}