
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "https://api.quotable.io/random";


function App() {
  const [quote,setQuote] = useState('')
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response)
      setQuote(response.data.content);
    });
  }, []);

  const checkQuotable = async() => {
    try{
      axios.get(baseUrl).then((response) => {
        setQuote(response.data.content);
      });
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      <h2>Daily Quotes</h2>
      <p>{quote}</p>
     <button  className="h-1/6 outline-none border border-danger font-bold font-raleway mx-12 px-12 rounded-sm bg-danger text-bc transition duration-300 hover:bg-bc hover:text-primary md:h-16 md:my-12"
          onClick={checkQuotable}>New Quote</button>
    </div>
  );
}

export default App;
