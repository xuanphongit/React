import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./pages/SignIn/signInSlice"

const rootReducer = {
  SignIn: signInReducer,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store;