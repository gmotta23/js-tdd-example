const { processProductsArray } = require("./products");

(async () => {
  const result = await processProductsArray()
  console.log(result)
})();
