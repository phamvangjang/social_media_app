import axios from "../axios";

export const apiRegister = data =>
  axios({
    url: "http://localhost:3000/auth/register",
    method: "post",
    data
  });

export const apiFinalRegister = data =>
  axios({
    url: "/auth/finalregister",
    method: "put",
    data
  });

export const apiLogin = data =>
  axios({
    url: "http://localhost:3000/auth/login",
    method: "post",
    data
  });
