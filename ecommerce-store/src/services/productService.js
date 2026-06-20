import { products } from '../data/products'

// Fetch all products from local data
export const fetchAllProducts = async () => {
  return products
}

// Fetch single product by ID from local data
export const fetchProductById = async (id) => {
  const product = products.find(p => p.id === parseInt(id))
  if (!product) {
    console.error('Product not found:', id)
    return null
  }
  return product
}

// Fetch products by category from local data
export const fetchProductsByCategory = async (category) => {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

// Fetch related products from local data
export const fetchRelatedProducts = async (category, productId) => {
  return products
    .filter(p => p.category === category && p.id !== parseInt(productId))
    .slice(0, 4)
}

// Fetch all categories from local data
export const fetchCategories = async () => {
  return [...new Set(products.map(p => p.category))]
}

// Get product brand (now part of product data)
export const getProductBrand = (productId) => {
  const product = products.find(p => p.id === parseInt(productId))
  return product?.brand || 'Premium Brand'
}