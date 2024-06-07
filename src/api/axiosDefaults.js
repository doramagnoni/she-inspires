import axios from "axios";

axios.defaults.baseURL = "https://siap-9ff06f350cf8.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;