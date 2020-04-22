import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const sectionService = {
  create: params => {
    return request.post(API.section, params);
  },
  edit: (id, params) => {
    return request.put(API.sectionItem(id), params);
  },
  destory: id => {
    return request.delete(API.sectionItem(id));
  },
  sort: params => {
    return request.post(API.sectionSort, params);
  },
  show: id => {
    return request.get(API.sectionItem(id));
  }
};

export default sectionService;
