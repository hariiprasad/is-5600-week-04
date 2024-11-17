const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/products.json')

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options
  const data = await fs.readFile(productsFile)
  let products = JSON.parse(data)

  if (tag) {
    products = products.filter(product => product.tags.includes(tag))
  }

  return products.slice(offset, offset + limit)
}

async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile))
  return products.find(product => product.id === id) || null
}

async function create(product) {
  const products = JSON.parse(await fs.readFile(productsFile))
  products.push(product)
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
  return product
}

async function update(id, updates) {
  const products = JSON.parse(await fs.readFile(productsFile))
  const index = products.findIndex(product => product.id === id)
  if (index === -1) return null
  const updatedProduct = { ...products[index], ...updates }
  products[index] = updatedProduct
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
  return updatedProduct
}

async function deleteProduct(id) {
  const products = JSON.parse(await fs.readFile(productsFile))
  const index = products.findIndex(product => product.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2))
  return true
}

module.exports = {
  list,
  get,
  create,
  update,
  delete: deleteProduct
}