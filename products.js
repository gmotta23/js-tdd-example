const { default: axios } = require("axios");

const processProductsArray = async () => {
  const products = await retrieveProductArray()

  const averagePrice = calculateProductArrayAveragePrice(products)
  const highestPriceProduct = getHighestPriceProductOfProductArray(products)

  const categories = getCategories(products)

  const averagePricesByCategories = createAveragePriceArrayByCategories(categories, products)
  const highestPriceProductsByCategories = createHighestPriceProductArrayByCategories(categories, products)

  return {
    averagePrice,
    highestPriceProduct,
    averagePricesByCategories,
    highestPriceProductsByCategories
  }
}

const retrieveProductArray = async () => {
  const { data: products } = await axios.get(
    "https://fakestoreapi.com/products"
  )
  return products
}

const calculateProductArrayAveragePrice = (products) => {
  return products.reduce(
    (totalPrice, currentProduct) => totalPrice + currentProduct.price,
    0
  ) / products.length;
}

const getHighestPriceProductOfProductArray = (products) => {
  return products.reduce(
    (maximumPriceProduct, currentProduct) =>
      currentProduct.price > maximumPriceProduct.price
        ? currentProduct
        : maximumPriceProduct,
    products[0]
  )
}

const getCategories = (products) => {
  return removeDuplicatesFromStringArray(products.map(product => product.category))
}

const filterProductsByCategory = (category, products) => {
  return products.filter(product => product.category === category)
}

const removeDuplicatesFromStringArray = (stringArray) => {
  return Array.from(new Set(stringArray))
}

const createAveragePriceArrayByCategories = (categories, products) => {
  let averagePrices = []
  for (const category of categories) {
    const productsByCategory = filterProductsByCategory(category, products)
    const averagePrice = calculateProductArrayAveragePrice(productsByCategory)
    averagePrices.push({
      averagePrice,
      category
    })
  }
  return averagePrices
}


const createHighestPriceProductArrayByCategories = (categories, products) => {
  let highestPriceProducts = []
  for (const category of categories) {
    const productsByCategory = filterProductsByCategory(category, products)
    const highestPriceProduct = getHighestPriceProductOfProductArray(productsByCategory)
    highestPriceProducts.push({
      highestPriceProduct,
      category
    })
  }
  return highestPriceProducts
}

module.exports = {
  processProductsArray,
  retrieveProductArray,
  getCategories,
  removeDuplicatesFromStringArray,
  createAveragePriceArrayByCategories,
  calculateProductArrayAveragePrice,
  filterProductsByCategory,
  createHighestPriceProductArrayByCategories,
  getHighestPriceProductOfProductArray
}
