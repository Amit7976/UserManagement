"use client";
import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
import Banner from '@/components/Banner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero';
import Map from '@/components/Map';
import { useEffect, useRef, useState } from 'react';
import MainContent from './MainContent';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type Event = {
  title: string;
  url: string;
  image: string;
  date: string;
  location: string;
  price: string;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Page() {
  const [city, setCity] = useState("Sydney");
  const [result, setResult] = useState<{ events: Event[] }>({ events: [] });
  const [country, setCountry] = useState("Australia");
  const [rsCity, setRsCity] = useState("Sydney");
  const [rsCountry, setRsCountry] = useState("australia");
  const mainContentRef = useRef<HTMLDivElement>(null);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  useEffect(() => {
    if (
      rsCity &&
      result?.events &&
      result.events.length > 0 &&
      mainContentRef.current
    ) {
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result, rsCity]);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div className="bg-white dark:bg-neutral-900">

      <SplashCursor/>
      <Header position="sticky" />

      <Hero
        setResult={setResult}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        setRsCity={setRsCity}
        setRsCountry={setRsCountry}
      />

      <Banner
        setResult={setResult}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        setRsCity={setRsCity}
        setRsCountry={setRsCountry}
      />


      <div ref={mainContentRef}>
        <MainContent result={result} rsCity={rsCity} rsCountry={rsCountry} />
      </div>

      <Map city={city} />
      <Footer />

    </div>
  );
}

export default Page;
