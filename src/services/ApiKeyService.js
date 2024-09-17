'use strict'

const apiKey = require('../models/apiKey')
const crypto = require('crypto')
const findById = async (key) => {
    const newKey = await apiKey.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] })
    const objKey = await apiKey.findOne({ key, status: true }).lean()
    return objKey
}

module.exports = { findById }