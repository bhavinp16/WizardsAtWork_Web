import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'

function PieChart({ tokenRemaining, tokenWaiting, tokenProcessed }) {

    const [settings, setSettings] = useState(
        {

            // series: [30, 10, 60],
            series: [tokenRemaining, tokenWaiting, tokenProcessed],
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
    );

    return (
        <div className="donut m-4 border border-1 border-grey rounded-3 shadow p-4">
            <Chart options={settings.options} series={settings.series} type="donut" width="380" />
        </div>
    );
}

export default PieChart;
