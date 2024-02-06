
class Intermediary {
    constructor() {
        const vis = this

        vis.schemesList = null
        vis.activeSchemes = null
        vis.lat = vis.getLatLon()[0]
        vis.lon = vis.getLatLon()[1]
    }

    // MEAN
    async getHmat(activeProcess, activeGlobalMeasure, activeGlobalVar, bottomLeft = null, topRight = null) {
        const vis = this
        
        const hmatPromise = await fetch('./wrf/hmat', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                bl: bottomLeft,
                tr: topRight,
                measure: activeGlobalMeasure,
                globalVar: activeGlobalVar
            })})

        const hmat = (await hmatPromise.json()).hmat

        vis.schemesList = Object.keys(hmat)
        vis.activeSchemes = [vis.schemesList[0], vis.schemesList[1]]
            
        return hmat
    }

    async getHmap(process, atmvar, measure) {
        const vis = this
        const hmapPromise = await fetch('./wrf/hmap', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: process,
                atmvar: atmvar,
                measure: measure,

            })})

        const hmap = (await hmapPromise.json()).hmap

        vis.schemesList = Object.keys(hmap.data)
        vis.activeSchemes = [vis.schemesList[0], vis.schemesList[2]]
        
        return hmap
    }

    async getLens(process, atmvar, measure) {

        const lensPromise = await fetch('./wrf/lens', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: process,
                atmvar: atmvar,
                measure: measure,

            })})

        const lens = (await lensPromise.json()).lens
        
        return lens
    }

    async getTSeries(activeProcess, activeGlobalMeasure, activeGlobalVar, bottomLeft = null, topRight = null) {

        const tSeriesPromise = await fetch('./wrf/tseries', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                measure: activeGlobalMeasure,
                globalVar: activeGlobalVar,
                bl: bottomLeft,
                tr: topRight
            })})

        const tSeries = (await tSeriesPromise.json()).tseries
            
        return tSeries
            
    }

    async getLatLon() {

        const hmapPromise = await fetch('./wrf/hmap', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: null //'surfaceLayer'
            })})

        const hmap = (await hmapPromise.json()).hmap

        return [hmap.lat, hmap.lon]
    }

    // PROB
    async getHmatProb(activeProcess, activeGlobalVar, activeGlobalLowLimit, bottomLeft = null, topRight = null) {
        const vis = this

        const hmatPromise = await fetch('./wrf/hmatProb', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                globalVar: activeGlobalVar,
                globalLimit: activeGlobalLowLimit,
                bl: bottomLeft,
                tr: topRight
            })})

        const hmat = (await hmatPromise.json()).hmat

        vis.schemesList = Object.keys(hmat)
        vis.activeSchemes = [vis.schemesList[0], vis.schemesList[1]]
        
        return hmat
    }

    async getHmapProb(activeProcess, activeGlobalVar, activeGlobalLowLimit) {
        const vis = this
        const hmapPromise = await fetch('./wrf/hmapProb', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                atmvar: activeGlobalVar,
                limit: activeGlobalLowLimit,
            })})

        const hmap = (await hmapPromise.json()).hmap

        vis.schemesList = Object.keys(hmap.data)
        vis.activeSchemes = [vis.schemesList[0], vis.schemesList[1]]
        
        return hmap
    }

    async getLensProb(activeProcess, activeGlobalVar, activeLensVar, activeGlobalLowLimit, activeLensLowLimit) {

        const lensPromise = await fetch('./wrf/lensProb', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                globalVar: activeGlobalVar,
                lensVar: activeLensVar,
                globalLimit: activeGlobalLowLimit,
                lensLimit: activeLensLowLimit,
            })})

        const lens = (await lensPromise.json()).lens
        
        return lens
    }

    async getPmf(activeProcess, activeGlobalVar, bottomLeft = null, topRight = null) {
        const pmfPromise = await fetch('./wrf/pmf', 
            {method: 'POST', 
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                param: activeProcess,
                globalVar: activeGlobalVar,
                bl: bottomLeft,
                tr: topRight
            })})

        const pmf = (await pmfPromise.json()).pmf
            
        return pmf
    }
    
}

export default new Intermediary()
