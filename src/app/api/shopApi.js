import axiosClient from "./axiosClient"

const shopApi = {
  Register(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Shop/register"
    return axiosClient.post(url, data, config)
  },

  Login(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Shop/login"
    return axiosClient.post(url, data, config)
  },

  Update(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Shop"
    return axiosClient.put(url, data, config)
  },

  GetAll(){
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = "Shop/all"

    return axiosClient.get(url, config)
  }
}

export default shopApi
