import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './components/Coin'; // Ensure this path is correct


const options = {
  method: 'GET',
  url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list',
  params: {
    time_utc_offset: '28800',
    lang_ID: '1',
  },
  headers: {
    'x-rapidapi-key': '0bb88d90camsh764f29f9b541961p15915djsn29c5780c03d4',
    'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
  },
};

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        console.log('Full response:', response.data); // Log the full response to verify structure
        const cryptoData = response.data?.data?.[0]?.screen_data?.crypto_data || [];
        console.log('Extracted crypto data:', cryptoData); // Log the extracted crypto data
        setCoins(cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // The filteredCoins function filters the list of coins based on the user's search input. Here's an explanation and a script for this part of your YouTube tutorial:
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <Coin key={coin.id} name={coin.name} image={coin.flag_url} volume={coin.volume_24h_usd_plain/1000000000} price={coin.inst_price_usd} priceChange={coin.change_percent_1d} marketcap={coin.inst_market_cap_plain/1000000000}/>
              ))
            ) : (
              <p>No coins found</p>
            )}
    </div>
  );
}

export default App;
