const gridTopoJson = require('../assets/grid3P.json')
const citiesCsv = require('../assets/cities.csv')

const gridInfo = {
	0: {point: "1", y: "0", x: "0", lat: "-22.575508", lon: "-43.06776"},
	1: {point: "2", y: "0", x: "95", lat: "-22.575508", lon: "-42.145367"},
	2: {point: "3", y: "56", x: "95", lat: "-22.072533", lon: "-42.145367"},
	3: {point: "4", y: "56", x: "0", lat: "-22.072533", lon: "-43.06776"},
	4: {point: "central", y: "-", x: "-", lat: "-22.32425", lon: "-42.606564"}
}

const process ={ 
	cumulus : 'Cumulus Convection',
	landSurface: 'Land Surface',  
	microphysics: 'Cloud Microphysics', 
	surfaceLayer: 'Surface Layer',  
	pbl: 'Planetary Boundary Layer'
}

const event = { brush: 'Brush', lens: 'Lens' }


const zulu20110110 = {0: 'JAN 10 2011 00:00 (GMT)',
				3: 'JAN 10 2011 03:00 (GMT)',
				6: 'JAN 10 2011 06:00 (GMT)',
				9: 'JAN 10 2011 09:00 (GMT)',
				12: 'JAN 10 2011 12:00 (GMT)',
				15: 'JAN 10 2011 15:00 (GMT)',
				18: 'JAN 10 2011 18:00 (GMT)',
				21: 'JAN 10 2011 21:00 (GMT)',
				24: 'JAN 11 2011 00:00 (GMT)',
				27: 'JAN 11 2011 03:00 (GMT)',
				30: 'JAN 11 2011 06:00 (GMT)',
				33: 'JAN 11 2011 09:00 (GMT)',
				36: 'JAN 11 2011 12:00 (GMT)',
				39: 'JAN 11 2011 15:00 (GMT)',
				42: 'JAN 11 2011 18:00 (GMT)',
				45: 'JAN 11 2011 21:00 (GMT)',
				48: 'JAN 12 2011 00:00 (GMT)',
				51: 'JAN 12 2011 03:00 (GMT)',
				54: 'JAN 12 2011 06:00 (GMT)',
				57: 'JAN 12 2011 09:00 (GMT)',
				60: 'JAN 12 2011 12:00 (GMT)',
				63: 'JAN 12 2011 15:00 (GMT)',
				66: 'JAN 12 2011 18:00 (GMT)',
				69: 'JAN 12 2011 21:00 (GMT)',
				72: 'JAN 13 2011 00:00 (GMT)',

}

const zulu20200106 = {0: 'JAN 06 2020 00:00 (GMT)',
				3: 'JAN 06 2020 03:00 (GMT)',
				6: 'JAN 06 2020 06:00 (GMT)',
				9: 'JAN 06 2020 09:00 (GMT)',
				12: 'JAN 06 2020 12:00 (GMT)',
				15: 'JAN 06 2020 15:00 (GMT)',
				18: 'JAN 06 2020 18:00 (GMT)',
				21: 'JAN 06 2020 21:00 (GMT)',
				24: 'JAN 07 2020 00:00 (GMT)',
				27: 'JAN 07 2020 03:00 (GMT)',
				30: 'JAN 07 2020 06:00 (GMT)',
				33: 'JAN 07 2020 09:00 (GMT)',
				36: 'JAN 07 2020 12:00 (GMT)',
				39: 'JAN 07 2020 15:00 (GMT)',
				42: 'JAN 07 2020 18:00 (GMT)',
				45: 'JAN 07 2020 21:00 (GMT)',
				48: 'JAN 08 2020 00:00 (GMT)',
				51: 'JAN 08 2020 03:00 (GMT)',
				54: 'JAN 08 2020 06:00 (GMT)',
				57: 'JAN 08 2020 09:00 (GMT)',
				60: 'JAN 08 2020 08:00 (GMT)',
				63: 'JAN 08 2020 15:00 (GMT)',
				66: 'JAN 08 2020 18:00 (GMT)',
				69: 'JAN 08 2020 21:00 (GMT)',
				72: 'JAN 09 2020 00:00 (GMT)',

}

const zulu = zulu20110110
const nsteps = 25

// const zulu = zulu20200106
// const nsteps = 25

////////////////////////////////////////////////////////////

// MEAN
const measure = {avg : 'Arithmetic Average', qtl10 : 'Quantile 10%', qtl50 : 'Quantile 50%', qtl90 : 'Quantile 90%' }
const atmVar = {
	rain : { name: 'Rain', unit: 'mm', minMaxDomain: [0, 10] }, 
	temp : { name: 'Temperature (2m)', unit: '°C', minMaxDomain: [0, 50]},
	omega : { name: 'Upward W (500hPa)', unit: 'hPa/s', minMaxDomain: [0, 2]},
	moist : { name: 'R. Humidity (850hPa)', unit: '%', minMaxDomain: [40, 100]},
	hdiv300 : { name: 'H Div (300hPa)', unit: 'x10^-5/s', minMaxDomain: [0, 40]},
	hdiv850 : { name: 'H Conv (850hPa)', unit: 'x10^-5/s', minMaxDomain: [0, 40]},
	kIndex : { name: 'K-Index', unit: '°C', minMaxDomain: [0, 60]},
}

const atmVarProb = {
	rain : { name: 'Rain', unit: 'mm', minMaxDomain: [0, 100] }, 
	temp : { name: 'Temperature (2m)', unit: '°C', minMaxDomain: [0, 100]},
	omega : { name: 'Upward W(500hPa)', unit: 'hPa/s', minMaxDomain: [0, 100]},
	moist : { name: 'R. Humidity (850hPa)', unit: '%', minMaxDomain: [0, 100]},
	hdiv300 : { name: 'H Div (300hPa)', unit: 'x10^-5/s', minMaxDomain: [0, 100]},
	hdiv850 : { name: 'H Conv (850hPa)', unit: 'x10^-5/s', minMaxDomain: [0, 100]},
	kIndex : { name: 'K-Index', unit: '°C', minMaxDomain: [0, 100]},
}

const thresholds = {}
const thresholdsDif = {}

thresholds.rain = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100]
thresholdsDif.rain = [-100, -80, -70, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 100]
// thresholdsDif.rain = [-60, -50, -40, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50, 60]

thresholds.temp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
thresholdsDif.temp = [-30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

thresholds.moist = [5, 10, 15, 20, 2, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
thresholdsDif.moist = [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

thresholds.kIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46 ,47, 48, 49, 50]
thresholdsDif.kIndex = [-40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

thresholds.hdiv300 = [0, 5, 10, 15, 20, 25, 30, 35, 40]
thresholdsDif.hdiv300 = [0, 5, 10, 15, 20, 25, 30, 35, 40]

// thresholds.hdiv500 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 200, 300, 400, 500, 600, 700, 800]
// thresholdsDif.hdiv500 = [-800, -700, -500, -400, -300, -200, -150, -100, -50, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800]

thresholds.hdiv850 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 200, 300, 400, 500, 600, 700, 800]
thresholdsDif.hdiv850 = [-800, -700, -500, -400, -300, -200, -150, -100, -50, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800]

thresholds.omega = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.5, 2, 2.5, 3]
thresholdsDif.omega = [-3.0, -2.5, -2.0, -1.5, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3]


////////////////////////////////////////////////////////////

// PROB

const lowLimit = {}
lowLimit.rain = {}
lowLimit.rain.values = {}
lowLimit.rain.unit = 'mm'

lowLimit.rain.values['5'] = 5    // key 0 = '5'
lowLimit.rain.values['10'] = 10  // key 1 = '10'
lowLimit.rain.values['20'] = 20  // key 2 = '20'
lowLimit.rain.values['30'] = 30  // key 3 = '30'

lowLimit.temp = {}
lowLimit.temp.values = {}
lowLimit.temp.unit = '°C'

lowLimit.temp.values['10'] = 10  // key 0 = '10'
lowLimit.temp.values['15'] = 15  // key 1 = '15'
lowLimit.temp.values['20'] = 20  // key 2 = '20'
lowLimit.temp.values['25'] = 25  // key 3 = '25'
lowLimit.temp.values['30'] = 30  // key 4 = '30'
lowLimit.temp.values['35'] = 35  // key 5 = '35'

lowLimit.moist = {}
lowLimit.moist.values = {}
lowLimit.moist.unit = '%'

lowLimit.moist.values['60'] = 60  // key 0 = '10'
lowLimit.moist.values['70'] = 70  // key 1 = '15'
lowLimit.moist.values['80'] = 80  // key 2 = '20'
lowLimit.moist.values['90'] = 90

lowLimit.kIndex = {}
lowLimit.kIndex.values = {}
lowLimit.kIndex.unit = '°C'

lowLimit.kIndex.values['20'] = 20
lowLimit.kIndex.values['25'] = 25
lowLimit.kIndex.values['30'] = 30
lowLimit.kIndex.values['35'] = 35
lowLimit.kIndex.values['40'] = 40

lowLimit.hdiv300 = {}
lowLimit.hdiv300.values = {}
lowLimit.hdiv300.unit = 'x10^-5/s'

lowLimit.hdiv300.values['10'] = 10
lowLimit.hdiv300.values['20'] = 20
lowLimit.hdiv300.values['30'] = 30
lowLimit.hdiv300.values['40'] = 40
lowLimit.hdiv300.values['50'] = 50

// lowLimit.hdiv500 = {}
// lowLimit.hdiv500.values = {}
// lowLimit.hdiv500.unit = 'x10^-5/s'

// lowLimit.hdiv500.values['300'] = 300
// lowLimit.hdiv500.values['200'] = 200
// lowLimit.hdiv500.values['100'] = 100
// lowLimit.hdiv500.values['50'] = 50
// lowLimit.hdiv500.values['40'] = 40
// lowLimit.hdiv500.values['30'] = 30
// lowLimit.hdiv500.values['20'] = 20
// lowLimit.hdiv500.values['10'] = 10

lowLimit.hdiv850 = {}
lowLimit.hdiv850.values = {}
lowLimit.hdiv850.unit = 'x10^-5/s'

lowLimit.hdiv850.values['300'] = 300
lowLimit.hdiv850.values['200'] = 200
lowLimit.hdiv850.values['100'] = 100
lowLimit.hdiv850.values['50'] = 50
lowLimit.hdiv850.values['40'] = 40
lowLimit.hdiv850.values['30'] = 30
lowLimit.hdiv850.values['20'] = 20
lowLimit.hdiv850.values['10'] = 10


lowLimit.omega = {}
lowLimit.omega.values = {}
lowLimit.omega.unit = 'hPa/s'

lowLimit.omega.values['0.2'] = 0.2
lowLimit.omega.values['0.4'] = 0.4
lowLimit.omega.values['0.6'] = 0.6
lowLimit.omega.values['0.8'] = 0.8
lowLimit.omega.values['1.0'] = 1

// lowLimit.omega.values['5'] = 5
// lowLimit.omega.values['10'] = 10
// lowLimit.omega.values['15'] = 15
// lowLimit.omega.values['20'] = 20


// const thresholdsProb = [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]
// const thresholdsDifProb = [-1.0, -0.95, -0.9, -0.85, -0.8, -0.75, -0.7, -0.65, -0.6, -0.55, -0.5, -0.45, -0.4, -0.35, -0.3, -0.25, -0.2, -0.15, -0.1, -0.05, 0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0]

const thresholdsProb = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
const thresholdsDifProb = [-100, -95, -90, -85, -80, -75, -70, -65, -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 8, 85, 90, 95, 100]


module.exports = {
    gridTopoJson,
	gridInfo,
	citiesCsv,
	process,
	nsteps,
	event,
	zulu,
	measure,
	atmVar,
	atmVarProb,
	thresholds,
	thresholdsDif,
	lowLimit,
	thresholdsProb,
	thresholdsDifProb
}