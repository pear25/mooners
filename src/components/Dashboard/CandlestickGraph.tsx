import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';
import { graphDataProps } from './MainBoard';


const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export default function CandlestickGraph({ graphData }: graphDataProps) {

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
            zoom: {
                enabled: true,
            },
        },
        series: [{
            data: graphData.map(x => ({ x: new Date(x.time_period_start), y: [x.rate_open, x.rate_low, x.rate_high, x.rate_close] }))

        }],
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            decimalsInFloat: 2,
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div>
            {(typeof window !== 'undefined') &&
                <ReactApexChart
                    options={options}
                    series={options.series}
                    type="candlestick"
                    height={350}
                />}
        </div>
    );

}


