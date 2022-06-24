import {makeAutoObservable} from "mobx";

export class UserStore {
  userInfo: any;
  isLogin: boolean = false;
  constructor() {
    this.isLogin = JSON.parse(localStorage.getItem("isLogin") || 'false');
    this.userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    makeAutoObservable(this)
  }

  setUserInfo(userInfo: any){
    this.userInfo = userInfo;
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  }

  login() {
    this.isLogin = true
    localStorage.setItem("isLogin", JSON.stringify(true))
  }

  logout() {
    this.isLogin = false
    localStorage.setItem("isLogin", JSON.stringify(false))
  }
}

export default  new UserStore();