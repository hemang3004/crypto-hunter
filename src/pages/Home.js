import React from 'react'
import Banner from '../component/Banner/Banner'
import {Container, makeStyles, Typography} from '@material-ui/core'
import CoinsTable from '../component/CoinsTable'
// const image ='../ba'

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

const Home = () => {
    const classes= useStyles();
  return (
    <>
    <Banner/>
    <CoinsTable/>
    </>
    
  )
}

export default Home