import React, { Component } from 'react'
import M from  'materialize-css/dist/js/materialize.min.js';

export class Header extends Component {

    componentDidMount() {
        let sidenav = document.querySelector('#mobile-menu');
        M.Sidenav.init(sidenav, {});
    }

    render() {
        return (
            <header>
                <nav className="nav-wrapper white">
                    <div className="container">
                        {/*<a href="" className="sidenav-trigger" data-target="mobile-menu" >
                            <i className="material-icons blue-text" style={{display: 'inline-block'}} >menu</i>
                        </a> */
                        }
                        <a href="" className="brand-logo blue-text">
                            Scc
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li> <a className="black-text" href=""> Home </a></li>
                            <li> <a className="black-text" href=""> About </a></li>
                            <li> <a className="black-text" href=""> Contact </a></li>
                        </ul>
                        
                    </div>
                </nav>
                {/* <ul class="sidenav" id="mobile-menu">
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                </ul>*/}
               
            </header>
        )
    }
}

export default Header;
