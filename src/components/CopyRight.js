import React, { Component } from 'react'
import './../css/copyRight.css'
import setting from './../setting'


export default class CopyRight extends Component {
    constructor (props) {
      super (props);

      this.state = {
        cYear: new Date().getFullYear()
      }

    };
    
    render() {
      return (
          <div 
            className="containerCopyRight"
            style={{ 
              backgroundColor: setting.colorMode ? setting.lightColor : setting.darkColor, 
              color: setting.colorMode ? setting.lightColorInv : setting.darkColorInv 
            }}
          >
            <div className="CopyRightBox">
                I contenuti presenti sul blog "deblogbrothers" dei quali è autore il proprietario del blog non possono essere copiati,riprodotti,pubblicati o redistribuiti perché appartenenti all'autore stesso. <br />
                E’ vietata la copia e la riproduzione dei contenuti in qualsiasi modo o forma. <br />
                E’ vietata la pubblicazione e la redistribuzione dei contenuti non autorizzata espressamente dall’autore. <br />
                Copyright © 2020 - {this.state.cYear} deblogbrothers by Giorgio Allena. All rights reserved <br />
            </div>
          </div>
      )
    }
}