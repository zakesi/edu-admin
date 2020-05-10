import MyStorage from "./storage";

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    this.map = new Map();
    this.storage = new MyStorage();
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  getToken() {
    return this.storage.get("token");
  }

  setToken(token) {
    this.storage.set("token", token);
  }

  getUserInfo() {
    return this.storage.get("userInfo");
  }

  setUserInfo(userInfo) {
    this.storage.set("userInfo", userInfo);
  }

  removeToken() {
    localStorage.clear();
  }

  clear() {
    localStorage.clear();
  }
}

export default DataStore.getInstance();
