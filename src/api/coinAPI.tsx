import axios from "axios"

const baseURL = 'https://rest.coinapi.io/'

const COIN_API_HEADERS = {
    'X-CoinAPI-Key': 'DCE14728-DB9F-453B-BDEE-50C330A3700D'
}

export const CoinAPI = {
    getCoinMetadata: async (size: string) => {
        const routeURL = `v1/assets/icons/${size}`
        try {
            const response = await axios.get(`${baseURL}${routeURL}`, { headers: COIN_API_HEADERS })
            return response
        }
        catch (err) {
            console.log(err)
        }
    },
    getExchangeRate: async (protocol1: string, protocol2: string) => {
        const routeURL = `v1/exchangerate/${protocol1}/${protocol2}`
        try {
            const response = await axios.get(`${baseURL}${routeURL}`, { headers: COIN_API_HEADERS })
            return response
        }
        catch (err) {
            console.log(err)
        }
    },
    getTimeseriesData: async (base: string, quote: string, timePeriod: string, startPeriod: string, endPeriod: string) => {
        const routeURL = `v1/exchangerate/${base}/${quote}/history?period_id=${timePeriod}&time_start=${startPeriod}&time_end=${endPeriod}`
        try {
            const response = await fetch(`${baseURL}${routeURL}`, { headers: COIN_API_HEADERS })
            return response
        }
        catch (err) {
            console.log(err)
        }
    }
}

