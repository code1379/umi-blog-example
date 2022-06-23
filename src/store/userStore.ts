import {makeAutoObservable} from "mobx";

export class UserStore {
  userInfo: any;
  isLogin: boolean = false;
  constructor() {
    this.isLogin = JSON.parse(localStorage.getItem("isLogin") || 'false');
    makeAutoObservable(this)
  }

  setUserInfo(userInfo: any){
    this.userInfo = userInfo;
  }
}

export default  new UserStore();