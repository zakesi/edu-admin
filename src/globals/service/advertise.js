import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const advertiseService = {
  create: params => {
    return request.post(API.advertise, params);
  },
  index: params => {
    return request.get(API.advertise, params);
  },
  show: id => {
    return request.get(API.advertiseItem(id));
  },
  edit: (id, params) => {
    return request.put(API.advertiseItem(id), params);
  },
  destory: id => {
    return request.delete(API.advertiseItem(id));
  },
  createMaterial: params => {
    return request.post(API.advertiseMaterial, params);
  },
  destoryMaterial: id => {
    return request.delete(API.advertiseMaterialItem(id));
  },
  sortMaterial: params => {
    return request.post(API.advertiseMaterialSort, params);
  }
};

export default advertiseService;
