import React, { Component } from 'react'

export class GraphSection extends Component {
    render() {
        return (
            <div className="scc-graph-section">
                <div className="center-align">
                    <h3 className="scc-graph-section-title">Who Am I?</h3>
                </div>
                <div className="scc-graph-container">
                    <div className="scc-graph-content bframe" >
                            <div className="row scc-graph-items" >
                                <div className="col s6 frame scc-graph-content-left">
                                    
                                </div>
                                <div className="col s6 bframe scc-graph-content-right">

                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphSection
