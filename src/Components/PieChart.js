import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class PieChart extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // series: [30, 10, 60],
            series: [this.props?.tokenRemaining, this.props?.tokenIssued, this.props?.tokenProcessed],
            options: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                legend: {
                    position: 'bottom',
                },
                labels: ['Tokens Remaining', 'Tokens Waiting', 'Tokens Processed'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },

        }
    }

    render() {

        return (
            <div className="donut m-4">
                <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
            </div>
        );

    }
}

export default PieChart;