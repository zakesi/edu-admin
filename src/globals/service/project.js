import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";

const projectService = {
  create: params => {
    return request.post(API.project, params);
  },
  index: params => {
    return request.get(API.project, params);
  },
  show: id => {
    return request.get(API.projectItem(id));
  },
  edit: (id, params) => {
    return request.put(API.projectItem(id), params);
  },
  destory: id => {
    return request.delete(API.projectItem(id));
  },
  createVersion: params => {
    return request.post(API.projectVersion, params);
  },
  editVersion: (id, params) => {
    return request.put(API.projectVersionItem(id), params);
  },
  destoryVersion: id => {
    return request.delete(API.projectVersionItem(id));
  },
  sortVersion: params => {
    return request.post(API.projectVersionSort, params);
  },
  createStory: params => {
    return request.post(API.projectStory, params);
  },
  editStory: (id, params) => {
    return request.put(API.projectStoryItem(id), params);
  },
  destoryStory: id => {
    return request.delete(API.projectStoryItem(id));
  },
  sortStory: params => {
    return request.post(API.projectStorySort, params);
  },
  showTask: id => {
    return request.get(API.projectTaskItem(id));
  },
  createTask: params => {
    return request.post(API.projectTask, params);
  },
  editTask: (id, params) => {
    return request.put(API.projectTaskItem(id), params);
  },
  destoryTask: id => {
    return request.delete(API.projectTaskItem(id));
  },
  sortTask: params => {
    return request.post(API.projectTaskSort, params);
  }
};

export default projectService;
