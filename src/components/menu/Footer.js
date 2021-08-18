import React, { Component } from 'react'
import './../../css/Footer.css'
import lngLg from './../../img/LongLogoWhite.png'
import lgB from './../../img/LogoBianco.png'
import { Link } from "react-router-dom";
import cookie from 'react-cookies'


export default class Footer extends Component {
    constructor (props) {
        super (props);
        this.state = {
            idUser: cookie.load('idUser'),
            permessi: cookie.load('permessiLvl'),
            usernameUser: cookie.load('usernameUser'),

            // page dim
            wdth: 0,
            hgth: 0,
        }
    }



    updateDimensions = () => { this.setState({ wdth: window.innerWidth }); this.setState({ hgth: window.innerHeight }); };
    changeVisibility = () => { this.setState({chatVisible: !this.state.chatVisible}); }


    componentDidMount () {

        // set event Listeners
        window.addEventListener('resize', this.updateDimensions);
        this.setState({wdth: window.innerWidth });

        window.addEventListener('resize', this.updateDimensions);
        this.setState({wdth: window.innerWidth });
    
    }


    render() {
        return (
            <div 
                className="footerRoot"
            >
                <div className="logoContainer">
                    <Link to={'/'} onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: '/Registrazione'}); this.props.changePath("/"); } } > 
                        
                        {
                            this.state.wdth < 400 ?
                            <img className="imgFooter" src={lgB} style={{width: '100px'}} /> :
                            <img className="imgFooter" src={lngLg} style={{width: '300px'}} />
                        }
                        
                    </Link>
                </div>
                <div className="fotterContainer">
                    <div className="mottoContainer">
                        Vogliamo rendere felici le persone e fornire agli utenti una piacevole esperienza online, condividendo le nostre passioni e realizzando contenuti durevoli nel tempo <br/>in cui sia possibile riconoscersi
                    </div>
                    <div className="designBy">
                        Designed by 
                            <a className="FooterLink" href="https://www.linkedin.com/in/giorgio-allena-bb37b41b6/"> Giorgio Allena</a>
                            <a className="FooterLink" href="https://www.facebook.com/salvo.sapienza.75"> Salvatore Rosario Sapienza </a>
                        <Link 
                            className="FooterLink" 
                            style={{marginTop: '20px'}} 
                            to={'/copyRight'} 
                            onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: '/copyRight'}) } } 
                        > 
                            ©CopyRight
                        </Link>

                    </div>
                </div>
                <div className="socialeAndPlus">
                    <div className="socialFooter">
                        <a href="https://www.facebook.com/deblogbrothers"> <img className="socialFooterIco" src="https://img.icons8.com/android/96/ffffff/facebook.png"/> </a>
                        <a href="https://www.linkedin.com/company/deblogbrothers/"> <img className="socialFooterIco" src="https://img.icons8.com/android/48/ffffff/linkedin.png"/> </a>
                        <a href="https://www.instagram.com/deblogbrothers/?hl=en"> <img className="socialFooterIco" src="https://img.icons8.com/metro/52/ffffff/instagram-new.png"/> </a>
                    </div>
                </div>
            </div>
        )
    }

}