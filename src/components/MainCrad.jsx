import {useEffect, useState} from 'react'
import axios from 'axios';
import moment from 'moment';
import "moment/locale/ar";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../features/weatherSlice/weatherThunk';

moment.locale('en')

export default function MainCrad() {
    /*const [data,setData]=useState({
        temp:'',
        min:'',
        max:'',
        city:'',
        description:'',
        icon:null
    })*/
    
    const { t, i18n } = useTranslation();

    const [date,setDate]=useState(null)
    const [langBtn,setLangBtn]=useState('انجليزي')

    const dispatch=useDispatch()
    const {list,loading} =useSelector((state)=>state.weatherReducer)
    
    
    
    
    useEffect(() => {
  console.log("Dispatching fetchWeatherData");
  dispatch(fetchWeatherData());
}, [dispatch]);


   {/* for transaltion*/}
    useEffect(()=>{
        translateToAr()
    }, []);

    function translateToAr(){
        if (langBtn==='Arabic'){
            i18n.changeLanguage('ar')

            const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
            const dateStr = new Intl.DateTimeFormat("ar-EG-u-nu-arab", opts).format(new Date());
            setDate(dateStr)

            setLangBtn('انجليزي')
           
        }else if(langBtn==='انجليزي') {
            
            i18n.changeLanguage('en')
            setDate(moment().format("MMM Do YYYY")); 
            setLangBtn('Arabic')
        }
    }

  if (loading) {
    return (
        <>
        <div className="relative flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-52 w-52 border-t-4 border-b-4 border-gray-200"></div>
            <img src="https://www.svgrepo.com/show/509010/avatar-thinking.svg"  className="rounded-full h-35 w-35"/>
        </div>
        </>
      
    );
  }
   

    
  return (
    <div className='flex flex-col w-[45%]'>
        <div className='border p-6 rounded-4xl bg-blue-800 text-gray-300'>

            <div className='flex justify-between items-center' dir={langBtn=='Arabic'? 'ltr' :'rtl'}>
                <h1 className="text-gray-300 text-[32px] font-bold mb-5">{t(list.cityValue)}</h1>
                <p className='text-[#b19cff] font-readex font-bold text-[15px] mt-4'>{t(date)}</p>
                <div></div>
            </div>
            <hr />
            {/* Body Content */}
            <div className='flex justify-around items-center' dir={langBtn=='Arabic'? 'ltr' :'rtl'}>

            {/* right Content */}
                <div className='space-y-2'>
                    <h1 className='text-[45px]'>{list.tempValue}</h1>
                    <div className='font-bold text-[21px]'>{t(list.descriptionValue)}</div>
                    <div className='font-light'>{t('Min')} : {list.minValue} | {t('Max')} : {list.maxValue}</div>
                </div>
            {/*end right Content */}

            {/* left Content */}
                <div className="">
                  <img src={list.weatherIcon} alt="Weather icon" className='w-[150px]'/>
                </div>
                
            {/*end left Content */}

            </div>
            {/* end Body Content */}

        </div>

        <div className='mt-5'>
          <button className="inline-flex items-center gap-2 transition duration-300 ease-linear 
            bg-blue-500 text-white leading-[1.12] 
            px-8 py-4 text-center capitalize select-none rounded-full shadow-[4px_6px_0px_0px_#050071] 
            whitespace-nowrap hover:bg-blue-900 hover:shadow-none cursor-pointer" onClick={translateToAr}>
            {langBtn}
        </button>
        </div>
    </div>
  )
}
