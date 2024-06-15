import { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [city, setCity] = useState("Dhanbad"); // Initialize with default city

  const API_KEY = "c731b7aaecbe075a9227ff1ffab9b8db";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          throw new Error("Unable to fetch weather data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  if (!weatherData) return <div>Loading...</div>;

  const { main, weather } = weatherData;

  const formatDate = (date) => {
  const options = {
    day:"numeric",
    month: "long",
    year: "2-digit",
  };

  return date.toLocaleDateString(undefined, options);
};

const getDayOfWeek = (date) => {
  const options = {
    weekday: "long", // "long" for full weekday name (e.g., "Monday")
  };

  return date.toLocaleDateString(undefined, options).split(',')[0];
};

const formatTime = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString(undefined, options);
};



const formattedDate = formatDate(currentDateTime); // Example: "14 June 2024"
const formattedTime = formatTime(currentDateTime); // Example: "3:30 PM"

const dayOfWeek = getDayOfWeek(currentDateTime); // Example: "Monday"

  return (
    <div className="flex flex-col justify-center items-center mr-10 absolute top-20 left-10">
    <div className="w-[250px] h-[220px] rounded-[12px] p-[10px] space-y-[5px] " style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="flex mt-2 items-center">
        <img
          src="/location.png"
          className="w-5 h-5 ml-1 mt-2 mb-1"
          alt="Location Icon"
        />
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          className="font-inter font-light text-[20px] w-full ml-1 mt-1 mb-1 focus:outline-none bg-transparent text-gray-50"
          style={{ boxShadow: "none" }}
        />
        <img
          src="/search.png"
          className="w-5 h-5 mt-2 mb-1"
          alt="Search Icon"
        />
      </div>
      <div className="flex justify-center mt-2">
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          className="w-[60px] h-[60px]"
          alt="Weather Icon"
        />
      </div>
      <div className="flex items-start justify-between mt-2">
        <div className="mt-1">
          <div className="flex items-end">
            <p className="text-2xl leading-6 text-white font-inter font-thin mb-1">
              {Math.round(main.temp)}
            </p>
            <p className="text-lg text-white font-inter font-thin mb-1">&deg;C</p>
          </div>
          <p className="font-inter font-light text-base leading-[1.2] text-white drop-shadow-custom">
            {weather[0].description}
          </p>
        </div>
        <div className="font-bold text-md text-cyan-50">
          <p>{formattedDate}</p>
          <div className="flex items-center">
            <p className="  text-xs font-inter font-light  leading-[1.2] text-white drop-shadow-custom">{dayOfWeek}</p>
            <span className="mx-1 font-inter font-light text-base leading-[1.2] text-white drop-shadow-custom">|</span>
            <p className=" text-xs font-inter font-light  leading-[1.2] text-white drop-shadow-custom font-inter">{formattedTime}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    
  );
}

export default Weather;
