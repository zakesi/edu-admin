import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const courseService = {
  create: params => {
    return request.post(API.course, params);
  },
  index: params => {
    return request.get(API.course, params);
  },
  show: id => {
    return request.get(API.courseItem(id));
  },
  edit: (id, params) => {
    return request.put(API.courseItem(id), params);
  },
  destory: id => {
    return request.delete(API.courseItem(id));
  }
};

export default courseService;
