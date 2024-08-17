import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="weather-button">
      <Button
        variant={`${selectedCity == null ? "secondary" : "light"}`}
        onClick={()=>handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city) => (
        <Button
          variant={`${selectedCity === city ? "secondary" : "light"}`}
          onClick={()=>handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;