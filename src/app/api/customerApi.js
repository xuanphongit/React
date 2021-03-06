import axiosClient from "./axiosClient"

const customerApi = {
  Register(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Customer/register"
    return axiosClient.post(url, data, config)
  },

  Login(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Customer/login"
    return axiosClient.post(url, data, config)
  },
}

export default customerApi
