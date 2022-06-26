import React,{useState,useEffect} from 'react'
import {Container, makeStyles, Typography} from '@material-ui/core'
import { TrendingCoins } from '../../config/api'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import { CryptoState } from '../../CryptoContext'
import { Link } from 'react-router-dom';
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const useStyles=makeStyles(()=>({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }
}))
const Carousel = () => {
    const [trending, setTrending] = useState([])
   const {currency,symbol}= CryptoState();
    const fetchTrendingCoins = async ()=>{
        const {data}=await axios.get(TrendingCoins(currency));
        setTrending(data);

    }
    

  const classes=useStyles();
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency])
  const responsiveitems={
    0:{
        items:2
    },
    512:{
        items:5
    }
  }

  const  items =trending.map(coin=>{
    let profit=coin.price_change_percentage_24h>=0;
    return(
        <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
            <img 
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{marginBottom:10}}
            />
            <span>{coin?.symbol}
            &nbsp;
            &nbsp;
            <span style={{color:profit?"green":"red"}}>{profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}</span></span>
            <span>
                {symbol}{numberWithCommas(coin?.current_price)}
            </span>
    
        </Link>
      )
  }
   )
  return (
    <div className={classes.carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1500}
        animationDuration={2000}
        disableDotsControls
        responsive={responsiveitems}
        autoPlay={true}
        items={items}
        disableButtonsControls
        />
    </div>
  )
}

export default Carousel