import React from 'react'

export default function NxCalWeekDays({ labels, onWeekDaysClick }) {
    return (
        <div>
            <div className="cal-header" >
                {labels && labels.length > 0 ?
                    labels.map((label, index) => (
                        <div key={index}  className="cal-day-label-container" onClick={() => onWeekDaysClick(index)}>
                            <span className="cal-day-label" >
                                {label}
                            </span>
                        </div>
                    )) 
                    : null
                }
            </div>
        </div>
    )
}
