import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import {makeStyles}from "@material-ui/core"
import Header from './component/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';


function App() {

  const useStyles=makeStyles(()=>({
    App:{
        backgroundColor:'#111',
        color:'white',
        minHeight:"100vh"

}}));
const classes=useStyles()
  return (
    <BrowserRouter>
    <div className={classes.App}>
    <Header/>
    <Route path="/" exact component={Home}/>
    <Route path="/coins/:id" exact component={CoinPage}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
