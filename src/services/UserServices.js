import requests from "./httpService";

const UserServices = {
  getAllUsers(body) {
    return requests.get(`/customer`, body);
  },
  getUserById(id) {
    return requests.get(`/user/${id}`);
  },

  deleteUser(id) {
    return requests.delete(`/customer/${id}`);
  },
};

export default UserServices;
