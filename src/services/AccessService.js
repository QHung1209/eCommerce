'use strict'
const shopSchema = require('../models/shop')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('../services/KeyTokenService')
const createTokenPair = require('../auth/authUtils')
const { BadRequestError, ConflictRequestError } = require('../core/ErrorResponse')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITER: 'EDITER',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async (name, email, password) => {
        try {
            const hodelShop = await shopSchema.findOne({ email: email }).lean()
            if (hodelShop) {
                throw new BadRequestError('Error: Shop already registed')
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopSchema.create({
                email: email,
                name: name,
                password: passwordHash,
                roles: RoleShop.SHOP
            })

            if (newShop) {
                // create privateKey, publicKey
                const privateKey = crypto.randomBytes(64).toString('hex')
                const publicKey = crypto.randomBytes(64).toString('hex')

                console.log({ privateKey, publicKey })

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                })

                if (!keyStore) {
                    return {
                        code: 'xxxxxx',
                        message: 'keyStore error'
                    }
                }

                // create toekn pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
                console.log('Created Token Success::', tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
            }

        } catch (error) {
            return {
                code: 'xxxxxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService