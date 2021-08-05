import logoPiccoloAlpha from './../../img/logoPiccoloAlpha.png'
import React from 'react';
import { Link } from "react-router-dom";
import './../../css/nav.css'
import axios from 'axios';
import cookie from 'react-cookies'
import setting from './../../setting'
import DarkModeToggle from "react-dark-mode-toggle";
import mn from "./../../img/menu/mn.png"
import x from "./../../img/menu/x.png"


const menuClose = { visibility: 'hidden', height: '10px' }
const menuOpen = { visibility: 'visible' }
const redCl = {color: 'red'}
const greenCl = {color: 'green'}



export default class MenuComponent extends React.Component {
    constructor (props) {
      super (props);
      var currentLocation = window.location.pathname.split("/")[1];


      this.state = {
        page: currentLocation,
        menuIsOpen: false, 
        windowWidth: undefined,
        nome: '',
        password: '',

        msg: '',
        msgSc: '',
        logged: '',
        
        nomeUser: cookie.load('nomeUser'),
        cognomeUser: cookie.load('cognomeUser'),
        idUser: cookie.load('idUser'),
        usernameUser: cookie.load('usernameUser'),
        permessi: cookie.load('permessiLvl'),

        colorStyle: this.props.colorMode,
      }

      this.inputRef = React.createRef();
    };




    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside); 
      this.handleResize(); window.addEventListener('resize', this.handleResize);
    }


    componentWillUnmount() { 
      document.removeEventListener('mousedown', this.handleClickOutside);
      window.removeEventListener('resize', this.handleResize);
    }

  
    handleResize = () => this.setState({ windowWidth: window.innerWidth });


  
    logIn = () => {
      this.setState({ msgSc: '' });
      this.setState({ msg: ''});

      const toSend = {
        username: this.state.nome,
        password: this.state.password
      }

      axios.post(setting.path + "usr/contUsr", toSend)
      .then(res => {
        var nDate = new Date();
        nDate.setDate(nDate.getDate() + setting.cookiesPlusDay);

        cookie.save('nomeUser', res.data.nome, { path: '/' });
        cookie.save('cognomeUser', res.data.cognome, { path: '/' });
        cookie.save('idUser', res.data.id, { path: '/' });
        cookie.save('usernameUser', res.data.username, { path: '/', expires: nDate });
        cookie.save('permessiLvl', res.data.permessi, { path: '/' });

        this.setState({ msgSc: 'Successo' });
      })
      .catch(error => {

        this.setState({ msg: 'LogIn fallito: ' + error });
        console.error('There was an error!', error);

      });

    }


    logOut = () => {
      this.setState({ msgSc: '' });
      this.setState({ msg: ''});

      cookie.save('nomeUser', "", { path: '/' });
      cookie.save('cognomeUser', "", { path: '/' });
      cookie.save('idUser', "", { path: '/' });
      cookie.save('usernameUser', "", { path: '/' });
      cookie.save('permessiLvl', "", { path: '/' });

      this.setState({nomeUser: ""});
      this.setState({cognomeUser: ""});
      this.setState({idUser: ""});
      this.setState({usernameUser: ""});
      this.setState({permessi: ""});
    }

    chancheColorTherne = () => {
      this.state.colorMode = !this.state.colorMode; 
      this.setState({colorStyle: !this.state.colorStyle});

      this.props.changeColorMode();
    }



    render() {
      return (
        <div style={{ backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor }} >
          <div className="MenuComponent_container" >
            <nav 
              className="navContainer"
              style={{ borderBottom: "solid 1px white"}}
            >
              <div style={{margin: 'auto 10px'}}>
                <Link to={'/'} onClick={() => { this.setState({menuIsOpen: false}); this.props.changePath("/") }} > 
                  <img className="imgLogo" src={logoPiccoloAlpha} />
                </Link> 
              </div>
              <ul 
                className="nav" 
                style={(this.state.windowWidth < 600) ? menuClose : menuOpen }
              >
                <li className={ ( this.props.currentPath === '/' || this.props.currentPath === '') ? 'aPage' : '' }> 
                  <Link 
                    to='/' 
                    onClick={() => { this.setState({page: '/'}); this.props.changePath("/"); }} 
                    style={ 
                      this.props.colorMode ? 
                      {color: setting.lightColorInv}: 
                      {color: setting.darkColorInv}
                    }
                  >
                    Home
                  </Link> 
                </li>
                <li className={ this.props.currentPath === '/ChiSiamo' ? 'aPage' : '' } > 
                  <Link 
                    to='/ChiSiamo' 
                    onClick={() => { this.setState({page: 'ChiSiamo'}); this.props.changePath("/ChiSiamo"); }}
                    style={ 
                      this.props.colorMode ? 
                      {color: setting.lightColorInv}: 
                      {color: setting.darkColorInv}
                    }
                  >
                    Chi siamo
                  </Link> 
                </li>
                <li className={ this.props.currentPath === '/Contatti' ? 'aPage' : '' } > 
                  <Link 
                    to="/Contatti" 
                    onClick={() => { this.setState({page: 'Contatti'}); this.props.changePath("/Contatti"); }}
                    style={ 
                      this.props.colorMode ? 
                      {color: setting.lightColorInv}: 
                      {color: setting.darkColorInv}
                    }
                  >
                    Contatti
                  </Link> 
                </li> 
                <li className={ this.props.currentPath === '/FaQ' ? 'aPage' : '' } >
                  <Link 
                    to="/FaQ" 
                    onClick={() => { this.setState({page: 'FaQ'}); this.props.changePath("/FaQ"); }}
                    style={ 
                      this.props.colorMode ? 
                      {color: setting.lightColorInv}: 
                      {color: setting.darkColorInv}
                    }
                  >
                  FaQ
                  </Link> 
                </li>
              </ul>

              <div 
                className="MenuButtonContainer"
                style={{
                  display: 'flex', 
                  justifyContent: 'center'
                }}
              >

                <DarkModeToggle
                  onChange={ () => this.chancheColorTherne() }
                  checked={ this.props.colorMode}
                  size={60}
                />
              </div>

              <div className="MenuButtonContainer">
                <button 
                  className="MenuButton" 
                  onClick={ () => {
                    this.setState({menuIsOpen: !this.state.menuIsOpen});
                    this.props.changeMenuState();
                  }} 
                  style={{
                    backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                    padding: 0
                  }}
                >

                  {
                    this.props.colorMode ?
                      this.state.menuIsOpen ? 
                        <img className="imgMenu" src="https://img.icons8.com/ios-filled/100/000000/x.png"/> :
                        <img className="imgMenu" src="https://img.icons8.com/android/24/000000/menu.png"/>
                    :
                      this.state.menuIsOpen ? 
                      <img className="imgMenu" src={x}/> :
                      <img className="imgMenu" src={mn}/>
                  } 
                  
                </button>
              </div>
            </nav>
          </div>
          <div 
            className="MenuBox" 
            style={ (this.state.menuIsOpen) ? menuOpen : menuClose }
          >
            <ul 
              className="nav2"
              style={{backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor }}
            >
              <li className="posNav"> 
                <Link 
                  to={'/'} 
                  onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: '/'}) } } 
                  style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}
                >
                  Home {this.props.colorMode ? "true" : "false" }
                </Link> 
              </li>
              <li className="posNav"> 
                <Link 
                  to={'/ChiSiamo'} 
                  onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: 'ChiSiamo'}) } }
                  style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }} 
                >
                  Chi siamo
                </Link> 
              </li>
              <li className="posNav"> 
                <Link 
                  to="/Contatti" 
                  onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: 'Contatti'}) } }
                  style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}
                >
                  Contatti
                </Link> 
              </li> 
              <li className="posNav"> 
                <Link 
                  to="/FacQ" 
                  onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: 'FacQ'}) } }
                  style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}
                >
                  FacQ
                </Link> 
              </li>
            </ul> 
            <div 
              className="logInContainer" 
              style={{ 
                backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor, 
                color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv 
              }}
            >
              {
                ( this.state.usernameUser == "" || this.state.usernameUser == undefined )  
                
                ?
                
                <div className="flexConntainerBox">
                  <h1 className="loogInTitle">LogIn</h1>
                  <p className="EndStatus" style={(this.state.msg == '') ? greenCl : redCl } > {this.state.msg} {this.state.msgSc} </p>
                  <div className="logBoxInput">
                    <input placeholder="nome" type="text" onChange={ (e) => this.setState({nome: e.target.value}) } />
                    <input placeholder="password" type="password" onChange={ (e) => this.setState({password: e.target.value}) } />
                    <button onClick={this.logIn} className="LogInButton" > LogIn </button>
                  </div>
                  <div className="containerRegistrati"> 
                    <p> 
                      Sei un nuovo utente ? <br /> Inscriviti per commentare ed interagire <br />
                      <Link  to={'/Registrazione'} onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: '/Registrazione'}) } }> 
                        <b style={{color: this.props.colorMode ? 'blue' : 'azure'}}> 
                          REGISTRATI 
                        </b> 
                      </Link>
                    </p>
                  </div>
                </div> 
                
                :

                <div className="flexConntainerBox">
                  <h1 className="loogInTitle"> Ciao {this.state.usernameUser} ! </h1>
                  <button className="logOutButton" onClick={this.logOut} style={(this.state.windowWidth < 700 ) ? {'margin': 0} : {margin: '2% 40%'}}>
                    LogOut
                  </button>
                </div>

              }
            </div>
          </div>
        </div>
       )
    }
}