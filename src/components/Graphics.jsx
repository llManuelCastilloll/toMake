import React from 'react';
import { Chart } from './Chart';

import '../assets/styles/components/Graphics.scss'

export class Graphics extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <section className="graphic">
                <span className="graph_title titles">Mi productividad.</span>
                <div className="graph">
                    <Chart />
                </div>
            </section>
        );
    }
};