import axios from "axios";

export const fetchDataFromAPI = (url, method, body, requestHeaders) => {
  let reqHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
    ...requestHeaders,
  };

  switch (method) {
    case "GET": {
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    case "POST": {
      return new Promise((resolve, reject) => {
        axios
          .post(url, body, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    case "DELETE": {
      return new Promise((resolve, reject) => {
        axios
          .delete(url, { headers: reqHeader })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    case "PUT": {
      return new Promise((resolve, reject) => {
        axios.put();
      });
    }
    default: {
      return new Promise((resolve, reject) => {
        axios
          .get(url, {
            headers: reqHeader,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
};
