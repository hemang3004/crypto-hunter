import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const Header = () => {
    const useStyles=makeStyles(()=>({
        title:{
            flex:1,
            fontWeight:'bold',
            cursor:'pointer',
            color:"goldenrod"
        }
    }))
    const classes=useStyles();
    const history=useHistory();
    const darkTheme=createTheme({
        palette:{

            primary:{
                main:"#eee"
            },
            type:"dark"
            
        },
    })
    const {currency,symbol,setCurrency}=CryptoState();
    // console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position='static'>
            <Container>
                <Toolbar>
                    <Typography onClick={()=>history.push('/')} className={classes.title}>Crypto-Hunter</Typography>
                        <Select color="primary" variant='outlined' style={{width:100,height:40,marginRight:15}}
                        value={currency}
                        onChange={e=>setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  )
}

export default Header