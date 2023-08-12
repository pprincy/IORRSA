import Axios from "axios";
import store from "@/store";

const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

axios.interceptors.response.use(
  (response) => {
    if (response.data?.data?.code === "FAILURE") {
      store.dispatch("snackBar", {
        color: "error",
        message: response.data.data.message,
      });
      return Promise.reject(response.data);
    }
    return response;
  },
  async (error) => {
    try {
      const errorData = error.response.data;

      console.log({ errorData });
      let message;
      if (
        errorData.errors &&
        errorData.errors[0] &&
        errorData.errors[0].message
      ) {
        message = errorData.errors[0].message;
      } else if (errorData.data && errorData.data.message) {
        message = errorData.data.message;
      } else {
        message = errorData.message;
      }
      store.dispatch("snackBar", {
        color: "error",
        message: message,
      });
      return Promise.reject(errorData);
    } catch (e) {
      console.log({ e });
      store.dispatch("snackBar", {
        color: "error",
        message: "Sorry something went wrong!",
      });
    }
  }
);

export { axios };
