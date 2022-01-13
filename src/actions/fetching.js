import axios from "axios";
import config from "../config";

export const getApiCall2 = async (url, data) => {
  return axios({
    url: config.Url+url,
    method: "GET",
    params: {...data, api_key: '30411e7bff799dd8479aa3249ff4cdff'},
  });
};

export const postApiCall2 = async (url, data) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return axios({
    url: config.Url+ url,
    method: "POST",
    data: data,
    headers: headers,
  });
};