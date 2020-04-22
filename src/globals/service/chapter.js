import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const chapterService = {
  create: params => {
    return request.post(API.chapter, params);
  },
  edit: (id, params) => {
    return request.put(API.chapterItem(id), params);
  },
  destory: id => {
    return request.delete(API.chapterItem(id));
  },
  sort: params => {
    return request.post(API.chapterSort, params);
  }
};

export default chapterService;
