import mockData from '@/utils/mockData';
import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';
import { graphDataProps } from './MainBoard';


const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});


export default function CandlestickGraph({ graphData }: graphDataProps) {

    console.log(graphData)

    const options: ApexCharts.ApexOptions = {
        chart: {
            selection: {
                enabled: true
            },
            type: 'candlestick',
            height: 350,
            zoom: {
                enabled: true,
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: false,
                    pan: true,
                    customIcons: [],

                },
            }
        },
        series: [{
            data: graphData.length ? graphData.map(x => ({ x: new Date(x.time_period_start), y: [x.rate_open, x.rate_low, x.rate_high, x.rate_close] })) : mockData

        }],
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            decimalsInFloat: 2,
            tooltip: {
                enabled: true,
            },
        },
        tooltip: {
            theme: 'dark'
        }
    };

    return (
        <div className='p-4'>
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


