import { axios } from "@/plugins/http-request.js";

const actions = {
  verifyLink(_, payload) {
    return axios
      .post("/api/sellers/verify-onboarding-link", payload)
      .then((res) => res.data);
  },
  saveSellerDetails(_, payload) {
    return axios
      .patch("/api/sellers/update-seller-upload", payload)
      .then((res) => res.data);
  },
  uploadAgreement(_, payload) {
    return axios
      .patch("/api/sellers/upload-agreement", payload)
      .then((res) => res.data);
  },
  getSellerDetails(_, token) {
    return axios
      .get(`/api/sellers/upload-agreement/${token}`)
      .then((res) => res.data);
  },
};

const mutations = {};

export default {
  actions,
  mutations,
};
