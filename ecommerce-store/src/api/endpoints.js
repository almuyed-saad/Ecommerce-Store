// All API endpoints in one place
const endpoints = {
  // Products
  products: {
    getAll: '/products',
    getById: (id) => `/products/${id}`,
    getByCategory: (category) => `/products/category/${category}`,
    getCategories: '/products/categories',
  },
  // Auth (for future use)
  auth: {
    login: '/auth/login',
    register: '/users',
  },
  // Cart (for future use)
  cart: {
    get: '/carts/user/1',
    update: '/carts/1',
  },
}

export default endpoints