import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../component/CoinInfo'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
// import ReactHtmlParser from 'react-html-parser'



export function numberWithCommaa(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {
  const {id}=useParams();
  const [coin, setCoin] = useState()
  const {symbol,currency} = CryptoState()
  const fetchCoin=  async()=>{
    const {data}= await axios.get(SingleCoin(id));
    setCoin(data)
  }
console.log(coin);
  useEffect(() => {
   fetchCoin();
  },[])
  const useStyles=makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]:{
        flexDirection:"column",
        alignItems:"center"
      },
    },
    sidebar:{
      display:"flex",
      width:"30%",
      flexDirection:"column",
      alignItems:"center",
      marginTop:30,
      borderRight:"3px solid gray",
      [theme.breakpoints.down("md")]:{
      // borderBottom:"3px solid gray",
      // flexDirection:"column",
        width:"100%"
      },

    },
    title:{
      color:"smokewhite",
      marginBottom:20
    },
    description:{
      width:"100%",
      paddingBottom:20,
      padding:25,
      paddingTop:0,
      textAlign:"justify"
    },key:{
      fontFamily:"Poppins",
      fontWeight:300,
    }

    
  }
  ) 
  )
  const classes =useStyles();
  if(!coin) return <LinearProgress style={{background:"goldenrod"}}/>
  return (
    
      <div className={classes.container}>
        <div className={classes.sidebar}>
        <img 
            src={coin?.image.large}
            alt={coin?.name}
            height="180"
            style={{marginBottom:30}}
            />
          <Typography variant="h3"className={classes.title}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle"className={classes.description}>
          {/* {} */}
          {coin?.description.en.split(". ")[0]}
          {/* <Parser htmlstr={coin?.description.en.split(". ")[0]} /> */}
          </Typography>
          <div className={classes.martetdata}>
            <span style={{display:"flex"}}>
          <Typography variant="h5"className={classes.key}>
            Rank:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5" style={{color:
          coin?.market_cap_rank===1?"gold":
          coin?.market_cap_rank===2?"grey":
          coin?.market_cap_rank===3?"brown": 
          "white"}} >
            {coin?.market_cap_rank}
          </Typography>
            </span>
            <span style={{display:"flex"}}>
          <Typography variant="h5"className={classes.key}>
            Current Price:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5"className={classes.value}>
           {symbol} {numberWithCommaa(coin?.market_data.current_price[currency.toLowerCase()])}
          </Typography>
            </span>
            <span style={{display:"flex"}}>
          <Typography variant="h5"className={classes.key}>
            Market Capital:
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="h5"className={classes.value}>
           {symbol} {numberWithCommaa(coin?.market_data.market_cap[currency.toLowerCase()])}
          </Typography>
            </span>
            
          </div>
        </div>
        <CoinInfo/>
      </div>
    
  )
}

export default CoinPage