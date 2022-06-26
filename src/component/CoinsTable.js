import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import { AppBar, Container, createTheme, LinearProgress, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import {Pagination} from '@material-ui/lab'
import { CoinList } from '../config/api'
import  { CryptoState } from '../CryptoContext'
import { Classnames } from 'react-alice-carousel'
import { useHistory } from 'react-router-dom'
import { numberWithCommas } from './Banner/Carousel'


const CoinsTable = () => {
    const history=useHistory()
    const {currency}=CryptoState()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const {symbol}=CryptoState()
    const [page, setPage] = useState(1)


    const fetchCoins =async ()=>{
        setLoading(true)
        const {data}= await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }

    
    
    useEffect(() => {
      fetchCoins()
      
    }, [currency])


    const darkTheme=createTheme({
        palette:{

            primary:{
                main:"#eee"
            },
            type:"dark"
            
        },
    })
    const handleSearch=()=>{
        return coins.filter(coin=> coin.name.toLowerCase().includes(search) ||coin.symbol.toLowerCase().includes(search))
    }
const useStyles=makeStyles(()=>({
    row:{
        cursor:"pointer",
        "&:hover":{
        backgroundColor:"#141413"
        }
    }
}))
  const classes=useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
        <Typography variant="h4" style={{margin:18}}>
            CryptoCurrency By Market Cap
        </Typography>
        <TextField
        label="Search The Crypto$"
        variant="outlined"
        style={{marginBottom:20,width:"100%"}}
        onChange={(e)=>setSearch(e.target.value)}
        />


        <TableContainer>
        {loading ?
        (<LinearProgress style={{backgroundColor:"goldenrod"}}/>)
        :
        (
        <Table>
            <TableHead style={{backgroundColor:"gold"}}>
                <TableRow>
                    {["Coin","Price","24h Change","MarketCap"].map(head=>(
                        <TableCell style={{
                        color:"black",
                        fontSize:22,
                    }}
                    key={head}
                    align={head==="Coin"?'':'right'}
                    >
                    {head}
                    </TableCell>
                    ))
                }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map(coin=>{
                let profit=coin.price_change_percentage_24h>=0;
                return(
                    <TableRow onClick={()=>history.push(`/coins/${coin.id}`)} className={classes.row} key={coin.name}>
                        <TableCell component="th" scope="row"
                        style={{
                            display:"flex",
                            gap:22
                        }}
                        >
                            <img 
                            src={coin?.image}
                            alt={coin.name}
                            height="70"
                            style={{marginBottom:10}}
                            />
                            <div style={{display:"flex",flexDirection:"column" }}>
                                <span
                                style={{
                                    textTransform:"uppercase",fontSize:21
                                }}
                                >
                                    {coin.symbol}
                                </span>
                                <span style={{color:"grey"}}>
                                {coin.name}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell align="right">
                        {symbol}{numberWithCommas(coin?.current_price)}
                        </TableCell>
                        <TableCell align="right" style={{
                            color:profit?"green":"red",
                            fontSize:18,
                            }}>
                                {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}
                        </TableCell>
                        <TableCell align='right'> 
                            {symbol}{" "}{
                                numberWithCommas(coin.market_cap.toString().slice(0,-6))
                            }M
                        </TableCell>

                    </TableRow>
                )

                })
                }
            </TableBody>
        </Table>
        )}

        </TableContainer>
                <Pagination
                count={(handleSearch()?.length/10).toFixed(0)}
                style={{
                    display:"flex",
                    padding:20,
                    justifyContent:"center",
                    width:"100%"
                }}
                onChange={(_,value)=>{
                    console.log(_);
                    setPage(value);
                    window.scroll(0,450)
                }}
                />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable