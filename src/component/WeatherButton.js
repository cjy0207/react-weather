import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <di className='weather-button' >
         
        <Button variant="light">CurrentLocation</Button>
        <Button variant="light">NewYork</Button>
        <Button variant="light">Tokyo</Button>
        
    </di>
  )
}

export default WeatherButton