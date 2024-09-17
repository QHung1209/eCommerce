'use strict'
const AccessService = require('../services/AccessService')


class AccessController {

    signUp = async (req, res) => {
        try {
            const { name, password, email } = req.body
            console.log(`[P]:::signUp:`, req.body)
            return res.status(201).json(
                await AccessService.signUp(name, email, password)
            )
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AccessController()