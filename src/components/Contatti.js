import React, { Fragment } from 'react'
import "./../css/contatti.css"
import { Link } from "react-router-dom";
import setting from '../setting';

const flexCond = { display: 'flex' }
const gridCond = { display: 'grid' }



export default class Contatti extends React.Component {
    constructor (props) {
        super (props);      
        this.state = {
            windowWidth: undefined
        }
    };
    
        
    handleResize = () => this.setState({ windowWidth: window.innerWidth });
    componentDidMount() { this.handleResize(); window.addEventListener('resize', this.handleResize) }
    componentWillUnmount() { window.removeEventListener('resize', this.handleResize) }
    
    
    render() {
        return (
            <Fragment>
                <div
                    style={{
                        backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                        color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv
                    }}
                >
                    <h1 className="titleContatti"> Contatti </h1>
                    <dir className="textCollegamenti"> 
                        DeBlogBrothers nasce per esaltare il legame tra Fotografia e Scrittura, le nostre più grandi passioni.
                        <br />
                        Se anche tu ti senti vicino a questi meravigliosi ambiti, contattaci subito per diventare Protagonista della prossima pubblicazione!
                        <br />
                        Raccontaci di te, dei tuoi gusti, delle tue esperienze: per Matteo e Simone sarà un piacere risponderti e realizzare con te un nuovo progetto.
                        <br />
                        Ti aspettiamo ;-D 
                    </dir>
                </div>
                <div
                    style={{
                        backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                        color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv
                    }}
                >
                    <h1 className="subtitle"> Riferimenti </h1>
                    <div className="contattiBox" style={ (this.state.windowWidth < 600) ? gridCond : flexCond }>
                        <div className="containerContatti">
                            <div className="refBoxContainer">
                                <img className="ImgContact" src="https://img.icons8.com/ios/50/000000/mail.png"/>
                                <a 
                                    className="refBox" 
                                    href={"mailto:deblogbrothers@gmail.com"}
                                    style={{color: this.props.colorMode ? 'blue' : '#e3a419' }}
                                > 
                                    deblogbrothers@gmail.com
                                </a> 
                            </div>
                            <p>
                                Non abbiamo ancora un numero aziendale! Se vuoi contattarci, puoi trovare i numeri di telefono di Matteo e Simone nella sezione "
                                <Link 
                                    to="/ChiSiamo" 
                                    onClick={() => { this.setState({menuIsOpen: false}); this.props.changePath("/ChiSiamo") } } 
                                    style={{color: 'blue'}}
                                    style={{color: this.props.colorMode ? 'blue' : '#e3a419', fontWeight: 800 }}
                                >
                                    Chi siamo
                                </Link> 
                                ". Grazie, buona giornata!
                            </p>
                        </div>    

                    </div>
                </div>
            </Fragment>
        )
    }
}
