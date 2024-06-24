import React from 'react';
import './coin.css';

const Coin = ({ image, name, symbol, price, volume, priceChange, marketcap }) => {

  priceChange = parseFloat(priceChange.replace('%', ''));


  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
        </div>
    
        <div className='coin-data'>
          <p className='coin-price'>${price}</p>
          <p className='coin-volume'>${volume.toFixed(2)}B</p>
          {priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange}%</p>
          ) : (
            <p className='coin-percent green'>{priceChange}%</p>
          )}
          <p className='coin-marktetcap'>${marketcap.toFixed(2)}B</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
