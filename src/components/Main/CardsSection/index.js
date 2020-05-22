import React, { Component } from 'react'

export class CardsSection extends Component {
    render() {
        return (
            <div className="scc-cards-section">
                <div className="center-align">
                    <h3 className="scc-cards-section-title ">Some Cards</h3>
                </div>
                <div className="scc-cards-container bframe">
                    <div className="scc-cards-content frame" >
                        <ul class="scc-cards">
                            <li class="scc-cards_item">
                                <div class="scc-card">
                                    <div class="scc-card_image"><img src="https://picsum.photos/500/300/?image=10"/></div>
                                      <div class="scc-card_content">
                                          <h2 class="scc-card_title">Card 1</h2>
                                          <p class="scc-card_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                          <button class="sc-card-btn ">Read More</button>
                                      </div>
                                </div>
                            </li>
                            <li class="scc-cards_item">
                                <div class="scc-card">
                                    <div class="scc-card_image"><img src="https://picsum.photos/500/300/?image=10"/></div>
                                      <div class="scc-card_content">
                                          <h2 class="scc-card_title">Card 2</h2>
                                          <p class="scc-card_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                          <button class="sc-card-btn ">Read More</button>
                                      </div>
                                </div>
                            </li>
                            <li class="scc-cards_item">
                                <div class="scc-card">
                                    <div class="scc-card_image"><img src="https://picsum.photos/500/300/?image=10"/></div>
                                      <div class="scc-card_content">
                                          <h2 class="scc-card_title">Card 3</h2>
                                          <p class="scc-card_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                          <button class="sc-card-btn ">Read More</button>
                                      </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardsSection;
