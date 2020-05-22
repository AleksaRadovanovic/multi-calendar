
//main component for rendering timeline 
//this component consists of several subcomponents
import React, { Component } from 'react';
import  Main  from './components/Main/main.js';
import M from  'materialize-css';

export default class App extends React.Component {
    

    constructor(props) {
        super(props);  
    }
    
   
    componentDidUpdate(){
    }

    componentWillUnmount() {
    }

    render() {

        return (
           <div className="scc-container">
               <Main />
              <div style={{height: 1500}}>a</div>
            </div>
    	);
    }
}