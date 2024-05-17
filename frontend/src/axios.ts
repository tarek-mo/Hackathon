// import axios with aliase
import a from "axios";

const axios = a.create({
  baseURL: "http://localhost:8000",
  // withCredentials: true, // Ensure cookies are sent with the request

  headers: {
    "Allow-Control-Allow-Origin": "*",
  },
});

export default axios;
