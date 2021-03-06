import React, { Fragment } from 'react'
import ItemPresentazioneSocio from './items/ItemPresentazioneSocio'
import imgCV1 from "./../img/CV/simo.png"
import imgCV2 from "./../img/CV/matteo.png"
import setting from '../setting';



export default class ChiSiamo extends React.Component {
    constructor (props) {
        super (props);
    }

    render() {
        return (
            <Fragment>
                <div 
                    className="container" 
                    style={{
                        backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                        color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv
                    }}
                >
                    <h1 className="mainTitolo"> Chi siamo </h1>

                    <div>
                        <h3 className="subTitle"> Missione: </h3>
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

                    <div>
                        <h3 className="subTitle"> Soci: </h3>
                        <div className="socCont">
                            <ItemPresentazioneSocio  
                                img={imgCV2}
                                nome="Matteo Grasso"
                                motto="Vorrei poter scrivere misteriosamente come un gatto"
                                autoreMotto="Edgar Allan Poe"
                                descrizione="Appassionato di scrittura da quando non sapevo scrivere, torturavo i miei compagni di calcio con costanti interviste post-partita. Aspirante giornalista, scrivo perché… mi diverte! Speriamo di conoscerci meglio articolo dopo articolo."
                                mail="grasso_matteo@ymail.com"
                                phoneNumber="333 520 6361"
                                facebook="https://www.facebook.com/matteo.grasso.733"
                                wordPress="https://ilcaffe.art.blog/"
                                instagram="https://www.instagram.com/matteo__grasso/"
                                behance=""
                                flickr=""
                                linkedin=""
                                twitter=""
                                whatsapp=""
                                colorMode={this.props.colorMode}
                            />
                            <ItemPresentazioneSocio  
                                img={imgCV1}
                                nome="Simone Ribero"
                                motto="Fotografare è un atto di conoscenza"
                                autoreMotto="Franco Fontana"
                                descrizione="Appassionato di Fotografia dall’età di 18 anni. A chi conosce, dice sempre che non basta cliccare un bottone per realizzare una foto di successo: bisogna gestire tecnica, pensiero, emozioni. Interpretare la luce, gli spazi, i colori. Avere una visione d’insieme. E soprattutto, aver qualcosa da raccontare."
                                mail="simoribero@gmail.com"
                                phoneNumber="349 506 5585"
                                facebook="https://www.facebook.com/simone.ribero.99/"
                                wordPress=""
                                instagram="https://www.instagram.com/foto.simone.ribero/"
                                behance="https://www.behance.net/riberosimone"
                                flickr="https://www.flickr.com/photos/simone-ribero/"
                                linkedin="https://www.linkedin.com/in/simone-ribero/"
                                twitter="https://twitter.com/simoribero"
                                whatsapp="https://wa.me/message/VCDDMWZDOV55F1"
                                colorMode={this.props.colorMode}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}