import request from "@/globals/request/axios.js";
import API from "@/globals/request/api.js";
import DataStore from "@/globals/storage/index";

const AuthService = {
  smsSend: function({ phone }) {
    return request.post(API.smsSend, {
      phone
    });
  },
  smsLogin: function({ phone, code }) {
    return request
      .post(API.smsLogin, {
        phone,
        code
      })
      .then(res => {
        DataStore.setToken(res.token);
        DataStore.setUserInfo(res.manager);
        return res;
      });
  },
  permissions: function() {
    return request.get(API.authPermissions)
  }
};

export default AuthService;
