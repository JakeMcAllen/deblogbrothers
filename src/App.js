import React, { Component } from 'react'

import ChiSiamo from './components/ChiSiamo'
import Contatti from './components/Contatti'
import Home from './components/Home'
import FacQ from './components/faQ'
import Articolo from './components/Articolo'
import Registrazione from './components/Registrazione'
import CopyRight from './components/CopyRight'
import cookie from 'react-cookies'


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './css/nav.css';
import './css/App.css'
import MenuComponent from './components/menu/MenuComponent'
import Footer from './components/menu/Footer'
import setting from './setting'




export default class App extends React.Component {

  constructor (props) {
    super (props);
    var currentLocation = window.location.pathname.split("/")[1];

    this.state = {
      // true_light --- false_dark
      colorMode: cookie.load('colorMode'),    // true_light --- false_dark
      menuOpen: false,
      currentPath: "/" + currentLocation,
    }
  }


  changeColorMode = () => { 

    var nDate = new Date();
    nDate.setDate(nDate.getDate() + setting.cookiesPlusDay);

    cookie.save('colorMode', cookie.load('colorMode') === "true" ? "false" : "true", { path: '/', expires: nDate }); 
    this.setState({colorMode: !this.state.colorMode});
  }
  changeMenuState = () => { this.setState({menuOpen: !this.state.menuOpen}); }
  changePath = (path) => { this.setState({currentPath: path}); }



  render() {
    return (
      <Router>
        <div>
          <MenuComponent 
            changeColorMode={this.changeColorMode} 
            changeMenuState={this.changeMenuState} 
            colorMode={this.state.colorMode} 
            changePath={this.changePath}
            currentPath={this.state.currentPath}
          />
        </div>
        <main>
          <Switch>
            <Route path="/" exact >
              <Home 
                colorMode={this.state.colorMode} 
                menuOpen={this.state.menuOpen}
                changePath={this.changePath}
              />
            </Route>
            <Route path="/ChiSiamo" >
              <ChiSiamo 
                colorMode={this.state.colorMode} 
              />
            </Route>
            <Route path="/Contatti" >
              <Contatti 
                colorMode={this.state.colorMode} 
                changePath={this.changePath}

              />
            </Route>
            <Route path="/FaQ" >
              <FacQ 
                colorMode={this.state.colorMode} 
              />
            </Route>

            // Gestione
            <Route path="/Articolo" >
              <Articolo 
                colorMode={this.state.colorMode} 
                changePath={this.changePath}
              />
            </Route>
            <Route path="/Registrazione" >
              <Registrazione 
                colorMode={this.state.colorMode}  
              />
            </Route>

            // copyright
            <Route path="/CopyRight" >
              <CopyRight
                colorMode={this.state.colorMode}  
              />
            </Route>

          </Switch>
        </main>
        <Footer 
          colorMode={this.state.colorMode} 
          changePath={this.changePath}
        />
      </Router>
    )
  }

};