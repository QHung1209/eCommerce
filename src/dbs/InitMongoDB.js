'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/CheckConnect')
require('dotenv').config()
const options = {
    user: process.env.DEV_DB_USER,
    pass: process.env.DEV_DB_PASS,
    dbName: process.env.DEV_DB_NAME
}

class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        mongoose.connect(process.env.DEV_DB_HOST, options, {
            maxPoolSize: 50
        }).then(_ => console.log('Connect Mongodb success ', `\n ${countConnect()} `))
            .catch(err => console.log(err))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb