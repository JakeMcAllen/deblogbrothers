import React from 'react'
import "./../../css/chiSiamo.css"

const flexCond = { display: 'flex' }
const gridCond = { display: 'grid' }

export default class ItemPresentazioneSocio extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        windowWidth: undefined
      }
      console.log( (window.innerWidth < 600) )
    };

    
    handleResize = () => this.setState({ windowWidth: window.innerWidth });
    componentDidMount() { this.handleResize(); window.addEventListener('resize', this.handleResize) }
    componentWillUnmount() { window.removeEventListener('resize', this.handleResize) }

    
    render() {
       return (
            <div className="root" style={ (this.state.windowWidth < 600) ? gridCond : flexCond } >
                <div className="ImgBox">
                    <img className="immagine fondatore" src={this.props.img}  />
                </div>
                <div className="ContainerDescr">
                    <div>
                        <h1 className="titolo"> {this.props.nome} </h1>
                        <div className="MottoBox">
                            <hr />
                                <p> {this.props.motto} </p>
                                <p> -- {this.props.autoreMotto} </p>
                            <hr />
                        </div>
                        <div className="descrizioneBox">
                            <h1> {this.props.descrizione[0].toUpperCase()} </h1>
                            <p> {this.props.descrizione.substring(1)} </p>
                        </div>
                    </div>
                    <div className="socialBoxContainer">

                        { ( this.props.facebook != "" ) ? <a href={this.props.facebook}> <img className="imgIntLg" src="https://img.icons8.com/metro/52/000000/facebook.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.wordPress != "" ) ? <a href={this.props.wordPress}> <img className="imgIntLg" src="https://img.icons8.com/metro/52/000000/wordpress.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.instagram != "" ) ? <a href={this.props.instagram}> <img className="imgIntLg" src="https://img.icons8.com/ios-glyphs/60/000000/instagram-new.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.behance != "" ) ? <a href={this.props.behance}> <img className="imgIntLg" src="https://img.icons8.com/ios-glyphs/90/000000/behance.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.flickr != "" ) ? <a href={this.props.flickr}> <img className="imgIntLg" src="https://img.icons8.com/fluent-systems-filled/96/000000/flickr.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.linkedin != "" ) ? <a href={this.props.linkedin}> <img className="imgIntLg" src="https://img.icons8.com/android/96/000000/linkedin.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }
                        { ( this.props.twitter != "" ) ? <a href={this.props.twitter}> <img className="imgIntLg" src="https://img.icons8.com/material-sharp/96/000000/twitter.png" style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}/> </a> : "" }

                    </div>
                    <div className="Contact">
                        <div className="contattiContainer">
                            <img className="ImgContact" src="https://img.icons8.com/ios/50/000000/mail.png" style={{filter: this.props.colorMode ? 'invert(20%)' : 'invert(100%)' }}/>
                            <p> 
                                <a 
                                    className="refBox" 
                                    href={"mailto:" + this.props.mail}
                                    style={{color: this.props.colorMode ? 'blue' : '#e3a419' }}
                                > 
                                    {this.props.mail} 
                                </a> 
                            </p>
                        </div>

                        {
                            this.props.whatsapp != "" ?
                                <div className="contattiContainer">
                                    <img className="imgIntLg" src="https://img.icons8.com/material-outlined/48/000000/whatsapp--v1.png"/>
                                    <p> 
                                        <a href={this.props.whatsapp}> whatsapp </a>
                                    </p>
                                </div>
                            : ""
                        }
                        

                        <div className="contattiContainer">
                            <img className="ImgContact" src="https://img.icons8.com/windows/32/000000/phone.png" style={{filter: this.props.colorMode ? 'invert(20%)' : 'invert(100%)' }}/>
                            <p> 
                                <a 
                                    className="refBox" 
                                    href={"tel:+39" + this.props.phoneNumber}
                                    style={{color: this.props.colorMode ? 'blue' : '#e3a419' }}
                                > 
                                    +396 {this.props.phoneNumber} 
                                </a> 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
       )
    }
}