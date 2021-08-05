import React from 'react';
import axios from 'axios';
import './../css/Registrazione.css'
import cookie from 'react-cookies'
import setting from './../setting'


export default class MenuComponent extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
          nome: "",
          cognome: "",
          Username: "",
          password1: "",
          password2: "",

          smg: '',
          smgOK: ''
      }
    }


    Registra = () => {
        
        if ( this.state.nome == "" || this.state.cognome == "" || this.state.Username == "" || this.state.password1 == "" || this.state.password2 == "" ) {
            this.setState({smg: "Si deve compilare tutti i campi"})
        } else if ( this.state.password1 != this.state.password2 ) {
            this.setState({smg: "Le assword sono diverse"})
        } else {
            

            const recipeUrl = setting.path + "usr/contUsr";

            const toSend = {
              username: this.state.nome,
              password: this.state.password
            }
      
            axios.post(recipeUrl, toSend)
            .then(res => {
      
              cookie.save('nomeUser', res.data.nome, { path: '/' });
              cookie.save('cognomeUser', res.data.cognome, { path: '/' });
              cookie.save('idUser', res.data.id, { path: '/' });
              cookie.save('usernameUser', res.data.username, { path: '/' });
      
              this.setState({ msgSc: 'Successo' });
            })
            .catch(error => {
      
              this.setState({ msg: 'LogIn fallito: ' + error });
              console.error('There was an error!', error);
      
            });


            cookie.save('nomeUser', this.state.nome, { path: '/' });
            cookie.save('cognomeUser', this.state.cognome, { path: '/' });
            cookie.save('idUser', this.state.id, { path: '/' });
            cookie.save('usernameUser', this.state.username, { path: '/' });

        }
    }


    render() {
        return (
            <div 
                className="rootRegister"
                style={{ 
                    backgroundColor: setting.colorMode ? setting.lightColor : setting.darkColor, 
                    color: setting.colorMode ? setting.lightColorInv : setting.darkColorInv 
                }}
            >
                <h1 className="registerTitle"> Registrazione </h1>
                <p className="response" style={(this.state.smg == '') ? {color: 'green'} : {color: 'red'} }> {this.state.smg} {this.state.smgOK} </p>
                <div className="InputBoxContainer">
                    <h2> Nome: </h2>
                    <input className="InputBox" type="text" onChange={(e) => { this.setState({nome:e.target.value}) }} />
                    <h2> Cognome: </h2>
                    <input className="InputBox" type="text" onChange={(e) => { this.setState({cognome:e.target.value}) }} />
                    <h2> Username: </h2>
                    <input className="InputBox" type="text" onChange={(e) => { this.setState({Username:e.target.value}) }} />
                    <h2> Password: </h2>
                    <input className="InputBox" type="password" onChange={(e) => { this.setState({password1:e.target.value}) }} />
                    <h2> Conferma password: </h2>
                    <input className="InputBox" type="password" onChange={(e) => { this.setState({password2:e.target.value}) }} /> <br />
                    <input className="SubmitRegistration" type="submit" onClick={this.Registra} />
                </div>
            </div>
        )
    }
}
