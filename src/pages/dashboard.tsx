import Sidebar, { buttonVariants, sidebarVariants } from "@/components/Dashboard/Sidebar"
import SVG from "@/static/SVG"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MainBoard from "@/components/Dashboard/MainBoard"
import { CoinAPI } from "@/api/coinAPI"
import { subtractHours } from "@/utils/functions"
import { Line } from 'react-chartjs-2';

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

export default function Dashboard() {
    const currentDate = new Date()
    const endTime = subtractHours(currentDate, 300).toISOString().slice(0, -5);
    const startTime = subtractHours(currentDate, 299).toISOString().slice(0, -5);

    const [showSidebar, setShowSidebar] = useState(true)
    const [coinData, setCoinData] = useState<DataPoint[]>([]);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev)
    }

    const getCoinDetails = async () => {
        // const metadata = await CoinAPI.getCoinMetadata('BTC')
        // const exchangeRate = await CoinAPI.getExchangeRate('ETH', 'BTC')
        const response = await CoinAPI.getTimeseriesData('BTC', 'USD', '1HRS', startTime, endTime);
        // console.log(metadata, exchangeRate)
        if (response) {
            const jsonData = await response.json()
            setCoinData(jsonData);
        }
    }

    useEffect(() => {
        getCoinDetails();
    }, [])

    return (
        <>
            <div className="flex h-screen font-montserrat">
                <motion.div
                    onClick={toggleSidebar}
                    variants={buttonVariants}
                    className="fixed z-10 mt-4 ml-4 h-fit rounded-md bg-white"
                    animate={showSidebar ? 'open' : 'closed'}>
                    <button className="text-black p-2">{showSidebar ? SVG.Close() : SVG.Menu()}</button>
                </motion.div>
                <motion.div
                    variants={sidebarVariants}
                    transition={{ duration: 0.8 }}
                    animate={showSidebar ? 'open' : 'closed'}>
                    <Sidebar />
                </motion.div>
                <MainBoard graphData={coinData} />
            </div>
        </>
    )
};