import requests from './httpService';

const ProductServices = {
  getAllProducts() {
    return requests.get('/item');
  },

  getStockOutProducts() {
    return requests.get('/products/stock-out');
  },

  getProductById(id) {
    return requests.post(`/item/get-by-id/${id}`);
  },

  addProduct(body) {
    return requests.post('/item', body);
  },

  addAllProducts(body) {
    return requests.post('/products/all', body);
  },

  updateProduct(id, body) {
    return requests.put(`/item/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct(id) {
    return requests.delete(`/item/${id}`);
  },
};

export default ProductServices;
