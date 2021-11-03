import axiosClient from "./axiosClient"

const itemApi = {
  GetItemById(data) {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    const url = `Item/${data}`
    return axiosClient.get(url, config)
  },

  UpdateItem(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Item"
    return axiosClient.put(url, data, config)
  },

  AddItem(data) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    const url = "Item/create"
    return axiosClient.post(url, data, config)
  },
}

export default itemApi
