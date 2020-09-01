import Sequelize from 'sequelize'
import * as config from './config.mjs'

export default new Sequelize(config.APP_DB_URI)
