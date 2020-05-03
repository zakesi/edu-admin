import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const skillQuestionService = {
  create: params => {
    return request.post(API.skillQuestion, params);
  },
  index: params => {
    return request.get(API.skillQuestion, params);
  },
  show: id => {
    return request.get(API.skillQuestionItem(id));
  },
  edit: (id, params) => {
    return request.put(API.skillQuestionItem(id), params);
  },
  destory: id => {
    return request.delete(API.skillQuestionItem(id));
  }
};

export default skillQuestionService;
