import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const managerService = {
  create: params => {
    return request.post(API.manager, params);
  },
  index: params => {
    return request.get(API.manager, params);
  },
  show: id => {
    return request.get(API.managerItem(id));
  },
  update: (id, params) => {
    return request.put(API.managerItem(id), params);
  },
  destory: id => {
    return request.delete(API.managerItem(id));
  }
};

export default managerService;
