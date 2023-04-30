import BoardTiles from "./BoardTiles"
import GraphMain from "./GraphMain"
import { useState, useEffect } from "react";
import { subtractHours } from "@/utils/functions";
import { CoinAPI } from "@/api/coinAPI";
import Select from "react-select";


export interface DataPoint {
    rate_close: number,
    rate_high: number,
    rate_low: number,
    rate_open: number,
    time_close: string,
    time_open: string,
    time_period_end: string,
    time_period_start: string,
}

export interface graphDataProps {
    graphData: DataPoint[]
}

type coinOption = {
    value: string,
    label: string
}

const options = [
    { value: 'Bitcoin', label: 'BTC' },
    { value: 'Ethereum', label: 'ETH' },
    { value: 'Polygon', label: 'MATIC' }
]


export default function MainBoard() {

    const defaultState = {
        base: 'BTC',
        quote: 'USD',
        period_id: '1MIN',
        time_start: subtractHours(new Date(), 2).toISOString().slice(0, -5),
        time_end: subtractHours(new Date(), 0).toISOString().slice(0, -5),
    }
    const [graphDetails, setGraphDetails] = useState(defaultState);
    const [coinData, setCoinData] = useState<DataPoint[]>([]);
    const [rate, setRate] = useState<number>(0);

    async function changeHandler(selected: coinOption | null) {
        console.log('change')
        if (selected) {
            console.log(selected)
            console.log('in')
            await setGraphDetails(
                { ...graphDetails, base: selected['label'] }
            )
            console.log(graphDetails)
        }
    }

    const getCoinDetails = async (base: string, quote: string, period_id: string, time_start: string, time_end: string) => {
        console.log('called')
        // const metadata = await CoinAPI.getCoinMetadata('BTC')
        const exchangeRate = await CoinAPI.getExchangeRate(base, quote)
        if (exchangeRate) {
            const rateData = await exchangeRate.json()
            console.log(rateData)
            await setRate(rateData.rate);
            if (!rateData.rate) {
                setRate(0)
            }
        }
        const response = await CoinAPI.getTimeseriesData(base, quote, period_id, time_start, time_end);
        if (response) {
            const jsonData = await response.json()
            await setCoinData(jsonData);

            if (!jsonData.length) {
                setCoinData([])
                console.log(coinData.length)
            }
        }
    }

    useEffect(() => {
        getCoinDetails(graphDetails.base, graphDetails.quote, graphDetails.period_id, graphDetails.time_start, graphDetails.time_end);
    }, [graphDetails])

    return (
        <div className={`flex flex-col flex-grow p-8 bg-dashboard-main ml-64`}>
            <h1 className="text-2xl font-thin">Your dashboard</h1>
            <div className="w-1/4 space-y-4">
                <div>
                    <Select
                        name='base'
                        onChange={changeHandler}
                        options={options}
                        placeholder={graphDetails.base}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                neutral0: '#202020',
                                neutral50: '#ffffff',  // Placeholder color
                            },
                        })}
                    />
                </div>
                <div>
                    <Select
                        name='quote'
                        onChange={changeHandler}
                        options={options}
                        placeholder={graphDetails.quote}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                neutral0: '#202020',
                                neutral50: '#ffffff',  // Placeholder color
                            },
                        })}
                    />
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-4 gap-4 mt-8">
                <BoardTiles boardHeader={`${graphDetails.quote} / $${graphDetails.base}`}
                    boardValue={` ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(rate)}`} />
                <BoardTiles boardHeader={`Change (24h)`} boardValue={`-1.14%`} textColor="gray-900" />
                <BoardTiles boardHeader={`Coin Dominance`} boardValue={`23.64%`} />
                <GraphMain graphData={coinData} />

            </div>
        </div>
    )
}

