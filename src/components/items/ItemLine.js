import React from 'react'
import './../../css/ItemButton.css'
import { Link } from "react-router-dom";
import setting from './../../setting'


const styleHidden = {
    visibility: 'hidden',
    height: 0,
    padding: '0px',
    margin: '0px',
}



export default class ItemLine extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            id: props.id,
            title: props.title,
            text: props.text,
            visible: (this.props.num == 0) ? true : false,
            num: this.props.num,
        }
    }


    changeVisibility = () => { this.setState({visible: !this.state.visible}); }


    render() {
        return (
            <div className="p-2 bd-highlight col-example">
                <div className="d-flex flex-wrap bd-highlight example-parent" style={{display: 'flex'}}>
                    <div className="p-2 bd-highlight col-example">
                        <div style={{display: 'inline-flex'}}> 
                            <h1 className="currentTitle" > 
                                <Link 
                                    className="titleLink" 
                                    to={"/Articolo/" + this.state.id} 
                                    onClick={() => this.setState({page: '/'})}
                                    style={{"color": this.props.colorMode ? setting.whiteColorInv : setting.darkColorInv }}
                                > 
                                    { this.state.title }
                                </Link>
                            </h1> 
                            <button 
                                className="ItemButton"
                                onClick={ this.changeVisibility }
                                style={(this.state.visible) ? {backgroundColor: '#e3a419'} : {backgroundColor: 'cornflowerblue'} }
                            > 
                                {this.state.visible ? '/\\' : 'V'} 
                            </button> 
                        </div>
                        <p className = "Pclass" style={this.state.visible ? { visibility: 'visible' } : styleHidden}> 
                            { this.state.text + " " }
                            <Link 
                                to={"/Articolo/" + this.state.id} 
                                style={{color: this.props.colorMode ? 'blue' : '#e3a419', fontWeight: 800}} 
                                onClick={() => this.setState({page: '/'})}
                                className="linkCAL"
                            >
                                ... continua a leggere
                            </Link> 
                        </p>
                    </div>
                </div>
                <hr style={ (this.props.maxNum - this.props.num) != 1 ? {margin: '0 10%'} : {visibility: 'hidden'} }/>
            </div>
        )
    }
}