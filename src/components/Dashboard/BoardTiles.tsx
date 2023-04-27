interface tileProps {
    boardHeader: string,
    boardValue: string,
    textColor?: string,
}

export default function BoardTiles({
    boardHeader,
    boardValue = 'N/A',
    textColor = 'sky-400'
}: tileProps) {
    return (
        <div className="bg-dashboard-sub border-slate-800 border p-4 rounded shadow col-span-1 row-span-1 text-gray-300">
            <h2 className="text-2xl  font-semibold">{boardHeader}</h2>
            <p className={`text-${textColor} mt-2 text-xl`}>{boardValue}</p>
        </div>
    )
}