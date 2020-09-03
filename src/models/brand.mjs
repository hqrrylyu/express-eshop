import Sequelize from 'sequelize'
import connection from '../db_connection.mjs'

const { DataTypes } = Sequelize

const Brand = connection.define('brand', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  }
})

export default Brand
