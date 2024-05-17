// import axios with aliase
import a from "axios";

const axios = a.create({
  baseURL: "http://127.0.0.1:8000",
});

export default axios;
