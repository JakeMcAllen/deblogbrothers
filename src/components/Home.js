import React, { Fragment } from 'react'
import './../css/Home.css'
import axios from 'axios';
import ItemLine from './items/ItemLine'
import { Link } from "react-router-dom";
import setting from './../setting'
import Counter from './Counter'


export default class Home extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            // gestioone pagina
            msg: 'Loading ...',
            initialWd: window.innerWidth,
            windowWidth: undefined,


            // preview obj
            artTitle: '',
            currentImgId: -1,
            artPreview: '',
            imgPreview:  null,
            imgDescription: '',
            imgWidht: 0,
            imgHeigth: 0,

            // past articles
            arrayOfTitle: [],
            arrayOfText: [],
            arrayOfIds: [],

        }
    }


    
    componentDidMount () {


        // get arts list
        axios.get(setting.path + 'artc/list')
        .then(res => { 

            // set the first article
            let lArt = res.data[0];
            this.setState({artTitle: lArt.titolo});
            this.setState({currentImgId: lArt.id});
            this.setState({artPreview: lArt.textContext.split(' ').slice(0,50).join(' ') });



            // set all the other articles
            for (let i = 1; i < res.data.length; i++) {

                this.state.arrayOfTitle.push ( res.data[i].titolo );
                this.state.arrayOfText.push( res.data[i].textContext.split(' ').slice(0,50).join(' ') );
                this.state.arrayOfIds.push( res.data[i].id );
                    
            }


            
            // set first article img 
            axios.get(setting.path + 'img/getCpArt/' + lArt.id)
            .then(rslt => { 
    
                this.setState({imgPreview: "data:image/png;base64," + rslt.data.img})
                this.setState({imgDescription: rslt.data.desctiption})
                this.setState({imgWidht: rslt.data.width})
                this.setState({imgHeigth:  rslt.data.heigth})
                this.setState({msg: ""});


            }).catch(error => {
                this.setState({ msg: error.message });
                console.error('There was an error!', error);
            });





        }).catch(error => {
            this.setState({ msg: error.message });
            console.error('There was an error!', error);
        });


        this.handleResize(); window.addEventListener('resize', this.handleResize);



    }


    handleResize = () => this.setState({ windowWidth: window.innerWidth });

    componentWillUnmount() { window.removeEventListener('resize', this.handleResize); }


    render() {
        return (
            <Fragment>
                <div 
                    className="PageContainer" 
                    style={{
                        backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor,
                        display: this.state.windowWidth < setting.dimHopMin ? '' : 'flex'
                    }}
                >

                    <div className="MainArticle" >
                 
                        <Counter /> 

                        <div className="imgContainer" style={{display: 'flex', marginTop: 0}}>
                            <div style={{margin: 'auto'}}>
                                <Link 
                                    className="imgContainer" 
                                    to={"/Articolo/" + this.state.currentImgId} 
                                    onClick={() => { this.setState({page: "/Articolo/" + this.state.currentImgId}); this.props.changePath("/Articolo/" + this.state.currentImgId); }}
                                >
                                    <h1 style={{"color": this.props.colorMode ? setting.whiteColorInv : setting.darkColorInv }} > 
                                        {this.state.artTitle} {this.state.msg} 
                                    </h1>
                                </Link>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <div style={{margin: 'auto'}}>

                                <div>
                                    <svg 
                                        className="svg1" height="115" width="300"
                                        style={{ position: this.props.menuOpen ? 'unset' : 'absolute' }}
                                    >
                                        <path stroke-width="5" d="M50 10  Q-30 60 50 110 L210 110, 210 10, 50 10" fill="#5375cf" stroke="#5375cf" />
                                        <circle cx="58" cy="60" r="50" stroke="#5375cf" stroke-width="5" fill="#5375cf" />
                                        <circle cx="60" cy="60" r="40" stroke="#white" stroke-width="3" fill={this.props.colorMode ? setting.lightColor : setting.darkColor} />
                                        <circle cx="207" cy="60" r="50" stroke="#5375cf" stroke-width="5" fill="#5375cf" />
                                    </svg>
                                    <svg 
                                        className="svg2" 
                                        height="105" 
                                        width="300" 
                                        style={{
                                            left: (this.state.windowWidth/ ( this.state.windowWidth < setting.dimHopMin ? 5 : 3.4 ) - 50) + 'px', 
                                            position: this.props.menuOpen ? 'unset' : 'absolute'
                                        }}
                                    >
                                        <path stroke-width="5"d="M200 5 S270 50 200 100 L5 100, 5 5, 200 5" fill="#e3a419" stroke="#e3a419" /> 
                                        <circle cx="195" cy="53" r="47" stroke="#e3a419" stroke-width="5" fill="#e3a419" />

                                    </svg>
                                </div>                                
                                <Link className="imgContainer" to={"/Articolo/" + this.state.currentImgId} onClick={() => this.setState({page: "/Articolo/" + this.state.currentImgId})}> 
                                    <img 
                                        state={{height: this.state.imgHeigth, width: this.state.imgWidht } }
                                        src={this.state.imgPreview} 
                                        border='0' 
                                        style={{ position: this.props.menuOpen ? 'unset' : 'relative'
                                    }}
                                    />
                                </Link>

                            </div>
                        </div>
                        <div className="imgContainer">
                            <p>
                                {this.state.artPreview + " "} 
                                <Link 
                                    to={"/Articolo/" + this.state.currentImgId} 
                                    style={{color: this.props.colorMode ? 'blue' : '#e3a419', fontWeight: 800}} 
                                    onClick={() => this.setState({page: '/'})}> 
                                     ... continua a leggere
                                </Link> 
                            </p>
                        </div>
                    </div>
                    
                    <div 
                        className="ListArticles"
                        style={{
                            backgroundColor: !this.props.colorMode ? "#777373" : "#82B4DE",
                            border: "5px solid " + ( !this.props.colorMode ? "gold" : "#0c0c79")
                        }}
                    >
                        
                        <h1 style={{"color": this.props.colorMode ? setting.whiteColorInv : setting.darkColorInv }}>Lista articoli: </h1>
                        <div className="artcoloBox">
                            <div className="d-flex flex-wrap bd-highlight example-parent">
                                {this.state.arrayOfTitle.map((item, key) => (
                                    <ItemLine 
                                        key={key} 
                                        id={this.state.arrayOfIds[key]} 
                                        text={this.state.arrayOfText[key]} 
                                        title={this.state.arrayOfTitle[key]}  
                                        maxNum={this.state.arrayOfTitle.length}
                                        num={key}
                                        colorMode={this.props.colorMode}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
