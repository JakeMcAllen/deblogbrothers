import React, {useState} from 'react'
import axios from 'axios';
import setting from './../setting'
import './../css/Chat.css'
import cookie from 'react-cookies'





export default class articolo extends React.Component {
    constructor (props) {
        super (props); 
        this.state = { 
            idList: [],
            testoList : [],
            artList: [],
            timestampList: [],
            uList: [],
            uIdList: [],

            data: [],
            newMessage: "",

            idUser: cookie.load('idUser'),
            usernameUser: cookie.load('usernameUser'),
            windowWidth: undefined,



            id: props.id,
            pg: 0,
            msg: '',
            msgSc: '',
            listItems: null,
        }

    }




    componentDidMount() { 

        if ( this.state.usernameUser == "" || this.state.usernameUser == undefined ) 
            this.setState({"msg": "Per scrivere un messaggio prima fare il logIn, dal menù in alto."})


        this.loadDomPage(0);
        this.handleResize(); 
        window.addEventListener('resize', this.handleResize);
    }
  
  
    componentWillUnmount() { 
        window.removeEventListener('resize', this.handleResize);
    }


    handleResize = () => this.setState({ windowWidth: window.innerWidth });



    loadDomPage = (pg) => {

        if ( pg == 1 && this.state.idList.length == 0 ) pg = 0


        console.log("PG: " + pg)

        axios.get(setting.path + 'artc/comm/id=' + this.state.id + '/pg=' + pg)
        .then(res => { 


            console.log("poooo: " + res.data)

            this.setState({idList: [] });
            this.setState({testoList: [] });
            this.setState({artList: [] });
            this.setState({timestampList: [] });
            this.setState({uList: [] });
            this.setState({uIdList: [] });


            for (let i = 0; i < res.data.length; i++) {
                let heightPre = this.state.idList.length;


                if ( !(this.state.idList && this.state.idList.length > 0) ) this.setState({idList: [ res.data[i].id ] });
                else this.setState({idList: [... this.state.idList, res.data[i].id ] });

                if ( !(this.state.testoList && this.state.testoList.length > 0) ) this.setState({testoList: [ res.data[i].testo ] });
                else this.setState({testoList: [... this.state.testoList, res.data[i].testo ] });

                if ( !(this.state.artList && this.state.artList.length > 0) ) this.setState({artList: [ res.data[i].art ] });
                else this.setState({artList: [... this.state.artList, res.data[i].art ] });

                let dt = new Date(res.data[i].timestamp);
                let data = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();

                if ( !(this.state.timestampList && this.state.timestampList.length > 0) ) this.setState({timestampList: [ data ] });
                else this.setState({timestampList: [... this.state.timestampList, data ] });

                if ( !(this.state.uList && this.state.uList.length > 0) ) this.setState({uList: [ res.data[i].u ] });
                else this.setState({uList: [... this.state.uList, res.data[i].u ] });

                if ( !(this.state.uIdList && this.state.uIdList.length > 0) ) this.setState({uIdList: [ res.data[i].id_u ] });
                else this.setState({uIdList: [... this.state.uIdList, res.data[i].id_u ] });

                
                if ( (this.state.idList.length % setting.msgPerPage) == 0 && 
                    this.state.idList.length > heightPre) this.setState({pg: ( pg ) });                
            }

        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        }); 

    }



    addComment = () => {

        let newVal = this.state.newMessage;

        var today = new Date();


        console.log("this.state.idUser_" + this.state.idUser + "_")

        if ( this.state.newMessage != '' ) {
            if ( this.state.idUser == '' || this.state.idUser === undefined ) {

                this.setState({ msgSc: "Per scrivere nella chat l'utente deve essere loggato" });
            } else {

                const toSend = {
                    testo: this.state.newMessage,
                    art: this.state.id,
                    idU: 1,
                    u: this.state.usernameUser
                }
            
                axios.post(setting.path + 'artc/addComm/' + this.state.idUser, toSend)
                .then(res => {
            
                    console.log("res: " + res);

                    this.setState({ msgSc: 'Messaggio inviato' });
                    this.setState({newMessage: ""});

                })
                .catch(error => {
            
                    this.setState({ msg: 'LogIn fallito: ' + error });
                    console.error('There was an error!', error);
            
                });
            }
        }

    }


    render() {
        return (
            <div className="rootChat"> 
                <div className="chatBoxConntainer">

                    <div className="inputBoxContainer" style={ this.state.windowWidth < 600 ? {textAlign: 'center'} : {} }>
                        <input className="inputSpace" onChange={ (e) => this.setState({newMessage: e.target.value}) } /> 
                        <button onClick={ () => this.addComment() } className="buttonInputSpace" > 
                            Commenta 
                        </button>
                    </div>
                    <p className="errorMessage"> {this.state.msg} </p> 
                    <p className="CorectMessage" style={{color: "#b80000"}}> {this.state.msgSc} </p>
                    <div className="ListMessages">

                        { 
                            this.state.idList == "" 
                            ?
                                <p style={{color: 'green', fontWeight: 'bold'}}> Ancora nessun commento. Sii il primo a commentare ! </p> 
                            :
                                this.state.idList.map( (val, key) => {
                                return (
                                    <div className="rootMessage" key={key} className="itemMessages">
                                        <div className="timeMessage" style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}>
                                            {this.state.timestampList[key]}
                                        </div>
                                        <div className="messageText_Nome" >
                                            <p className="testoMessage" > {this.state.testoList[key]} </p>
                                            <p className="nomrMessage" style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}> {this.state.uList[key]} </p>
                                        </div>
                                    </div>
                                ) }) 
                        }

                        <div className="AddOlderMessagesBox">
                            <button onClick={ () => this.loadDomPage(this.state.pg + 1)} className="AddOlderMessages">
                                Vedi altri
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}