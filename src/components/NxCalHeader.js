
import React, { Component } from 'react'

export default class NxCalHeader extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    generateMonthLabels = () => {
        let { cols, showMonths, startMonthNum, year } = this.props;
        let months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        let monthsJSX = [];

        for (let i = startMonthNum; i < startMonthNum + cols; i++)
            monthsJSX.push(
                <div className="cal-month-label" key={i}>
                    <div >
                        {( i - startMonthNum) % 12 < showMonths ? months[i % 12] : ''} 
                        <span>
                            { i > 11 ? parseInt(year) + 1 : year}
                        </span>
                    </div>
                </div>
            )

        return monthsJSX;
    }

    render() {
        let { number, color, cols, showMonths } = this.props;
        return (
            (number * cols) < showMonths ?
                <div className="cal-row-header" style={{position: 'relative',width: '100%', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {number === 0 && (
                            <div style={{position: 'absolute', left: 10, top: 2}}>
                                <a style={{ cursor: 'pointer'}} onClick={this.props.decreaseMonths}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none" /><path fill={color} d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                                </a>
                            </div>
                    )}
                    {number === 0 &&  (
                            <div style={{position: 'absolute', right: 10, top: 2}}>
                                <a style={{ cursor: 'pointer'}} onClick={this.props.increaseMonths}>
                                    <svg xmlns="http://www.w3.org/2000/svg"width="30" viewBox="0 0 24 24" ><path d="M0 0h24v24H0z" fill="none"/><path fill={color} d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>       
                                </a>
                            </div>
                    )}
                    
                    {this.generateMonthLabels()}
                </div>
            : null
        )
    }
}

