import axios from "axios";

axios.defaults.baseURL = "https://sheapi-001672ab3b00.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;