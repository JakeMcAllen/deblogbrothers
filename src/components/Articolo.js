import React, { Component } from 'react'
import axios from 'axios';
import './../css/Articolo.css'
import Chat from './Chat'
import cookie from 'react-cookies'
import setting from './../setting'
import ItemImgDisp from './items/ItemImgDisp'
import moment from 'moment';
import { Link } from "react-router-dom";


export default class articolo extends Component {
    constructor (props) {
        super (props);

        let idNbr = window.location.pathname.split("/")[2]
        let lkd = cookie.load('likedArt' + idNbr );
        let idU = cookie.load('idUser')

        this.state = {
            id:  parseInt( idNbr ),
            title: '',
            artcl: '',
            likes: 0,
            pubblicationDate: "",

            img: '',
            descrizione: '',
            width: 0,
            height: 0,

            msg: '',
            wdth: 0,
            hgth: 0,
            chatVisible: false,
            pFormat: 1,

            imgList: [],
            idList: 0,

            liked: lkd,
            idUsr: idU,

            // tags of article
            tags: [],
            tagsListSize: 0,
        }

        this.props.changePath("/Articolo/" + this.idNbr)
    }


    updateDimensions = () => { this.setState({ wdth: window.innerWidth }); this.setState({ hgth: window.innerHeight }); };
    changeVisibility = () => { this.setState({chatVisible: !this.state.chatVisible}); }


    componentDidMount () {
        this.setState({id: parseInt( window.location.pathname.split("/")[2] ) })
        var id = window.location.pathname.split("/")[2];

        // get first text
        axios.get(setting.path + 'artc/getArt/' + id)
        .then(res => { 
            var dtStr = res.data.pubblication_art.split("-");
            var mth = moment().month( Number( dtStr[1] ) - 1 ).format("MMMM");

            this.setState({pFormat: res.data.layout})
            this.setState({title: res.data.titolo});
            this.setState({artcl: res.data.textContext});
            this.setState({likes: res.data.like});
            this.setState({pubblicationDate: " " + dtStr[0] + " " + mth + " " + dtStr[2] + " by "});
        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });


        // get first img 
        axios.get(setting.path + 'img/getCpArt/' + id)
        .then(res => {
            this.setState({img: "data:image/png;base64," + res.data.img})
            this.setState({descrizione: res.data.desctiption})

            var moltp = 2/3;
            if (res.data.length > ( window.innerHeight * (2/3) ) ) moltp = (1/3)
            
            this.setState({height: res.data.length * moltp + "px" });

            if (window.innerWidth < res.data.width) { 
                this.setState({width: ( window.innerWidth * (2/3) ) + "px"});
                this.setState({height: "40%"})
            }
            else this.setState({width: res.data.width * moltp + "px"});
            
        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });




        // get secondary imgs ids ( getScArt )
        axios.get(setting.path + 'img/getScArt/' + id)
        .then(res => {

            for (let i = 0; i < res.data.length; i++)
                this.state.imgList.push(res.data[i])

        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });




        // get tags art
        axios.get(setting.path + 'artc/tagsArtid/' + id)
        .then(res => {

            for (let i = 0; i < res.data.length; i++) 
                this.state.tags.push( res.data[i] )

            this.setState({tagsListSize: res.data.length});

        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });




        // set event Listeners
        window.addEventListener('resize', this.updateDimensions);
        this.setState({ wdth: window.innerWidth });


        window.addEventListener('resize', this.updateDimensions);
        this.setState({ wdth: window.innerWidth });

    }


    PutLike = () => {

        let lk = cookie.load('likedArt' + this.state.id );

        /*

            no logged
        if ( this.state.idUsr == "" || this.state.idUsr == undefined ) console.log("Not logged")
        else {
        */
            if ( (this.state.liked != "" || this.state.liked == undefined && this.state.liked != "0" ) && lk != 1) {

                axios.get(setting.path + 'artc/addLike/' + this.state.id)
                .then(res => {

                    var nDate = new Date();
                    nDate.setDate(nDate.getDate() + 5);
                    cookie.save('likedArt' + this.state.id, "1", { path: '/', expires: nDate });


                    // get number of likes 
                    axios.get(setting.path + 'artc/getLike/' + this.state.id)
                    .then(res => { this.setState({likes: res.data})
                    }).catch(error => {
                        this.setState({ msg: error.message });
                        console.error('There was an error !', error);
                    });

                    // update cokie
                    var nDate = new Date();
                    nDate.setDate(nDate.getDate() + 1);

                    cookie.save('usernameUser', res.data.username, { path: '/', expires: nDate });

                }).catch(error => {
                    console.error('There was an error!', error);
                });


            } else {
                // TODOOOO
                console.log("Gestire caso di errore")
                
            }

        // }

    }



    render() {
        return (
            <div style={{backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor }}>

                <div className="TagsContainer" >
                    {
                        this.state.tags.map( (e, key) => 
                            <div className="tagCont">
                                
                                <p className="tag"> {e} </p>

                                { key != (this.state.tagsListSize-1) ? <p className="tagSep"> - </p> : null }

                            </div>
                        )
                    }
                </div>


                <div 
                    className="artCont"
                    style={{ padding: this.state.wdth < 1000 ? ( this.state.wdth < 700 ? '0 0' : '1% 5%') : '2% 7%'}}
                >
                    <p className="cnclObj"> . </p>
                    <h1 style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }} > {this.state.title} </h1>
                    <div 
                        className="postedDateBox"
                        style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv}}
                    >
                        <img 
                            src="https://img.icons8.com/material-rounded/24/000000/clock.png"
                            style={{filter: this.props.colorMode ? 'invert(0%)' : 'invert(100%)' }}
                        />
                        <p> 
                            Posted on 
                            {this.state.pubblicationDate}
                            <Link 
                                to={'/'} 
                                onClick={() => { this.setState({menuIsOpen: false}); this.setState({page: '/Registrazione'}); this.props.changePath("/"); } } 
                                style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv, fontWeight: 'bold' }}
                            > 
                                deblogbrothers 
                            </Link>
                        </p>
                    </div>
                    

                    <div>
                        {
                            this.state.pFormat == 1 ? 
                            <img 
                                src={this.state.img}  
                                className="imgArt" 
                                style={{maxHeight: this.state.height, maxWidth: this.state.width, marginTop: '2%'}} 
                                border='0' 
                            /> : 
                            null
                        }
                    </div>

                    <div 
                        className="divArtText" 
                        style={ (this.state.wdth < 800) ? {fontSize: 'unset'} : {fontSize: 'x-large'} }
                    > 
                        { this.state.artcl } 
                    </div>

                    {
                        (this.state.pFormat == 2) ? 
                        <img 
                            src={this.state.img} 
                            style={{maxHeight: this.state.height, maxWidth: this.state.width}} 
                            border='0' 
                        /> : 
                        null
                    }
                </div>

                <div className="imgContainer">
                    <section className="photoContainer">

                        {
                            this.state.imgList.map( (e, key) =>
                                <ItemImgDisp key={key} imgId={e} />
                            )
                        }

                    </section>
                </div>


                <div className="artFooter" >
                    <button 
                        className="likes" 
                        onClick={ () => this.PutLike()}
                        style={{backgroundColor: this.props.colorMode ? "#5375CF" : "#e3a419"}}
                    > 
                        <img src="https://img.icons8.com/fluent-systems-filled/48/ffffff/pixel-heart.png" /> 
                        {this.state.likes}
                    </button>
                </div>
                <div className="CommentSpace">

                    <div className="p-2 bd-highlight col-example" style={this.state.chatVisible ? {height: '100%'} : {height: '80px', overflow: 'hidden'}}>
                        <div style={{display: 'flex'}}> 
                            <div className="TitleContainerChat">
                                <h1 className="currentTitle" style={{color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv }}> Chat </h1> 
                                <button className="ItemButtonFQ" onClick={ this.changeVisibility }> 
                                    {this.state.chatVisible ? '/\\' : 'V'} 
                                </button> 
                            </div>
                        </div>
                        <hr />
                        <div className = "divChat" style={this.state.chatVisible ? {visibility: 'visible'} : {visibility: 'hidden'}}> 
                            <Chat id={this.state.id} colorMode={this.props.colorMode}/>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

}
