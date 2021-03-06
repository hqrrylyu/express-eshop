import Sequelize from 'sequelize'
import connection from '../db_connection.mjs'

const { DataTypes } = Sequelize

const Category = connection.define('category', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  }
})

export default Category
