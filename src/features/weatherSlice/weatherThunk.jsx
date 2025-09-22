import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherData=createAsyncThunk(
    'weather/fetch',
    async()=>{

        await new Promise((resolve)=>{setTimeout(resolve,3000)})
        const response = await axios.get(
          /*your open weather api here */
        )

        
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