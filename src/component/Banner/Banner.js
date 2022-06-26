import React from 'react'
import {Container, makeStyles, Typography} from '@material-ui/core'
import Carousel from './Carousel';
const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:'url(./banner.jpg)',
        
    },
    bannerContent:{
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
        height:400
    },
    tagline:{
        display:"flex",
        height:"50%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"
        
    },
    typo:{
        fontWeight:"bold",
        marginBottom:15,
    },
    subtitle:{
        color:"darkgrey",
        textTransform:"capitalize",
    }
}))

const Banner = () => {
    const classes= useStyles();

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography variant="h2" className={classes.typo}>CRYPTO-HUNTER</Typography>
                <Typography variant="subtitle2" className={classes.subtitle}>Get All Information Regarding Crypto-Currency</Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner