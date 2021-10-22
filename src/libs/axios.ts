import axios from "axios";

const configs = {
  baseURL: "https://staging-am.awalmula.co.id",
};

const http = axios.create(configs);

export default http;
