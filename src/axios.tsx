import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://cultumchat.firebaseio.com/",
});

export default instance;
