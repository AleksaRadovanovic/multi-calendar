import React, { Component } from 'react'
import M from  'materialize-css';

export class ParallaxImage extends Component {

    componentDidMount() {
        let paral = document.querySelector('.parallax');
        M.Parallax.init(paral);
    }
    
    render() {
        return (
            <div className="parallax-container">
                <div  className="parallax" ><img src="http://materializecss.com/images/parallax2.jpg" alt="parallax_1" /></div>
            </div>
        )
    }
}

export default ParallaxImage
