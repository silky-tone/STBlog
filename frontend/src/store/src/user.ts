import { Storage } from '../../utils';
import { defineStore } from 'pinia';

export const useUser = defineStore('user_store', {
  state: () => ({
    isLogin: false,
    token: Storage.get('token'),
  }),
  getters: {},
  actions: {
    setIsLogin(isLogin: boolean) {
      this.isLogin = isLogin;
    },
  },
});
