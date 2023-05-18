export function subtractHours(date: Date, hours: number) {
    date.setHours(date.getHours() - hours);
    return date;
}

interface IPeriodId {
    [key: string]: number
}

export function periodIdToDay(period_id: string) {


    const stringToSeconds = {
        '1SEC': 1, '2SEC': 2, '3SEC': 3, '4SEC': 4, '5SEC': 5, '6SEC': 6, '10SEC': 10, '15SEC': 15, '20SEC': 20, '30SEC': 30, '1MIN': 60, '2MIN': 120, '3MIN': 180, '4MIN': 240, '5MIN': 300, '6MIN': 360, '10MIN': 600, '15MIN': 900, '20MIN': 1200, '30MIN': 1800
    }

    const secondsInDay = 24 * 3600

    return secondsInDay / stringToSeconds[period_id as keyof typeof stringToSeconds]

}

export function calculatePercentageChange(startValue: number, endValue: number) {

    const percentageChange = (endValue - startValue) / startValue * 100
    return percentageChange
}