import BoardTiles from "./BoardTiles"
import GraphMain from "./GraphMain"


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

export default function MainBoard({ graphData }: graphDataProps) {

    return (
        <div className={`flex flex-col flex-grow p-8 bg-dashboard-main ml-64`}>
            <h1 className="text-2xl font-thin">Your dashboard</h1>
            <div className="flex flex-col lg:grid lg:grid-flow-col lg:grid-rows-3 lg:grid-cols-4 gap-4 mt-8">
                <BoardTiles boardHeader={`Total Value Locked`} boardValue={`$48.23bn`} />
                <BoardTiles boardHeader={`Change (24h)`} boardValue={`-1.14%`} textColor="gray-900" />
                <BoardTiles boardHeader={`Coin Dominance`} boardValue={`23.64%`} />
                <GraphMain graphData={graphData} />

            </div>
        </div>
    )
}

