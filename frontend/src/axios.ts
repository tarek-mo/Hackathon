// import axios with aliase
import a from "axios";

const axios = a.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Allow-Control-Allow-Origin": "*",
  },
});

export default axios;
