import axios from "axios";

const apiRequest = (method, path, data) => {
    const url = `${process.env.REACT_APP_API_URL_SUPPLIER}/${path}`;
  
    return axios({
      method,
      url,
      data,
    }).then((response) => response.data);
  };
  export default apiRequest;