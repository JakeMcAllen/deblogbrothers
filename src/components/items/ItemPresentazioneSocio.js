import React from 'react'
import "./../../css/chiSiamo.css"
import { FaFacebookF, FaWordpressSimple, FaInstagram,
            FaBehance, FaFlickr, FaLinkedinIn, FaTwitter,
            IoMailOpenOutline } 
        from 'react-icons/fa';


        
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

                        { ( this.props.facebook != "" ) ? <a className="icoDisp" href={this.props.facebook}> <FaFacebookF style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.wordPress != "" ) ? <a className="icoDisp" href={this.props.wordPress}> <FaWordpressSimple style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.instagram != "" ) ? <a className="icoDisp" href={this.props.instagram}> <FaInstagram style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.behance != "" ) ? <a className="icoDisp" href={this.props.behance}> <FaBehance style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.flickr != "" ) ? <a className="icoDisp" href={this.props.flickr}> <FaFlickr style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.linkedin != "" ) ? <a className="icoDisp" href={this.props.linkedin}> <FaLinkedinIn style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }
                        { ( this.props.twitter != "" ) ? <a className="icoDisp" href={this.props.twitter}> <FaTwitter style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }} /> </a> : "" }

                    </div>
                    <div className="Contact">
                        <div className="contattiContainer">
                            <IoMailOpenOutline
                                className="ImgContact" 
                                style={{filter: this.props.colorMode ? 'invert(20%)' : 'invert(100%)' }}
                            />
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
                                    <AiOutlineWhatsApp 
                                        className="ImgContact" 
                                        style={{filter: this.props.colorMode ? 'invert(20%)' : 'invert(100%)' }}
                                    />
                                    <p 
                                        className="refBox" 
                                        style={{color: this.props.colorMode ? 'blue' : '#e3a419' }}
                                    > 
                                        <a href={this.props.whatsapp}> whatsapp </a>
                                    </p>
                                </div>
                            : ""
                        }
                        
                        <div className="contattiContainer">
                            <AiOutlinePhone 
                                className="ImgContact" 
                                style={{filter: this.props.colorMode ? 'invert(20%)' : 'invert(100%)' }}
                            />
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