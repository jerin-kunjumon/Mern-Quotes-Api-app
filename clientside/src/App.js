import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "https://dummyjson.com/quotes/random";

function App() {
  const [quote, setQuote] = useState("");
  const [quoteArray, setQuoteArray] = useState([]);

  const fetchQuotes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/quote");

      setQuoteArray(response.data);
      console.log(quoteArray);
    } catch (err) {
      console.error(err);
    }
  });
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log(response);
      setQuote(response.data.quote);
    });
    fetchQuotes();

  }, [fetchQuotes]);

  const checkQuotable = async () => {
    try {
      await axios.get(baseUrl).then((response) => {
        setQuote(response.data.quote);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const saveQuote = () => {
    try {
      axios.post("http://localhost:3000/api/quote", {
        quote,
      });
      fetchQuotes();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="App mx-auto">
      <h2 className="font-bold">Daily Quotes</h2>
      <p>{quote}</p>
      <button
        className="h-1/6 outline-none border border-danger font-bold font-raleway mx-12 px-12 rounded-sm bg-danger text-bc transition duration-300 hover:bg-bc hover:text-primary md:h-16 md:my-12"
        onClick={checkQuotable}
      >
        New Quote
      </button>
      <button
        className="h-1/6 outline-none border border-danger font-bold font-raleway mx-12 px-12 rounded-sm bg-danger text-bc transition duration-300 hover:bg-bc hover:text-primary md:h-16 md:my-12"
        onClick={saveQuote}
      >
        Save Quote
      </button>



      <table>
        <thead>
          <tr>
            <td>Qoute</td>
          </tr>
        </thead>
        <tbody>
          {quoteArray.map((quote, index) => (
            <tr key={index}>
              <td>{quote.quote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
