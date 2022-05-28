const { default: axios } = require("axios");

const processProductsArray = async () => {
  const { data: products } = await axios.get(
    "https://fakestoreapi.com/products"
  )

  let priceSum = 0

  let averagePrice = 0
  let itemWithBiggestPrice = undefined

  for (const product of products) {
    priceSum += product.price

    if (!itemWithBiggestPrice || product.price > itemWithBiggestPrice.price) {
      itemWithBiggestPrice = product
    }
  }

  averagePrice = priceSum/products.length

  return {
    averagePrice,
    itemWithBiggestPrice
  }
};

(async () => {
  const result = await processProductsArray()
  console.log(result)
})();
