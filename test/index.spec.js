const mockProducts = require("./mockProducts")

let {
  retrieveProductArray,
  calculateProductArrayAveragePrice,
  getCategories,
  removeDuplicatesFromStringArray,
  createAveragePriceArrayByCategories,
  filterProductsByCategory,
  getHighestPriceProductOfProductArray,
  createHighestPriceProductArrayByCategories
} = require('../products')

retrieveProductArray = jest.fn(() => mockProducts)

const simplerProductsMock = [
  {
    "id": 1,
    "title": "Fake 1",
    "price": 50,
    "description": "Fake description 1",
    "category": "Fake category",
    "image": "Fake image url",
    "rating": {
      "rate": 0,
      "count": 0
    }
  },
  {
    "id": 2,
    "title": "Fake 2",
    "price": 75,
    "description": "Fake description 2",
    "category": "Fake category",
    "image": "Fake image url",
    "rating": {
      "rate": 0,
      "count": 0
    }
  },
  {
    "id": 3,
    "title": "Fake 3",
    "price": 60,
    "description": "Fake description 3",
    "category": "Fake category",
    "image": "Fake image url",
    "rating": {
      "rate": 0,
      "count": 0
    }
  },      
]

const stringArrayHasNoDuplicates = array => {
  return Array.isArray(array) && new Set(array).size === array.length
}

describe('Helpers tests', function () {
  test('stringArrayHasNoDuplicates returns false for array with duplicates and true for array with duplicates', () => {
    const arrayWithDuplicates = ['a', 'a', 'b']
    const arrayWithoutDuplicates = ['a', 'b', 'c']

    expect(stringArrayHasNoDuplicates(arrayWithDuplicates)).toBe(false)
    expect(stringArrayHasNoDuplicates(arrayWithoutDuplicates)).toBe(true)
  })

  test('removeDuplicatesFromStringArray removes duplicate strings from a string array', () => {
    const arrayWithDuplicates = ['a', 'a', 'b']
    const expectedResult = ['a', 'b']

    expect(stringArrayHasNoDuplicates(arrayWithDuplicates)).toBe(false)

    const arrayWithoutDuplicates = removeDuplicatesFromStringArray(arrayWithDuplicates)

    expect(stringArrayHasNoDuplicates(arrayWithoutDuplicates)).toBe(true)
    expect(arrayWithoutDuplicates).toEqual(expectedResult)
  })
})

describe('Products array tests', function () {
  test('retrieveProductArray returns an array of products', () => {
    const products = retrieveProductArray()
    expect(JSON.stringify(products)).toEqual(JSON.stringify(mockProducts))
  })

  test('calculateProductArrayAveragePrice returns average price of an array of products', () => {
    const products = simplerProductsMock
    const averagePrice = calculateProductArrayAveragePrice(products)
    const expectedResult = (50 + 75 + 60) / 3

    expect(averagePrice).toEqual(expectedResult)
  })

  test('getHighestPriceProductOfProductArray returns the product with highest price', () => {
    const products = simplerProductsMock
    const expectedHighestPriceProduct = simplerProductsMock[1]

    const highestPriceProduct = getHighestPriceProductOfProductArray(products)

    expect(JSON.stringify(highestPriceProduct)).toEqual(JSON.stringify(expectedHighestPriceProduct))
  })

  test('getCategories returns a valid array of categories', () => {
    const products = retrieveProductArray()
    const categories = getCategories(products)
    expect(categories.length).toBeGreaterThan(0)
    for (const category of categories) {
      expect(typeof category).toBe('string')
    }
    expect(stringArrayHasNoDuplicates(categories)).toBe(true)
  })

  test('filterProductsByCategory returns a products array with only one category', () => {
    const products = retrieveProductArray()
    const multipleCategories = getCategories(products)

    expect(multipleCategories.length).toBeGreaterThan(1)
    
    const category = multipleCategories[0]

    const filteredProducts = filterProductsByCategory(category, products)
    const singleCategory = getCategories(filteredProducts)

    expect(products.length).toBeGreaterThan(filteredProducts.length)
    expect(singleCategory.length).toBe(1)
  })

  test('createAveragePriceArrayByCategories returns array with average prices by category', () => {
    const products = retrieveProductArray()
    const categories = getCategories(products)

    const averagePriceArray = createAveragePriceArrayByCategories(categories, products)

    expect(averagePriceArray.length).toEqual(categories.length)
    for (const averagePriceArrayElement of averagePriceArray) {
      expect(averagePriceArrayElement).toHaveProperty('averagePrice')
      expect(averagePriceArrayElement).toHaveProperty('category')
    }
  })

  test('createHighestPriceProductArrayByCategories returns an array with highest price product by category', () => {
    const products = retrieveProductArray()
    const categories = getCategories(products)

    const highestPriceProductArray = createHighestPriceProductArrayByCategories(categories, products)

    expect(highestPriceProductArray.length).toEqual(categories.length)
    for (const highestPriceProductArrayElement of highestPriceProductArray) {
      expect(highestPriceProductArrayElement).toHaveProperty('highestPriceProduct')
      expect(highestPriceProductArrayElement).toHaveProperty('category')
    }
  })
})
