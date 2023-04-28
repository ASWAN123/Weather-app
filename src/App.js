import { useEffect, useState } from 'react';
import Dashboard from './componenets/Dashbaord/Dashboard' ;
import Hightlights from './componenets/Hightlights/Hightlights';
import NextDays from './componenets/NextDays/NextDays';
import Footer from './componenets/footer/Footer';



function App() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [currentWeather  , setCurrentWeather] = useState({})
  const  [nextdays  , setNextdays] = useState([])
  const [city ,  setCity] = useState('10001')
  const [temperaturefromat , setTumperature] = useState('c') 


  let getCurrentWeather  = async (city) => {
      const  url  = 'https://api.weatherapi.com/v1/current.json?key='+API_KEY+'&q='+city

      try{
          const response = await fetch(url)
          const data = await response.json()
          console.log(data)
          setCurrentWeather(data)

      }catch{
          console.log('there is  a  problem  fetching  data ')
      }
  }
  




    
  const futureWeather = async ()=> {
      const url = 'https://api.weatherapi.com/v1/forecast.json?key='+API_KEY+'&q='+city+'&days=3&aqi=no&alerts=no'
      try{
          const  response = await fetch(url) ;
          const data  = await response.json() ;
          setNextdays(data.forecast.forecastday)
          console.log(data.forecast.forecastday)
          
      }catch{
          console.log('there is a  problem')
      }
  }


  useEffect(()=> {
        getCurrentWeather(city)
        futureWeather()
  } , [city])




  return (
    <div className="App">
      <div className='flex  flex-col lg:flex-row '>
        <Dashboard currentWeather = {currentWeather} setCity={setCity} temperaturefromat = {temperaturefromat} setTumperature  = {setTumperature}/>
        <div className='flex flex-col min-w-[70%] min-h-screen bg-[#100E1D] lg:px-12'>
          <NextDays nextdays = {nextdays} temperaturefromat = {temperaturefromat} />
          <Hightlights currentWeather = {currentWeather}  />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
