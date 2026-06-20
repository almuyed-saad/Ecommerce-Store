import { products } from '../data/products'

export const getMockProducts = () => {
  return products
}

export const getMockProductById = (id) => {
  return products.find((product) => product.id === parseInt(id))
}

export const getMockProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter((product) => product.category === category)
}

export default products