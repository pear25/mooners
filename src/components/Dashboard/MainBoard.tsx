import BoardTiles from "./BoardTiles"
import GraphMain from "./GraphMain"
import { useState, useEffect } from "react";
import { calculatePercentageChange, periodIdToDay, subtractHours } from "@/utils/functions";
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


const options = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'MATIC', label: 'Polygon' }
]

interface IBoardProps {
    sidebarState: boolean
}

interface coinOption {
    value: string,
    label: string
}


export default function MainBoard({ sidebarState }: IBoardProps) {

    const defaultState = {
        base: 'BTC',
        quote: 'USD',
        period_id: '20MIN',
        time_start: subtractHours(new Date(), 34).toISOString().slice(0, -5),
        time_end: subtractHours(new Date(), 0).toISOString().slice(0, -5),
    }

    const [graphDetails, setGraphDetails] = useState(defaultState);
    const [coinData, setCoinData] = useState<DataPoint[]>([]);
    const [rate, setRate] = useState<number>(0);
    const [changePct, setChangePct] = useState<number>(0);

    async function changeHandler(selected: coinOption | null, type: string) {
        if (selected) {
            await setGraphDetails({ ...graphDetails, [type]: selected['value'] })
        }
    }

    const getCoinDetails = async (base: string, quote: string, period_id: string, time_start: string, time_end: string) => {
        console.log('called')

        const response = await CoinAPI.getTimeseriesData(base, quote, period_id, time_start, time_end);
        if (response && response.status !== 429) {
            const jsonData = await response.json()
            await setCoinData(jsonData);
            setRate(jsonData[99].rate_close)
            const distanceTo24Hrs = periodIdToDay(period_id)
            setChangePct(calculatePercentageChange(jsonData[99 - distanceTo24Hrs].rate_open, jsonData[99].rate_close))

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
        <div className={`flex flex-col flex-grow p-8 bg-dashboard-main pt-16 ${sidebarState ? `ml-64` : ``}`}>
            <h1 className="text-2xl font-thin pl-2" onClick={() => console.log(sidebarState)}>Coin Tracker</h1>
            <div className="w-1/4 space-x-4 p-2">
                <Select
                    className="inline-block"
                    name='base'
                    onChange={(option) => changeHandler(option, "base")}
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
                <Select
                    className="inline-block"
                    name='quote'
                    onChange={(option) => changeHandler(option, "quote")}
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

            <div className="flex flex-col lg:grid lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-4 gap-4 mt-8">
                <BoardTiles
                    boardHeader={`$${graphDetails.quote} / $${graphDetails.base}`}
                    boardValue={` ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', }).format(rate).slice(1)}`}
                />
                <BoardTiles
                    boardHeader={`Change (24h)`}
                    boardValue={`${changePct.toFixed(2)} %`}
                    textColor="gray-900"
                />
                <BoardTiles
                    boardHeader={`Coin Dominance`}
                    boardValue={`23.64%`}
                />
                <GraphMain
                    graphData={coinData}
                />
            </div>
        </div>
    )
}

