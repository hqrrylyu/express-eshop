import Sequelize from 'sequelize'
import connection from '../db_connection.mjs'

const { DataTypes } = Sequelize

const PRODUCT_COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'brown',
  'gray',
  'black',
  'white'
]

const PRODUCT_SIZES = [
  'xs', 's', 'm', 'l', 'xl', 'xxl'
]

const Product = connection.define('Product', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  },

  imagePath: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isPositiveInt (value) {
        return value > 0
      }
    },
    set (value) {
      this.setDataValue('price', value * 100)
    }
  },

  color: {
    type: DataTypes.CHAR(10),
    validate: {
      isIn: PRODUCT_COLORS
    }
  },

  size: {
    type: DataTypes.CHAR(10),
    validate: {
      isIn: PRODUCT_SIZES
    }
  }
})

Product.PRODUCT_COLORS = PRODUCT_COLORS
Product.PRODUCT_SIZES = PRODUCT_SIZES

export default Product