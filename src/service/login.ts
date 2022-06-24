import {request} from "@/service/request";
// import request from 'umi-request'
import axios from "axios";
interface  ILoginData {
  email: string
  password: string
}

interface IUser {
  email: string,
  id: number,
  name: string,
  avatarUrl: string
}

export const umiLogin = (data: ILoginData) => request<IUser>("/login", {
  method: "POST",
  data
})

export const fetchLogin = (data: ILoginData) => fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
});

export const axiosLogin = (data: ILoginData) => axios("/api/login", {
  method: 'POST',
  data
})