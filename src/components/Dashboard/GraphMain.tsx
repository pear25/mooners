import CandlestickChart from "./CandlestickGraph";
import { graphDataProps } from "./MainBoard";

export default function GraphMain({ graphData }: graphDataProps) {
    // console.log(`from client:${state}`)
    return (
        <div className="bg-dashboard-main border-slate-800 border p-4 rounded shadow col-span-3 row-span-3">
            <h2 className="text-lg font-semibold" onClick={() => console.log(graphData)}>
                <CandlestickChart graphData={graphData} />
            </h2>
            <p className="text-gray-600 mt-2"></p>
        </div>
    );
}

