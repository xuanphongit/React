import { createSlice } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

const initialState = { isShop: false, signInInfor: {} }

const signInSlice = createSlice({
  name: "SignIn",
  initialState: initialState,
  reducers: {

    setSignInInformation: (state, action) => {
      state.signInInfor = action.payload
    },

    clearStore: state => {
      storage.removeItem("persist:root")
      state = initialState
    },
  },
})

const { actions, reducer } = signInSlice
export const { setSignInInformation, clearStore } = actions
export default reducer
