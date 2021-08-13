import React from 'react'

export default function NxCalDay({ onDaySelected, mark, day, visible, onWeekRowSelected}) {

    const getStyle = () => {
      if(!mark){
        return {
          backgroundColor: '#fff',
          color: '#5a6277'
        }
      }else {
        if(mark.disable){
          return {
            backgroundColor: 'pink',
            border: '1px solid #ff8d8d',
            color: '#3c3c3c'
          }
        }else {
          return {
            backgroundColor: mark.color,
            color: '#fff'
          }
        }
      }
    }
    return (
        <div className="cal-day-container" style={{visibility: visible ? 'visible' : 'hidden'}}>
          <a 
            className="cal-day-a" 
            onClick={(e) => {
              e.preventDefault();
              if(mark && mark.disable) return;

              onDaySelected(day)
            }}
            onDoubleClick={
              (e) => {
                e.preventDefault();
                if(mark && mark.disable) return;

                onWeekRowSelected(day)
              }
            }
            style={getStyle()}
            >
            {day}
          </a>
        </div>
    )
}
