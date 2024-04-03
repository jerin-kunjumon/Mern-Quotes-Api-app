
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { allQuotes } from '../../serverside/server';
const baseUrl = "https://dummyjson.com/quotes/random";


function App() {
  const [quote,setQuote] = useState('')
  
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response)
      setQuote(response.data.quote);

    });
  }, []);

  const checkQuotable = async() => {
    try{
      await axios.get(baseUrl).then((response) => {
        setQuote(response.data.quote);

      });
    } catch(err){
      console.log(err)
    }
  }
  const saveQuote= () => {
    try{
       axios.post('http://localhost:3000/api/quote', {
      quote,
    });
  } catch(err){
    console.log(err)
  }
  }

  return (
    <div className="App">
      <h2 className='font-bold'>Daily Quotes</h2>
      <p>{quote}</p>
     <button  className="h-1/6 outline-none border border-danger font-bold font-raleway mx-12 px-12 rounded-sm bg-danger text-bc transition duration-300 hover:bg-bc hover:text-primary md:h-16 md:my-12"
          onClick={checkQuotable}>New Quote</button>
          <button  className="h-1/6 outline-none border border-danger font-bold font-raleway mx-12 px-12 rounded-sm bg-danger text-bc transition duration-300 hover:bg-bc hover:text-primary md:h-16 md:my-12"
          onClick={saveQuote}>Save Quote</button>

            {/* <ul>
8      {allQuotes.map((item) => (
9        <li key={item.id}>{item.fruit}</li>
10      ))}
11    </ul> */}
          <table>
            <thead>
              <tr>
                <td>Qoute</td>
              </tr>
            </thead>
            <tbody>
           
              <tr>
              <td>

              </td>
            </tr>
            </tbody>
          </table>
    </div>

  );
}

export default App;
