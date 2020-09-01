import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import connection from '../db_connection.mjs'

const { DataTypes } = Sequelize

async function hashPassword (user) {
  if (!user.changed('passwordHash')) return
  const hash = await bcrypt.hash(user.passwordHash, 8)
  user.setDataValue('passwordHash', hash)
}

const User = connection.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 50]
    }
  },

  lastName: {
    type: DataTypes.STRING(50)
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  instanceMethods: {
    async isValidPassword (password) {
      return bcrypt.compare(password, this.passwordHash)
    }
  },

  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword
  }
})

export default User
