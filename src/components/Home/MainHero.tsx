import Image from "next/image"
import HeroImage from "../../../public/hook.png";
import axios from "axios";

export default function MainHero() {

    const testApi = async () => {
        const response = await axios.get('http://localhost:3000/api/hello');
        console.log(response);
    }


    return (
        <div id="main-hero-wrapper" className="p-2">
            <div className="flex flex-col md:flex-row md:mt-0 mt-12 justify-between h-[50svh] items-center mx-[3vw] md:mx-[10vw]">
                <div className="space-y-4">
                    <div id="hero-header" className="font-bold text-3xl">Simple and easy to use crypto tracker.</div>
                    <div id="hero-header" className="font-thin text-xl">Track your every earning with a reliable app.</div>
                    <div id="CTA" className="pt-8 space-x-4">
                        <button onClick={testApi} className="rounded-md bg-blue-400 px-4 py-2 font-semibold">Sign Up</button>
                        <button className="rounded-md bg-blue-400 px-4 py-2 font-semibold">Login</button>
                    </div>
                </div>

                <div className="hidden md:block">
                    <Image src={HeroImage} alt="Hero Image" height={500} width={500} />
                </div>
            </div>
        </div>
    )
}