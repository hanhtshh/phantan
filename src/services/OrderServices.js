import requests from './httpService';

const OrderServices = {
  getAllOrders(body, headers) {
    return requests.get('/oder/all', body, headers);
  },
  getAvailableOrder(body, headers) {
    return requests.get('/orders/available', body, headers);
  },

  getOrderByUser(id, body) {
    return requests.get(`/orders/user/${id}`, body);
  },

  getOrderById(id, body) {
    return requests.get(`/oder/get-by-id/${id}`, body);
  },

  updateOrder(id, body, headers) {
    console.log(body);
    return requests.put(`/oder/${id}`, body, headers);
  },

  deleteOrder(id) {
    return requests.delete(`/orders/${id}`);
  },
};

export default OrderServices;

export const formatVND = (price) => {
  return `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}₫`
}
