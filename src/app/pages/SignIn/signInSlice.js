import { createSlice } from '@reduxjs/toolkit';

const signInSlice = createSlice({
  name: "SignIn",
  initialState: { isShop: false, signInInfor: {} },
  reducers: {
    setIsShopFlag: (state, action) => {
      state.isShop = action.payload
    },

    setSignInInformation: (state, action) => {
      state.signInInfor = action.payload
    },
  },
})

const { actions, reducer } = signInSlice
export const { setIsShopFlag, setSignInInformation } = actions
export default reducer