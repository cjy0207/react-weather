import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton'
import ClipLoader from "react-spinners/ClipLoader";

//앱이 실행되지마자 현재위치 기반의 날씨가 보임
//날씨 정보는 도시 섭씨,화씨 날씨 상태
//5개의 버튼(현재위치, 다른 도시 4개
//버튼을 클릭하면 그 도시의 날씨 정보가 보임
//현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴
//데이터를 들고 오는동안 로딩 스피너가 돈다

const API_KEY = "552f28e18ad082913d9700abdb4bfb0f"
const cities=['seoul', 'paris', 'new york', 'tokyo']

function App() {

  const [weather, setWeather]=useState(null)
  const [city, setCity]= useState(null)
  const [loading, setLoading]= useState(false)
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
    });
  }

  const getWeatherByCurrentLocation= async (lat,lon)=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    try{
      setLoading(true)
      let res = await fetch(url)
      let data = await res.json()
      setWeather(data)
      setLoading(false)
    } catch(err){
      setAPIError(err.message);
      setLoading(false);
    }
    
  }

  const getWeatherByCity=async()=>{
    try{
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      setLoading(true)
      let res = await fetch(url)
      let data = await res.json()
      setWeather(data)
      setLoading(false)
    } catch(err){
      setAPIError(err.message);
      setLoading(false);
    }
    
  }

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);
  
  return (
    <div>
      {loading?
        <div className='container'>
          <ClipLoader
          color = "#f88c6b"
          loading={loading}
          size={150}
          />
        </div>
        : !apiError?(
          <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city}/>
          </div>
        ) : (apiError)
        }
    </div>
    
    
  );
}

export default App;
