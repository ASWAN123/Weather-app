import React, { useEffect, useState } from 'react'
import { BsPinMap } from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiCelsiusFill } from 'react-icons/ri';
import { getcleandate } from '../dateformat'
import Searchform from './Searchform';
import { AiOutlineClose } from 'react-icons/ai';
import { TbTemperatureFahrenheit , TbTemperatureCelsius } from 'react-icons/tb';


function Dashboard({currentWeather , setCity , temperaturefromat , setTumperature}) {
    const [showForm ,  setShowForm] = useState(false)


    const  getuserlocation = ()=> {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {setCity(`${position.coords.latitude},${position.coords.longitude}`)});
              }
        }



    return (

        <div className='w-full h-screen lg:min-w-[30%] lg:max-w-[30%]  flex flex-col gap-6 lg:mr-auto ' >
            <div className='text-white px-4 py-2  flex justify-between   items-center  ' >
                <button className=' bg-gray-400 p-2  cursor-pointer ' onClick={()=> {setShowForm(true) ; console.log('clicked')}} >Search for places</button>
                <button className='bg-gray-400 rounded-[50%] p-2 cursor-pointer' onClick={getuserlocation} ><BsPinMap size={24} color='white' /></button>
            </div>

            {
                showForm && <div className='text-white fixed w-full h-screen  bg-slate-900 flex flex-col gap-6 p-4 lg:min-w-[30%] lg:max-w-[30%] '>
                     <AiOutlineClose className='ml-auto tbg-white' size={30} />
                     <Searchform setCity={setCity} setShowForm ={setShowForm}/> 
                     </div>
            }



            {/* today weather status */}
            { !showForm &&
                <div className='w-full flex flex-col justify-center items-center md:mt-2'>
                <img className=' w-[300px] h-[300px] object-contain  invert-[.30] opacity-10 scale-[1.2]' src="./images/Cloud-background.png" alt="" />
                <div className=''>
                    {/* status icons */}
                    <div className='flex flex-col  justify-center items-center -mt-[10rem] '>
                        <img className='sm:w-[200px] md:w-[300px] lg:w-[150px]  ' src={`http:${currentWeather.current ? currentWeather.current.condition.icon.replace('64x64' , '128x128') :'' }`} alt="" />
                        
                    </div>
                </div>
            

                {/* some  details */}
                
                <div className='flex flex-col text-white  gap-6 items-center lg:gap-4 '>
                    <div className='flex  items-center justify-center ' >
                        <p className='text-white text-[6rem]'>{ currentWeather.current ?  currentWeather.current[`temp_${temperaturefromat}`] : "..." }</p>
                        {/* <RiCelsiusFill size={50} color='gray' className='mt-10' /> */}
                        { temperaturefromat ==='c' ? <TbTemperatureCelsius size={50} color='gray' className='mt-10'  /> : <TbTemperatureFahrenheit  size={50} color='gray' className='mt-10'/>}
                    </div>

                    <p className='text-center text-[48px] font-semibold text-gray-400 md:text-[58px] '>{currentWeather.current ?  currentWeather.current.condition.text : "..." }</p>

                    <div className='flex items-center justify-center gap-2 md:text-[25px]'>
                        <p>Today  .</p>
                        <p>{currentWeather.location ?  getcleandate(currentWeather.location.localtime ) : "..." }</p>
                    </div>


                    <div className='flex items-center justify-center gap-2 mt-6 lg:mt-1 md:text-[50px] lg:text-[20px]'>
                        <FaMapMarkerAlt />
                        <p>{currentWeather.location ?  currentWeather.location.name : "..." }</p>
                    </div>
                </div>

                {/* c of  f   */}
                <div className='text-white hidden gap-3 absolute top-auto bottom-6 md:flex  md:gap-2 md:top-[50%] md:right-3 md:flex-col lg:flex lg:flex-row lg:left-[12%] lg:bottom-2 lg:top-auto '>
                    <button onClick={() => { setTumperature('c') }} className={ temperaturefromat === 'c' ? ' rounded-xl bg-gray-600  p-2' : ' rounded-xl bg-white  p-2' }><TbTemperatureCelsius size={25} color={ temperaturefromat ==='c' ? 'white' :'black' } /></button>
                    <button onClick={() => { setTumperature('f') }} className={ temperaturefromat === 'f' ? ' rounded-xl bg-gray-500  p-2' : ' rounded-xl bg-white p-2' } ><TbTemperatureFahrenheit color={ temperaturefromat ==='f' ? 'white' :'black' }  size={25}/></button>
                </div>
                
                </div>
            }
            
        </div>
    )
    }

export default Dashboard