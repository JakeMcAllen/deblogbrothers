import React, { Fragment } from 'react'
// import setting from './../setting'
import DarkModeToggle from "react-dark-mode-toggle";



export default class DN extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            // true light; false dark
            currentState: true,

            toggled: false,
        }

    }


    
    chancheColorTherne = () => {
        if (this.state.currentState) {

        } else {

        }

        this.setState({currentState: !this.state.currentState})
    }



    render() {
        return (
            <div class="sun-moon">
            <DarkModeToggle
                onChange={ () => this.chancheColorTherne() }
                checked={this.state.currentState}
                size={50}
            />
            </div>
        )
    }
}