import React, { Component } from 'react'
import  Header  from '../Header';
import ImageSection from './ImageSection/';
import GraphSection from './GraphSection/';
import CardsSection from './CardsSection/';

export class Main extends Component {

    componentDidMount() {
      
    }

    render() {
        return (
            <div>
                <Header />
                <ImageSection />
                <GraphSection />
                <CardsSection />
                
            </div>
        )
    }
}

export default Main;
