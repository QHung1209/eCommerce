'use strict'
const keytoken = require("../models/keytoken")
class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await keytoken.create({
                user: userId,
                publicKey,
                privateKey
            })

            return tokens ? tokens.publicKey : null
        } catch (error) {

        }
    }
}

module.exports = KeyTokenService