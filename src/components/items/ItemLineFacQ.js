import React from 'react'
import './../../css/ItemButton.css'
import copy from 'copy-to-clipboard';
import setting from '../../setting';



const styleHidden = {
    visibility: 'hidden',
    height: 0,
    padding: '0px',
    margin: '0px'
}

const styleVisible = {
    visibility: 'visible'
}

export default class ItemLine extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            id: props.id,
            title: props.title,
            text: props.text,
            visible: false,
            cliccato: false
        }

        console.log("window.location.pathname: " + window.location.origin)
    }


    changeVisibility = () => { this.setState({visible: !this.state.visible}); }


    addLink = () => {
        this.setState({cliccato: true});
        copy(window.location.origin + "/FacQ/dom=" + (this.state.id + 1) );
    }


    render() {
        return (
            <div className="p-2 bd-highlight col-example">
                <div className="d-flex flex-wrap bd-highlight example-parent" style={{display: 'flex'}}>
                    <div className="p-2 bd-highlight col-example">
                        <div style={{display: 'inline-flex'}}> 
                            <h1 className="currentTitle" style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}> 
                                { this.state.title } 
                                <button onClick={this.addLink} className="buttonLinks">
                                    { (this.state.cliccato) ?
                                        <img src="https://img.icons8.com/fluent-systems-regular/48/000000/broken-link.png"/>:
                                        <img src="https://img.icons8.com/ios-glyphs/30/000000/broken-link.png"/>
                                    }
                                </button>
                            </h1> 
                            <button className="ItemButtonFQ" onClick={ this.changeVisibility }
                                style={(this.state.visible) ? {backgroundColor: '#e3a419'} : {backgroundColor: 'cornflowerblue'} }> 
                                {this.state.visible ? '/\\' : 'V'} 
                                
                            </button> 
                        </div>
                            <p 
                                className = "Pclass" 
                                style={this.state.visible ? styleVisible : styleHidden}
                            > 
                                { this.props.text }
                            </p>
                        </div>
                    </div>
                <hr />
            </div>
        )
    }
}