import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const roleService = {
  create: params => {
    return request.post(API.role, params);
  },
  index: params => {
    return request.get(API.role, params);
  },
  show: id => {
    return request.get(API.roleItem(id));
  },
  update: (id, params) => {
    return request.put(API.roleItem(id), params);
  },
  destory: id => {
    return request.delete(API.roleItem(id));
  },
  permission: () => {
    return request.get(API.permission);
  }
};

export default roleService;
