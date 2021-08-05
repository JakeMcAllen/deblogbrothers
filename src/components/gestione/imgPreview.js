import React, { Component } from 'react'



export default class AddArt extends Component {
    constructor (props) {
        super (props);

        this.state = {
            img: null,
            lst: this.props.lst
        }
    };
    


    render() {
        return (
            <div>
                <button>X</button>
                <img />
            </div>
        )
    }

}