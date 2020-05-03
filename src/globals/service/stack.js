import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const stackService = {
  create: params => {
    return request.post(API.stack, params);
  },
  index: params => {
    return request.get(API.stack, params);
  },
  show: id => {
    return request.get(API.stackItem(id));
  },
  edit: (id, params) => {
    return request.put(API.stackItem(id), params);
  },
  destory: id => {
    return request.delete(API.stackItem(id));
  }
};

export default stackService;
