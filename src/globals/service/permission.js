import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const permissionService = {
  index: () => {
    return request.get(API.permission);
  }
};

export default permissionService;
