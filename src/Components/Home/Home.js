
import React from 'react';
import { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch, connect } from 'react-redux';
import axios from 'axios';
import { actions  } from '../../Store/actions';
import './Home.css';
export default function Home() {
    
    const regions = useSelector((state) => state.WeatherReducer.regions);
    const currentCity = useSelector((state) => state.WeatherReducer.currentCity);
    const weatherText = useSelector((state) => state.WeatherReducer.weatherText);
    const key = useSelector((state) => state.WeatherReducer.key);
    const temp = useSelector((state) => state.WeatherReducer.temp);
    const dispatch = useDispatch();
     let favorite= { "id":key, "name":currentCity,"weatherText":weatherText}
    const [date ,setDate]= useState(["01.01.2021","01.01.2021","01.01.2021"]);
    const [temperature ,setTemperature]= useState(["dvd","vd","dvd"]);
    const [text ,setText]= useState(["dd","pp","rr"]);

    const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&q="
    const currentWeather ="http://dataservice.accuweather.com/currentconditions/v1/"
    // 57918?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=true 
    const fiveDaysUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"


    
    // 57918?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=true&metric=true

    const searchCity = async (event) => {
        debugger
        const res =  await axios.get(`${baseURL}${event.target.value}&language=en-us`)
        console.log(res.data);
        dispatch(actions.addToRegions(res.data))
        debugger
        console.log(regions)
        //setRegions(res.data)
    }


    const chooseCity = async (city) => {
        debugger
       
        dispatch(actions.setCurrentCity(city.LocalizedName));
        const Key=city.Key;
        console.log(favorite.id);
        dispatch(actions.setKey(city.Key));
        debugger
        
        //document.getElementById("areaToChoose").innerHTML = "se";
        const res0 = await axios.get("http://dataservice.accuweather.com/currentconditions/v1/57918?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=true");
        const res1 = await axios.get(`${currentWeather}${Key}?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=true`);
        debugger
        console.log(res1.data[0].WeatherText);
        console.log(res1.data[0].Temperature.Metric.Value);
        
        dispatch(actions.setWeatherText(res1.data[0].WeatherText));
        dispatch(actions.setTemp(res1.data[0].Temperature.Metric.Value));
        debugger
        const res2 = await axios.get(`${fiveDaysUrl}${Key}?apikey=3RGvmyvc1YFlR5Gf5FvUGNOHryOAUcMX&details=false`);
     for(let i=0;i<=4;i++)
     {
        //console.log(res2.data.DailyForecasts[i].Date);
        //date.push(res2.data.DailyForecasts[i].Date)
        date.push((res2.data.DailyForecasts[i].Date.split("T"))[0]) ;
        text.push(res2.data.DailyForecasts[i].Day.IconPhrase);
        temperature.push(((res2.data.DailyForecasts[i].Temperature.Maximum.Value)+(res2.data.DailyForecasts[i].Temperature.Minimum.Value))/2);
     }
        console.log(date);
        console.log(text);
        console.log(temperature)
       
    }
    
    
 

    return (

<>
<div className="container">
<div class="row">
    <center>
<div class="col">
   
</div>
</center>
  
</div>

<div class="row">
  <div class="col-sm-4  font shasowHome"> Search For Arae:
  <br></br>
  <input onChange={searchCity} />
  <br></br>
      {regions != '' && regions.map(item => (
          <div id="aaa" >
    <a   id="areaToChoose" onClick={() => chooseCity(item)}>{item.LocalizedName}</a>
    <br></br>
    </div>
    
))}
</div>
 
  <div class="col-sm-8">
      <br></br>
  <div class="card text-center bshadow">
  <div >
      <br></br>
  <button class="btn btn-primary bshadow fontButtonds" style={{ backgroundColor: 'black' }}  onClick={() => dispatch(actions.addToFavourites(favorite))} >Add to favourites</button>
  <br></br>
  <br></br>
  </div >
  
  <div >
    <h5 >{currentCity}    {temp}c</h5>
    <p >{weatherText}</p>
    
  </div>
<br></br>

 <div class="card-footer text-muted container ">
     <br></br>
    <div class="row">
        <br></br>
        <br></br>
        {temperature != '' && temperature.map((item,index) => (
         <div class="col-sm-2">
         <div class="card bshadow">
           <div class="card-body">
             <h5 class="card-title">{date[index]}</h5>
             <p class="card-text">{item}</p>
             
           </div>
         </div>
         
       </div>
    
))}



  
  
  
  
  
</div>
  </div>
  
</div>
    </div>
   
  
</div>
</div>



      </>  
        
        
              
           


            

         

 
      
    )
}
