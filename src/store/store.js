import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice/weatherSlice"
export const store=configureStore({
    reducer:{
        weatherReducer:weatherReducer
    }
})