"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { FcSearch } from "react-icons/fc";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const inputRef = useRef(null);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [location, setLocation] = useState([]);
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_OW_KEY;

  const fetchWeather = async => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${apiKey}`;
    
    fetch(URL)
      .then(res => res.json())
      .then(data =>{
        if (data.cod == 404 || data.cod == 400) {
          setFound(false);
        }
        else{
          console.log(data, "--data");
          setTemperature(data.main.temp);
          setHumidity(data.main.humidity);
          setLocation([data.name, data.sys.country]);
          setSearched(true);
          setFound(true);
        }})
      .catch(err=>{
        console.log(err);
      })
  };

  const buttonHandler = () => {
    fetchWeather();
  }

  const tempCondition = (t) => {
    return (
      t > 27 ? 
      <picture className="">
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f975/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f975/512.gif" alt="🥵" width="144" height="144"/>
      </picture>
      : t < 20 ?
      <picture>
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f976/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f976/512.gif" alt="🥶" width="144" height="144"/>
      </picture>
      : 
      <picture>
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.webp" type="image/webp"/>
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.gif" alt="☺" width="144" height="144"/>
      </picture>
    )
  }


  return (
    <main className={`w-screen h-screen bg-blueB flex text-[.8vw] text-neutralA ${inter.className} font-medium`}>
      <div className={`justify-center bg-neutralE w-[72vw] h-[60vh] flex m-auto rounded-[.8vw] shadow-lg`}>
        <div className="w-[50%] h-[50%] rounded-r-[.8vw] flex-col">
          <div className="w-full h-[6vh] flex mt-[1vh] "> 
            <span className=" text-neutralA mx-auto text-[1.5vw]">
              {`OPEN WEATHER API`}
            </span>
          </div>
          <div className="m-auto h-[9vh] w-[80%] mt-[4vh] flex">
            <input type="text" name="" id="" ref={inputRef} placeholder="Masukkan Lokasi Anda" className="mx-auto w-[80%] h-[50%] rounded-[.8vw] bg-neutralF shadow-lg border-1 outline-none text-black pl-[.8vw]"/>
            <button onClick={buttonHandler}>
              <FcSearch size={`1.8vw`} className="relative -translate-x-[4.3vw] -translate-y-[1vw] hover:cursor-pointer"></FcSearch>
            </button>
          </div>
          <div className="h-[40vh] w-full rounded-bl-[.8vw] flex text-center">
            {found ? (searched ? 
            <div className="flex flex-col mx-auto justify-center">
              <span className="">
                {`Lokasi: ${location[0]}, ${location[1]}`}
              </span>
              {tempCondition(temperature)}
              <span>
                {`Suhu: ${temperature}°C`}
              </span>
              <br />
              <span>
                {`Kelembaban: ${humidity}%`}
              </span>
            </div> :
            <div>
            </div> ): 
            <div className="flex flex-col mx-auto justify-start">
              <picture>
                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f640/512.webp" type="image/webp"/>
                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f640/512.gif" alt="🙀" width="188" height="188"/>
              </picture>
              <span>
                {`Data Tidak Ditemukan`}
              </span>

            </div> }
          </div>
          
        </div>
        <div className="w-[50%] h-full bg-blueE rounded-r-[.8vw]">

        </div>
        

      </div>
    </main>
  );
}
