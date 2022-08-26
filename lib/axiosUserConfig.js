import axios from "axios";

const interceptAxios = axios.create({
  baseURL: "http://localhost:8080/",
});

export default interceptAxios;
