import React, { Component } from 'react'
import axios from 'axios';
import ItemLineFacQ from './items/ItemLineFacQ'
import './../css/FacQ.css'
import { Link } from "react-router-dom";
import setting from '../setting'


export default class faQ extends Component {
    constructor (props) {
        super (props);
        this.state = {
            page: 0,
            value: '',
            arrayOfDom: [],
            arrayOfRisp: [],
            arrayOfTimestamp: [],

            maxNumPage: [],

            msg: 'Loading ... ',

            // domanda da aggiungere
            valueAdd: "",
            restAdd: "",

            // open/close controller for add a question
            addDomIsOpen: false, 
        }
    }

    componentDidMount () {


        let spcDoom = false;
        try { spcDoom = (window.location.pathname.split("/")[2]).includes("dom="); } 
        catch (e) { spcDoom = false; }


        if ( spcDoom ) {

            this.setState({arrayOfDom: []});
            this.setState({arrayOfRisp: []})
            this.setState({arrayOfTimestamp: []})
            this.setState({page: 0});
            this.setState({msg: ""});

            let id = (window.location.pathname.split("/")[2]).split("dom=")[1];


            axios.get(setting.path + 'dom/domById/' + id)
            .then(res => { 
                
                this.setState({arrayOfDom: [ res.data.titolo ] });
                this.setState({arrayOfRisp: [ res.data.risposta ] });
                this.setState({arrayOfTimestamp: [ res.data.time ] });
            }).catch(error => {

                this.setState({ msg: 'Domanda inesistente' });
                console.error('There was an error!', error);
            });



        } else {

            let pg = 0;
            if (window.location.pathname.split("/")[2] == null && window.location.pathname.split("/")[2] == undefined ) pg = 0;
            else pg = window.location.pathname.split("/")[2]

            this.setState({page: pg})

            axios.get(setting.path + 'dom/get/' + pg)
            .then(res => { 

                res.data.forEach(element => {

                    if (this.state.arrayOfDom == '') this.setState({arrayOfDom: [ element.titolo ] });
                    else this.setState({arrayOfDom: [ this.state.arrayOfDom, element.titolo ] });

                    if (this.state.arrayOfDom == '') this.setState({arrayOfRisp: [ element.risposta ] });
                    else this.setState({arrayOfRisp: [ this.state.arrayOfRisp, element.risposta ] });

                    if (this.state.arrayOfDom == '') this.setState({arrayOfTimestamp: [ element.time ] });
                    else this.setState({arrayOfTimestamp: [ this.state.arrayOfTimestamp, element.time ] });
                });

                if (res.data.length == 0) this.setState({ msg: 'Nessuna domanda trovata' });
                else this.setState({msg: ''});


            }).catch(error => {
                this.setState({ msg: 'Nessuna domanda trovata' });
                console.error('There was an error!', error);
            });


            // get number of page
            axios.get(setting.path + 'dom/length' )
            .then(res => { 

                if (res.data == 0) this.setState({maxNumPage: []})
                else {

                    let arrEx = [res.data] 
                    for (let i = 0; i < res.data; i++) { arrEx[i] = i; }
                    this.setState({maxNumPage: arrEx});
                }
 
                this.setState({msg: ""})


            }).catch(error => {
                this.setState({ msg: 'Nessuna domanda trovata' });
                console.error('There was an error!', error);
            });


        }

    }




    search = () => {

        if (window.location.pathname.includes("dom=")) window.location = '/FacQ';

        if (this.state.value != '') {
            this.setState({arrayOfDom: []});
            this.setState({arrayOfRisp: []})
            this.setState({arrayOfTimestamp: []})
            this.setState({page: 0});

            axios.get(setting.path + 'dom/getDomByStr/' + this.state.value)
            .then(res => { 
                

                res.data.forEach(element => {

                    if (this.state.arrayOfDom == '') this.setState({arrayOfDom: [ element.titolo ] });
                    else this.setState({arrayOfDom: [ this.state.arrayOfDom, element.titolo ] });

                    if (this.state.arrayOfRisp == '') this.setState({arrayOfRisp: [ element.risposta ] });
                    else this.setState({arrayOfRisp: [ this.state.arrayOfRisp, element.risposta ] });

                    if (this.state.arrayOfTimestamp == '') this.setState({arrayOfTimestamp: [ element.time ] });
                    else this.setState({arrayOfTimestamp: [ this.state.arrayOfTimestamp, element.time ] });
                });

                if (res.data.length == 0) this.setState({ msg: 'Nessuna domanda trovata' });
                else this.setState({ msg: '' });

            }).catch(error => {
                this.setState({ msg: 'Nessuna domanda trovata' });
                console.error('There was an error!', error);
            });

        } 
    }



    reloadPg = (pg) => {
        window.location = '/FacQ';

        this.setState({arrayOfDom: []})
        this.setState({arrayOfRisp: []})
        this.setState({arrayOfTimestamp: []})
        this.setState({page: pg})

        
        // http://localhost:8080/Deblogbrothers/dbb/dom/getDom/1
        axios.get(setting.path + 'dom/getDom/' + pg)
        .then(res => { 

            res.data.forEach(element => {

                if (this.state.arrayOfDom == '') this.setState({arrayOfDom: [ element.titolo ] });
                else this.setState({arrayOfDom: [ this.state.arrayOfDom, element.titolo ] });

                if (this.state.arrayOfRisp == '') this.setState({arrayOfRisp: [ element.risposta ] });
                else this.setState({arrayOfRisp: [ this.state.arrayOfRisp, element.risposta ] });

                if (this.state.arrayOfTimestamp == '') this.setState({arrayOfTimestamp: [ element.time ] });
                else this.setState({arrayOfTimestamp: [ this.state.arrayOfTimestamp, element.time ] });
            });

            if (res.data.length == 0) this.setState({ msg: 'Nessuna domanda trovata' });
            else this.setState({ msg: '' });

        }).catch(error => {
            this.setState({ msg: 'Nessuna domanda trovata' });
            console.error('There was an error!', error);
        });
        
    }
    

    addDom = () => {

        const toSend = {
            titolo: this.state.valueAdd,
            risposta: "",
            username: "",
            password: ""
        }
        
        
        if (this.titolo != null) {
            axios.post(setting.path + "add/Faq", toSend)
            .then(res => {
                console.log("res: " + res);
                this.setState({restAdd: "Success"})
            })
            .catch(error => {
                this.setState({restAdd: "Error"})
                console.error('There was an error!', error);
            });

            this.setState({valueAdd: ""})
        }
        else {
            alert("Inserire una domanda");
        }
    }



    render() {
        return (
            <div
                style={{
                    backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                    color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv
                }}
            >
                <h1 className="title"> FaQ List</h1>
                <div>
                    <div className="serachBoxContainer">
                        <h2>
                            <input 
                                className='inputBox'
                                onChange={e => { this.setState({value: e.target.value}); this.search() } }
                                placeholder="Cerca domanda"
                            />
                            <button 
                                className = "CercaButton" 
                                onClick={this.search}
                            > 
                                CERCA
                            </button>
                            
                        </h2>
                        <div>
                            <div style={this.state.addDomIsOpen ? {visibility: 'visible'} : {visibility: 'hidden', height: 0, padding: 0, margin: 0 } }>
                                <input 
                                    className='inputBox2'
                                    onChange={e => { this.setState({valueAdd: e.target.value}); } }
                                    placeholder="Aggiungi domanda"
                                    style={this.state.addDomIsOpen ? {visibility: 'visible'} : {visibility: 'hidden', height: 0, padding: 0, margin: 0, border: 0 } }
                                />
                                <button 
                                    className = "CercaButton2" onClick={ this.changeVisibility }
                                    style={this.state.addDomIsOpen ? {visibility: 'visible', height: '31px'} : {visibility: 'hidden', height: 0, padding: 0, margin: 0 } }
                                    onClick={ () => this.addDom() }
                                > 
                                    ADD
                                </button>
                            </div>
                            <br style={this.state.addDomIsOpen ? {display: 'visible'} : {display: 'none' } }/>
                            <button 
                                className = "addAskButton" onClick={ this.changeVisibility }
                                onClick={e => { this.setState({addDomIsOpen: !this.state.addDomIsOpen}) }}
                                style={{backgroundColor: this.state.addDomIsOpen ? '#ca0a0a' : 'green' }}
                            > 
                                <div className="OpenCloseContainer" >
                                    {
                                        this.state.addDomIsOpen ? 
                                        <h1> x </h1>:
                                        <h1> + </h1>
                                    }
                                </div>
                            </button>
                            <h1 style={{height: this.state.restAdd == "" ? 0 : "30px"}}> {this.state.restAdd} </h1>

                        </div>
                    </div>
                    <div className="FacQList">
                        <div className="d-flex flex-wrap bd-highlight example-parent">
                            {this.state.arrayOfDom.map((item, key) => (
                                <ItemLineFacQ 
                                    key={key} 
                                    id={key} 
                                    title={item} 
                                    text={this.state.arrayOfRisp[key]} 
                                    colorMode={this.props.colorMode}
                                />
                            ))}
                        </div>
                        <div style={{display: 'flex'}}>
                            <h1 className="NoPageMSG"> {this.state.msg} </h1>
                        </div>
                        <div className="Pagecontainer">
                            <ul className="listPageNum">
                                { this.state.maxNumPage.map((elm, key) => 

                                    (key != this.state.page )
                                    ?
                                    <li key={key} className="pageButtonContainer"> 
                                        <Link className="pageButton" to={'/FacQ/' + elm} onClick={() => { this.reloadPg(elm) } } > 
                                            {elm}
                                        </Link> 
                                    </li>
                                    :
                                    <li key={key} className="pageButtonContainerCurrent"> {elm} </li>

                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}