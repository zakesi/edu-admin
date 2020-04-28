import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const zhiyeService = {
  create: params => {
    return request.post(API.zhiye, params);
  },
  index: params => {
    return request.get(API.zhiye, params);
  },
  show: id => {
    return request.get(API.zhiyeItem(id));
  },
  edit: (id, params) => {
    return request.put(API.zhiyeItem(id), params);
  },
  destory: id => {
    return request.delete(API.zhiyeItem(id));
  },
  createPath: params => {
    return request.post(API.zhiyePath, params);
  },
  editPath: (id, params) => {
    return request.put(API.zhiyePathItem(id), params);
  },
  destoryPath: id => {
    return request.delete(API.zhiyePathItem(id));
  },
  sortPath: params => {
    return request.post(API.zhiyePathSort, params);
  },
  createCourse: params => {
    return request.post(API.zhiyeCourse, params);
  },
  destoryCourse: id => {
    return request.delete(API.zhiyeCourseItem(id));
  },
  sortCourse: params => {
    return request.post(API.zhiyeCourseSort, params);
  }
};

export default zhiyeService;
