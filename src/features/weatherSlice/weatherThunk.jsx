import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData=createAsyncThunk(
    'weather/fetch',
    async()=>{

        await new Promise((resolve)=>{setTimeout(resolve,3000)})
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?lat=33.589886&lon=-7.603869&appid=2d087febeafdaa8781c61042494a7b7a")

        
            const tempValue=response.data.main.temp
            const minValue=response.data.main.temp_min
            const maxValue=response.data.main.temp_max
            const descriptionValue=response.data.weather[0].description
            const cityValue=response.data.name
            const icon=response.data.weather[0].icon
            const weatherIcon=`https://openweathermap.org/img/wn/${icon}@2x.png`
            return {tempValue ,minValue, maxValue, descriptionValue ,cityValue ,icon, weatherIcon}

    }
)