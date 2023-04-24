import Navbar from "@/components/Home/Navbar";
import MainHero from "@/components/Home/MainHero";
import Footer from "@/components/Home/Footer";

export default function Home() {

    return (
        <>
            <div className="flex-row">
                <Navbar />
                <MainHero />
                <Footer />
            </div>
        </>
    )
}