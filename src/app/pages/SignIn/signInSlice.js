import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const initialState = { isShop: false, signInInfor: {} }

const signInSlice = createSlice({
  name: "SignIn",
  initialState: initialState,
  reducers: {
    setIsShopFlag: (state, action) => {
      state.isShop = action.payload
    },

    setSignInInformation: (state, action) => {
      state.signInInfor = action.payload
    },

    clearStore: (state) => { 
      storage.removeItem('persist:root')
      state = initialState
    }
  },
})

const { actions, reducer } = signInSlice
export const { setIsShopFlag, setSignInInformation, clearStore } = actions
export default reducer