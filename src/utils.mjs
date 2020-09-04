import Sequelize from 'sequelize'

const { lte, gte, or } = Sequelize.Op

export function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export class ProductFilters {
  constructor (querystring) {
    this.query = querystring
  }

  static filters () {
    return [
      { name: 'minPrice', many: false },
      { name: 'maxPrice', many: false },
      { name: 'category', many: true },
      { name: 'brand', many: true },
      { name: 'color', many: true },
      { name: 'size', many: true }
    ]
  }

  getFilters () {
    return this.constructor.filters()
      .map(meta => this.getFilter(meta))
      .filter(value => value !== null)
  }

  getFilter ({ name, many }) {
    let value = this.query[name]
    if (this._hasNoValue(value)) return null
    const getFilterFunc = this[`get${capitalize(name)}Filter`]
    value = many && !(value instanceof Array) ? [value] : value
    return getFilterFunc(value)
  }

  getMinPriceFilter (value) {
    const minPrice = Number.parseInt(value, 10) * 100
    return { price: { [gte]: minPrice } }
  }

  getMaxPriceFilter (value) {
    const maxPrice = Number.parseInt(value, 10) * 100
    return { price: { [lte]: maxPrice } }
  }

  getCategoryFilter (ids) {
    return { categoryId: { [or]: ids.map(id => Number.parseInt(id, 10)) } }
  }

  getBrandFilter (ids) {
    return { brandId: { [or]: ids.map(id => Number.parseInt(id, 10)) } }
  }

  getColorFilter (colors) {
    return { color: { [or]: colors } }
  }

  getSizeFilter (sizes) {
    return { size: { [or]: sizes } }
  }

  _hasNoValue (value) {
    return value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
  }
}

export default {
  capitalize,
  ProductFilters
}
