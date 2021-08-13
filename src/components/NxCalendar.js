import React, { Component } from 'react'



export default class NxCalendar extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    generateMonthDaysCopy(){
        let daysNum = 31;
        let monthDaysJSX = [];

        for (let i = 1; i <= daysNum; i+=7) {
            monthDaysJSX.push(
                <div className="cal-week-row">
                    {this.generateWeekCopy(i, daysNum)}
                </div>
            );
        }

        return monthDaysJSX;
    }
    
    generateWeekCopy(startDay, daysNum){
        let weekJSX = [];

        for (let i = startDay; i < startDay + 7; i++) {

            if(i <= daysNum)
            weekJSX.push( 
                <NxCalDay isMarkedDay={this.isMarkedDay(i)} onDaySelected={this.onDaySelected} day={i} visible/>
            );
            else
            weekJSX.push( 
                <NxCalDay isMarkedDay={this.isMarkedDay('')} onDaySelected={this.onDaySelected} day={i} />
            );
        }

        return weekJSX;
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

