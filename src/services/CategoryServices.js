import requests from './httpService';

const CategoryServices = {
  getAllCategory() {
    return requests.get('/api/khach-hang/search-kh-by-ten?ten=');
  },

  getCategoryById(id) {
    return requests.get(`/category/detail/${id}`);
  },

  addCategory(body) {
    return requests.post('/category', body);
  },

  updateCategory(id, body) {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/category/${id}`, body);
  },
};

export default CategoryServices;
