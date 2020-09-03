import User from './user.mjs'
import Product from './product.mjs'
import Category from './category.mjs'
import Brand from './brand.mjs'

User.hasMany(Product, { foreignKey: { name: 'ownerId', allowNull: false } })
Product.belongsTo(User)

Category.hasMany(Product, { foreignKey: { allowNull: false } })
Product.belongsTo(Category)

Brand.hasMany(Product, { foreignKey: { allowNull: false } })
Product.belongsTo(Brand)

export { User, Product, Category, Brand }
