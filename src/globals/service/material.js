import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const materialService = {
  create: params => {
    return request.post(API.material, params);
  },
  index: params => {
    return request.get(API.material, params);
  },
  show: id => {
    return request.get(API.materialItem(id));
  },
  edit: (id, params) => {
    return request.put(API.materialItem(id), params);
  },
  destory: id => {
    return request.delete(API.materialItem(id));
  }
};

export default materialService;
