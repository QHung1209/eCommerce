const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3005
    },
    db: {
        host: process.env.DEV_DB_PORT || 'localhost',
        port: process.env.DEV_DB_PORT || 27018,
        name: process.env.DEV_DB_PORT || 'shopDEV'
    }
}

const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_PORT || 'localhost',
        port: process.env.PRO_DB_PORT || 27018,
        name: process.env.PRO_DB_PORT || 'localhost',
    }
}

const config = { dev, pro }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]