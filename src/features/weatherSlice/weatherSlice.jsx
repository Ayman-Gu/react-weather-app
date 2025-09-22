import { createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData } from "./weatherThunk";
const initialState={
    list:[],
    loading:false,
    error:null
}

export const weatherSlice=createSlice({
    name:'weather',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder .addCase(fetchWeatherData.pending,(state)=>{
                    console.log('---- pending ------')
                    state.loading=true  
                    state.error=null
                    
                })//pending
                .addCase(fetchWeatherData.fulfilled,(state,action)=>{
                    console.log('---- full ------')

                    state.list=action.payload
                    state.loading=false
                })//fullfilled
                .addCase(fetchWeatherData.rejected,(state,action)=>{
                    state.list=action.payload; 
                    state.error=null
                    state.loading = false
                })//rejected
    }
})

export default weatherSlice.reducer