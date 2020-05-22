import App from './App.js';
import React, { Component } from 'react';

export default class SccMainClass{

	constructor() {
    }

    recalcPositions = (domContainer) => {
        console.log($(domContainer).find('.sidenav'));

       // $(domContainer).find('.sidenav').sidenav();
        
    }
    init() {  
        //this.generateData();
        this.initDomElem(true);
    }

    initDomElem(forceRecalc){ 
        var props = {};
        
        const domContainer = document.querySelector('#' + this.id);     
        ReactDOM.render(React.createElement(App, props), domContainer);

        if (forceRecalc)
           this.recalcPositions(domContainer);
    }
}