import User from './user.mjs'
import Product from './product.mjs'
import Category from './category.mjs'
import Brand from './brand.mjs'

User.hasMany(Product, { foreignKey: 'ownerId' })
Product.belongsTo(User)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

export { User, Product, Category, Brand }
