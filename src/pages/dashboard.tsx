import Sidebar, { buttonVariants, sidebarVariants } from "@/components/Dashboard/Sidebar"
import SVG from "@/static/SVG"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MainBoard from "@/components/Dashboard/MainBoard"
import { CoinAPI } from "@/api/coinAPI"
import { subtractHours } from "@/utils/functions"
import { Line } from 'react-chartjs-2';


export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev)
    }

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
                <MainBoard />
            </div>
        </>
    )
};