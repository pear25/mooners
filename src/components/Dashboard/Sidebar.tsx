export default function Sidebar() {
    return (
        <div
            className="fixed flex flex-col w-64 bg-white border-r h-screen">
            <div className="flex items-center justify-center h-16 border-b">
                {/* <div className="text-black px-4">
                        <button onClick={toggleSidebar}>{SVG.Close()}</button>
                    </div> */}
                <div className="text-lg text-black font-semibold">Hello, Mooner!</div>
            </div>
            <nav className="flex flex-col flex-grow p-4">
                <a href="/home" className="my-2 text-gray-600 hover:text-gray-800">
                    Home
                </a>
                <a href="#" className="my-2 text-gray-600 hover:text-gray-800">
                    Dashboard
                </a>
                <a href="#" className="my-2 text-gray-600 hover:text-gray-800">
                    Settings
                </a>
                <a href="#" className="my-2 text-gray-600 hover:text-gray-800">
                    Logout
                </a>
            </nav>
        </div>
    )
};

export const sidebarVariants = {
    open: {
        x: '0',
        opacity: 1
    },
    closed: {
        x: '-100%',
        opacity: 0
    }
}

export const buttonVariants = {
    open: {
        scale: [1, 1.7, 1.8, 1, 1],
        rotate: [0, 360],
        borderRadius: ["20%", "20%", "50%", "50%", "50%"]
    },
    closed: {
        scale: [1, 1, 2, 2, 1],
        rotate: [360, 0],
        borderRadius: ["50%", "20%", "50%", "50%", "15%"]
    }
}
