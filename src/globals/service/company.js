import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const companyService = {
  create: params => {
    return request.post(API.company, params);
  },
  index: params => {
    return request.get(API.company, params);
  },
  show: id => {
    return request.get(API.companyItem(id));
  },
  edit: (id, params) => {
    return request.put(API.companyItem(id), params);
  },
  destory: id => {
    return request.delete(API.companyItem(id));
  }
};

export default companyService;
