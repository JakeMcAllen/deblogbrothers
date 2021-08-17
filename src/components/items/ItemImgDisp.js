import React, { Component } from 'react'
import axios from 'axios';
import setting from './../../setting'
import './../../css/Articolo.css'


export default class articolo extends Component {
    constructor (props) {
        super (props);

        this.state = {
            img: "",

            msg: "",
        }

    }


    componentDidMount () {

        let id = this.props.imgId;

        console.log("id: " + id);


        // get secondary img
        axios.get(setting.path + 'img/getImgById/' + id)
        .then(res => {
            this.setState({img: "data:image/png;base64," + res.data.img})

        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });
        
    }


    
    render() {
        return (
            <img key={this.props.key} className="photoItems" src={this.state.img} />
            // <p> {this.state.img} </p>
        )
    }

}
