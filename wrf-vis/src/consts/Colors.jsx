// const { scaleLinear, interpolatePlasma, interpolateYlOrBr, interpolatePuOr, interpolateReds } = require('d3')
const { scaleLinear, interpolateBlues, interpolateBrBG, quantile, ascending} = require('d3')

const m = [6, 3, 7, 2, 8, 9, 4, 0, 1, 5]
// const m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(quantile(m, 0.5))
console.log(m.sort(ascending))

// SATISTICS

const colors = {}
colors.rain = {}
colors.temp = {}
colors.omega = {}
colors.moist = {}
colors.hdiv300 = {}
// colors.hdiv500 = {}
colors.hdiv850 = {}
colors.kIndex = {}

const colorsDif = {}
colorsDif.rain = null
colorsDif.temp = null
colorsDif.omega = null
colorsDif.moist = null
colorsDif.hdiv300 = null
// colorsDif.hdiv500 = null
colorsDif.hdiv850 = null
colorsDif.kIndex = null

const offset = {}
offset.rain = {}
offset.temp = {}
offset.omega = {}
offset.moist = {}
offset.hdiv300 = {}
// offset.hdiv500 = {}
offset.hdiv850 = {}
offset.kIndex = {}

const offsetDif = {}
offsetDif.rain = null
offsetDif.temp = null
offsetDif.omega = null
offsetDif.moist = null
offsetDif.hdiv300 = null
// offsetDif.hdiv500 = null
offsetDif.hdiv850 = null
offsetDif.kIndex = null

//// RAIN

const rainColorA = ['#ffffd9', '#e2f4ce', '#c6e8c2', '#a9ddb7', '#7ec6ba', '#53aebc', '#2897bf', '#2079a5', '#185a8c', '#103c72', '#081d58']
const rainColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
const rainColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

colors.rain['A'] = scaleLinear().range(rainColorA)
colors.rain['B'] = scaleLinear().range(rainColorB)
colorsDif.rain  = scaleLinear().range(rainColorDif)

offset.rain['A']= [
	{offset: "0%", color: rainColorA[0]},
	{offset: "10%", color: rainColorA[1]},
	{offset: "20%", color: rainColorA[2]},
	{offset: "30%", color: rainColorA[3]},
	{offset: "40%", color: rainColorA[4]},
	{offset: "50%", color: rainColorA[5]},
	{offset: "60%", color: rainColorA[6]},
	{offset: "70%", color: rainColorA[7]},
	{offset: "80%", color: rainColorA[8]},
	{offset: "90%", color: rainColorA[9]},
	{offset: "100%", color: rainColorA[10]}
]

offset.rain['B'] = [
	{offset: "0%", color: rainColorB[0]},
	{offset: "10%", color: rainColorB[1]},
	{offset: "20%", color: rainColorB[2]},
	{offset: "30%", color: rainColorB[3]},
	{offset: "40%", color: rainColorB[4]},
	{offset: "50%", color: rainColorB[5]},
	{offset: "60%", color: rainColorB[6]},
	{offset: "70%", color: rainColorB[7]},
	{offset: "80%", color: rainColorB[8]},
	{offset: "90%", color: rainColorB[9]},
	{offset: "100%", color: rainColorB[10]}
]

offsetDif.rain = [
	{offset: "0%",   color: rainColorDif[0]},
	{offset: "10%",  color: rainColorDif[1]},
	{offset: "20%",  color: rainColorDif[2]},
	{offset: "30%",  color: rainColorDif[3]},
	{offset: "40%",  color: rainColorDif[4]},
	{offset: "50%",  color: rainColorDif[5]},
	{offset: "60%",  color: rainColorDif[6]},
	{offset: "70%",  color: rainColorDif[7]},
	{offset: "80%",  color: rainColorDif[8]},
	{offset: "90%",  color: rainColorDif[9]},
	{offset: "100%", color: rainColorDif[10]}
]

//// TEMPERATURE

const tempColorA = ['#ffffe5', '#fff8c4', '#feeaa1', '#fed676', '#feba4a', '#fb992c', '#ee7918', '#d85b0a', '#b74304', '#8f3204', '#662506']//.reverse()
// const tempColorB = ['#0d0887', '#360497', '#6a00a8', '#a513af', '#b12a90', '#c94779', '#e16462', '#ee7b4d', '#fca636', '#fbd22b', '#f0f921']
const tempColorB = ['#a50026', '#d4322c', '#f16e43', '#fcac64', '#fedd90', '#faf8c1', '#dcf1ec', '#abd6e8', '#75abd0', '#4a74b4', '#313695'].reverse()
const tempColorDif = ['#7f3b08', '#9f6433', '#be8c5e', '#deb588', '#fdddb3', '#f3eeea', '#d7d7e9', '#ada1c2', '#826c9a', '#583673', '#2d004b']

colors.temp['A'] = scaleLinear().range(tempColorA)
colors.temp['B'] = scaleLinear().range(tempColorB)
colorsDif.temp  = scaleLinear().range(tempColorDif)

offset.temp['A']= [
	{offset: "0%", color: tempColorA[0]},
	{offset: "10%", color: tempColorA[1]},
	{offset: "20%", color: tempColorA[2]},
	{offset: "30%", color: tempColorA[3]},
	{offset: "40%", color: tempColorA[4]},
	{offset: "50%", color: tempColorA[5]},
	{offset: "60%", color: tempColorA[6]},
	{offset: "70%", color: tempColorA[7]},
	{offset: "80%", color: tempColorA[8]},
	{offset: "90%", color: tempColorA[9]},
	{offset: "100%", color: tempColorA[10]}
]

offset.temp['B'] = [
	{offset: "0%", color: tempColorB[0]},
	{offset: "10%", color: tempColorB[1]},
	{offset: "20%", color: tempColorB[2]},
	{offset: "30%", color: tempColorB[3]},
	{offset: "40%", color: tempColorB[4]},
	{offset: "50%", color: tempColorB[5]},
	{offset: "60%", color: tempColorB[6]},
	{offset: "70%", color: tempColorB[7]},
	{offset: "80%", color: tempColorB[8]},
	{offset: "90%", color: tempColorB[9]},
	{offset: "100%", color: tempColorB[10]}
]

offsetDif.temp = [
	{offset: "0%",   color: tempColorDif[0]},
	{offset: "10%",  color: tempColorDif[1]},
	{offset: "20%",  color: tempColorDif[2]},
	{offset: "30%",  color: tempColorDif[3]},
	{offset: "40%",  color: tempColorDif[4]},
	{offset: "50%",  color: tempColorDif[5]},
	{offset: "60%",  color: tempColorDif[6]},
	{offset: "70%",  color: tempColorDif[7]},
	{offset: "80%",  color: tempColorDif[8]},
	{offset: "90%",  color: tempColorDif[9]},
	{offset: "100%", color: tempColorDif[10]}
]

//// OMEGA

const omegaColorA = ['#f7fbff', '#e3eef9', '#cfe1f2', '#b5d4e9', '#93c3df', '#6daed5', '#4b97c9', '#2f7ebc', '#1864aa', '#0a4a90', '#08306b']//.reverse()
const omegaColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
const omegaColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

colors.omega['A'] = scaleLinear().range(omegaColorA)
colors.omega['B'] = scaleLinear().range(omegaColorB)
colorsDif.omega  = scaleLinear().range(omegaColorDif)

offset.omega['A']= [
	{offset: "0%", color: omegaColorA[0]},
	{offset: "10%", color: omegaColorA[1]},
	{offset: "20%", color: omegaColorA[2]},
	{offset: "30%", color: omegaColorA[3]},
	{offset: "40%", color: omegaColorA[4]},
	{offset: "50%", color: omegaColorA[5]},
	{offset: "60%", color: omegaColorA[6]},
	{offset: "70%", color: omegaColorA[7]},
	{offset: "80%", color: omegaColorA[8]},
	{offset: "90%", color: omegaColorA[9]},
	{offset: "100%", color: omegaColorA[10]}
]

offset.omega['B'] = [
	{offset: "0%", color: omegaColorB[0]},
	{offset: "10%", color: omegaColorB[1]},
	{offset: "20%", color: omegaColorB[2]},
	{offset: "30%", color: omegaColorB[3]},
	{offset: "40%", color: omegaColorB[4]},
	{offset: "50%", color: omegaColorB[5]},
	{offset: "60%", color: omegaColorB[6]},
	{offset: "70%", color: omegaColorB[7]},
	{offset: "80%", color: omegaColorB[8]},
	{offset: "90%", color: omegaColorB[9]},
	{offset: "100%", color: omegaColorB[10]}
]

offsetDif.omega = [
	{offset: "0%",   color: omegaColorDif[0]},
	{offset: "10%",  color: omegaColorDif[1]},
	{offset: "20%",  color: omegaColorDif[2]},
	{offset: "30%",  color: omegaColorDif[3]},
	{offset: "40%",  color: omegaColorDif[4]},
	{offset: "50%",  color: omegaColorDif[5]},
	{offset: "60%",  color: omegaColorDif[6]},
	{offset: "70%",  color: omegaColorDif[7]},
	{offset: "80%",  color: omegaColorDif[8]},
	{offset: "90%",  color: omegaColorDif[9]},
	{offset: "100%", color: omegaColorDif[10]}
]

//// MOISTURE

const moistColorA = ['#ffffd9', '#e2f4ce', '#c6e8c2', '#a9ddb7', '#7ec6ba', '#53aebc', '#2897bf', '#2079a5', '#185a8c', '#103c72', '#081d58']
const moistColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
const moistColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

colors.moist['A'] = scaleLinear().range(moistColorA)
colors.moist['B'] = scaleLinear().range(moistColorB)
colorsDif.moist  = scaleLinear().range(moistColorDif)

offset.moist['A']= [
	{offset: "0%", color: moistColorA[0]},
	{offset: "10%", color: moistColorA[1]},
	{offset: "20%", color: moistColorA[2]},
	{offset: "30%", color: moistColorA[3]},
	{offset: "40%", color: moistColorA[4]},
	{offset: "50%", color: moistColorA[5]},
	{offset: "60%", color: moistColorA[6]},
	{offset: "70%", color: moistColorA[7]},
	{offset: "80%", color: moistColorA[8]},
	{offset: "90%", color: moistColorA[9]},
	{offset: "100%", color: moistColorA[10]}
]

offset.moist['B'] = [
	{offset: "0%", color: moistColorB[0]},
	{offset: "10%", color: moistColorB[1]},
	{offset: "20%", color: moistColorB[2]},
	{offset: "30%", color: moistColorB[3]},
	{offset: "40%", color: moistColorB[4]},
	{offset: "50%", color: moistColorB[5]},
	{offset: "60%", color: moistColorB[6]},
	{offset: "70%", color: moistColorB[7]},
	{offset: "80%", color: moistColorB[8]},
	{offset: "90%", color: moistColorB[9]},
	{offset: "100%", color: moistColorB[10]}
]

offsetDif.moist = [
	{offset: "0%",   color: moistColorDif[0]},
	{offset: "10%",  color: moistColorDif[1]},
	{offset: "20%",  color: moistColorDif[2]},
	{offset: "30%",  color: moistColorDif[3]},
	{offset: "40%",  color: moistColorDif[4]},
	{offset: "50%",  color: moistColorDif[5]},
	{offset: "60%",  color: moistColorDif[6]},
	{offset: "70%",  color: moistColorDif[7]},
	{offset: "80%",  color: moistColorDif[8]},
	{offset: "90%",  color: moistColorDif[9]},
	{offset: "100%", color: moistColorDif[10]}
]

//// Hdiv 300
const hdiv300ColorA = ['#f7fbff', '#e3eef9', '#cfe1f2', '#b5d4e9', '#93c3df', '#6daed5', '#4b97c9', '#2f7ebc', '#1864aa', '#0a4a90', '#08306b']
const hdiv300ColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
const hdiv300ColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

colors.hdiv300['A'] = scaleLinear().range(hdiv300ColorA)
colors.hdiv300['B'] = scaleLinear().range(hdiv300ColorB)
colorsDif.hdiv300  = scaleLinear().range(hdiv300ColorDif)

offset.hdiv300['A']= [
	{offset: "0%", color: hdiv300ColorA[0]},
	{offset: "10%", color: hdiv300ColorA[1]},
	{offset: "20%", color: hdiv300ColorA[2]},
	{offset: "30%", color: hdiv300ColorA[3]},
	{offset: "40%", color: hdiv300ColorA[4]},
	{offset: "50%", color: hdiv300ColorA[5]},
	{offset: "60%", color: hdiv300ColorA[6]},
	{offset: "70%", color: hdiv300ColorA[7]},
	{offset: "80%", color: hdiv300ColorA[8]},
	{offset: "90%", color: hdiv300ColorA[9]},
	{offset: "100%", color: hdiv300ColorA[10]}
]

offset.hdiv300['B'] = [
	{offset: "0%", color: hdiv300ColorB[0]},
	{offset: "10%", color: hdiv300ColorB[1]},
	{offset: "20%", color: hdiv300ColorB[2]},
	{offset: "30%", color: hdiv300ColorB[3]},
	{offset: "40%", color: hdiv300ColorB[4]},
	{offset: "50%", color: hdiv300ColorB[5]},
	{offset: "60%", color: hdiv300ColorB[6]},
	{offset: "70%", color: hdiv300ColorB[7]},
	{offset: "80%", color: hdiv300ColorB[8]},
	{offset: "90%", color: hdiv300ColorB[9]},
	{offset: "100%", color: hdiv300ColorB[10]}
]

offsetDif.hdiv300 = [
	{offset: "0%",   color: hdiv300ColorDif[0]},
	{offset: "10%",  color: hdiv300ColorDif[1]},
	{offset: "20%",  color: hdiv300ColorDif[2]},
	{offset: "30%",  color: hdiv300ColorDif[3]},
	{offset: "40%",  color: hdiv300ColorDif[4]},
	{offset: "50%",  color: hdiv300ColorDif[5]},
	{offset: "60%",  color: hdiv300ColorDif[6]},
	{offset: "70%",  color: hdiv300ColorDif[7]},
	{offset: "80%",  color: hdiv300ColorDif[8]},
	{offset: "90%",  color: hdiv300ColorDif[9]},
	{offset: "100%", color: hdiv300ColorDif[10]}
]

//// Hdiv500
// const hdiv500ColorA = ['#f7fbff', '#e3eef9', '#cfe1f2', '#b5d4e9', '#93c3df', '#6daed5', '#4b97c9', '#2f7ebc', '#1864aa', '#0a4a90', '#08306b']
// const hdiv500ColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
// const hdiv500ColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

// colors.hdiv500['A'] = scaleLinear().range(hdiv500ColorA)
// colors.hdiv500['B'] = scaleLinear().range(hdiv500ColorB)
// colorsDif.hdiv500  = scaleLinear().range(hdiv500ColorDif)

// offset.hdiv500['A']= [
// 	{offset: "0%", color: hdiv500ColorA[0]},
// 	{offset: "10%", color: hdiv500ColorA[1]},
// 	{offset: "20%", color: hdiv500ColorA[2]},
// 	{offset: "30%", color: hdiv500ColorA[3]},
// 	{offset: "40%", color: hdiv500ColorA[4]},
// 	{offset: "50%", color: hdiv500ColorA[5]},
// 	{offset: "60%", color: hdiv500ColorA[6]},
// 	{offset: "70%", color: hdiv500ColorA[7]},
// 	{offset: "80%", color: hdiv500ColorA[8]},
// 	{offset: "90%", color: hdiv500ColorA[9]},
// 	{offset: "100%", color: hdiv500ColorA[10]}
// ]

// offset.hdiv500['B'] = [
// 	{offset: "0%", color: hdiv500ColorB[0]},
// 	{offset: "10%", color: hdiv500ColorB[1]},
// 	{offset: "20%", color: hdiv500ColorB[2]},
// 	{offset: "30%", color: hdiv500ColorB[3]},
// 	{offset: "40%", color: hdiv500ColorB[4]},
// 	{offset: "50%", color: hdiv500ColorB[5]},
// 	{offset: "60%", color: hdiv500ColorB[6]},
// 	{offset: "70%", color: hdiv500ColorB[7]},
// 	{offset: "80%", color: hdiv500ColorB[8]},
// 	{offset: "90%", color: hdiv500ColorB[9]},
// 	{offset: "100%", color: hdiv500ColorB[10]}
// ]

// offsetDif.hdiv500 = [
// 	{offset: "0%",   color: hdiv500ColorDif[0]},
// 	{offset: "10%",  color: hdiv500ColorDif[1]},
// 	{offset: "20%",  color: hdiv500ColorDif[2]},
// 	{offset: "30%",  color: hdiv500ColorDif[3]},
// 	{offset: "40%",  color: hdiv500ColorDif[4]},
// 	{offset: "50%",  color: hdiv500ColorDif[5]},
// 	{offset: "60%",  color: hdiv500ColorDif[6]},
// 	{offset: "70%",  color: hdiv500ColorDif[7]},
// 	{offset: "80%",  color: hdiv500ColorDif[8]},
// 	{offset: "90%",  color: hdiv500ColorDif[9]},
// 	{offset: "100%", color: hdiv500ColorDif[10]}
// ]

//// Hdiv850
const hdiv850ColorA = ['#f7fbff', '#e3eef9', '#cfe1f2', '#b5d4e9', '#93c3df', '#6daed5', '#4b97c9', '#2f7ebc', '#1864aa', '#0a4a90', '#08306b']
const hdiv850ColorB = ['#f2f2f2', '#2c7bb6', '#00a6ca', '#00ccbc', '#90eb9d', '#ffff8c', '#f9d057', '#f29e2e', '#e76818', '#d7191c', '#800000']
const hdiv850ColorDif = ['#053061', '#375d84', '#698aa8', '#9bb6cb', '#cde3ee', '#f2efee', '#fbd7c4', '#d6a19b', '#b16c72', '#8c3648', '#67001f']

colors.hdiv850['A'] = scaleLinear().range(hdiv850ColorA)
colors.hdiv850['B'] = scaleLinear().range(hdiv850ColorB)
colorsDif.hdiv850  = scaleLinear().range(hdiv850ColorDif)

offset.hdiv850['A']= [
	{offset: "0%", color: hdiv850ColorA[0]},
	{offset: "10%", color: hdiv850ColorA[1]},
	{offset: "20%", color: hdiv850ColorA[2]},
	{offset: "30%", color: hdiv850ColorA[3]},
	{offset: "40%", color: hdiv850ColorA[4]},
	{offset: "50%", color: hdiv850ColorA[5]},
	{offset: "60%", color: hdiv850ColorA[6]},
	{offset: "70%", color: hdiv850ColorA[7]},
	{offset: "80%", color: hdiv850ColorA[8]},
	{offset: "90%", color: hdiv850ColorA[9]},
	{offset: "100%", color: hdiv850ColorA[10]}
]

offset.hdiv850['B'] = [
	{offset: "0%", color: hdiv850ColorB[0]},
	{offset: "10%", color: hdiv850ColorB[1]},
	{offset: "20%", color: hdiv850ColorB[2]},
	{offset: "30%", color: hdiv850ColorB[3]},
	{offset: "40%", color: hdiv850ColorB[4]},
	{offset: "50%", color: hdiv850ColorB[5]},
	{offset: "60%", color: hdiv850ColorB[6]},
	{offset: "70%", color: hdiv850ColorB[7]},
	{offset: "80%", color: hdiv850ColorB[8]},
	{offset: "90%", color: hdiv850ColorB[9]},
	{offset: "100%", color: hdiv850ColorB[10]}
]

offsetDif.hdiv850 = [
	{offset: "0%",   color: hdiv850ColorDif[0]},
	{offset: "10%",  color: hdiv850ColorDif[1]},
	{offset: "20%",  color: hdiv850ColorDif[2]},
	{offset: "30%",  color: hdiv850ColorDif[3]},
	{offset: "40%",  color: hdiv850ColorDif[4]},
	{offset: "50%",  color: hdiv850ColorDif[5]},
	{offset: "60%",  color: hdiv850ColorDif[6]},
	{offset: "70%",  color: hdiv850ColorDif[7]},
	{offset: "80%",  color: hdiv850ColorDif[8]},
	{offset: "90%",  color: hdiv850ColorDif[9]},
	{offset: "100%", color: hdiv850ColorDif[10]}
]

//// K-INDEX

const kIndexColorA = ['#ffffe5', '#fff8c4', '#feeaa1', '#fed676', '#feba4a', '#fb992c', '#ee7918', '#d85b0a', '#b74304', '#8f3204', '#662506']//.reverse()
const kIndexColorB = ['#a50026', '#d4322c', '#f16e43', '#fcac64', '#fedd90', '#faf8c1', '#dcf1ec', '#abd6e8', '#75abd0', '#4a74b4', '#313695'].reverse()
const kIndexColorDif = ['#7f3b08', '#9f6433', '#be8c5e', '#deb588', '#fdddb3', '#f3eeea', '#d7d7e9', '#ada1c2', '#826c9a', '#583673', '#2d004b']

colors.kIndex['A'] = scaleLinear().range(kIndexColorA)
colors.kIndex['B'] = scaleLinear().range(kIndexColorB)
colorsDif.kIndex  = scaleLinear().range(kIndexColorDif)

offset.kIndex['A']= [
	{offset: "0%", color: kIndexColorA[0]},
	{offset: "10%", color: kIndexColorA[1]},
	{offset: "20%", color: kIndexColorA[2]},
	{offset: "30%", color: kIndexColorA[3]},
	{offset: "40%", color: kIndexColorA[4]},
	{offset: "50%", color: kIndexColorA[5]},
	{offset: "60%", color: kIndexColorA[6]},
	{offset: "70%", color: kIndexColorA[7]},
	{offset: "80%", color: kIndexColorA[8]},
	{offset: "90%", color: kIndexColorA[9]},
	{offset: "100%", color: kIndexColorA[10]}
]

offset.kIndex['B'] = [
	{offset: "0%", color: kIndexColorB[0]},
	{offset: "10%", color: kIndexColorB[1]},
	{offset: "20%", color: kIndexColorB[2]},
	{offset: "30%", color: kIndexColorB[3]},
	{offset: "40%", color: kIndexColorB[4]},
	{offset: "50%", color: kIndexColorB[5]},
	{offset: "60%", color: kIndexColorB[6]},
	{offset: "70%", color: kIndexColorB[7]},
	{offset: "80%", color: kIndexColorB[8]},
	{offset: "90%", color: kIndexColorB[9]},
	{offset: "100%", color: kIndexColorB[10]}
]

offsetDif.kIndex = [
	{offset: "0%",   color: kIndexColorDif[0]},
	{offset: "10%",  color: kIndexColorDif[1]},
	{offset: "20%",  color: kIndexColorDif[2]},
	{offset: "30%",  color: kIndexColorDif[3]},
	{offset: "40%",  color: kIndexColorDif[4]},
	{offset: "50%",  color: kIndexColorDif[5]},
	{offset: "60%",  color: kIndexColorDif[6]},
	{offset: "70%",  color: kIndexColorDif[7]},
	{offset: "80%",  color: kIndexColorDif[8]},
	{offset: "90%",  color: kIndexColorDif[9]},
	{offset: "100%", color: kIndexColorDif[10]}
]

// PROBABILITY

const colorsProb = {}
colorsProb.global = {}
colorsProb.lens = {}

const offsetProb = {}
offsetProb.global = {}
offsetProb.lens = {}

const colorsDifProb = {}
colorsDifProb.global = {}
colorsDifProb.lens = {}

const offsetDifProb = {}
offsetDifProb.global = {}
offsetDifProb.lens = {}

// colorblind safe

// azul roxo
// const globalColorProbA = ['#fffafc', '#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858', '#081d58']
// const lensColorProbA = ['#fcfbfd', '#f2eef6', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d', '#330066']

// azul rosa
// const globalColorProbA = ['#fffafc', '#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858', '#081d58']
// const lensColorProbA = ['#fff7f3', '#ffeee6', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a', '#34004d']

// verde vermelho safe
const globalColorProbA = ['#f7fcfd', '#ebf7fa', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b', '#003314']
const lensColorProbA = ['#fff5f0', '#ffeee6', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d', '#4d000a']

// const globalColorProbA = ['#f7fcf5', '#ddf1dc', '#c2e5c3', '#a8daaa', '#8dce91', '#73c378', '#5caa65', '#459053', '#2e7740', '#175d2e', '#00441b']
const globalColorProbB = ['#eefbf0', '#a0f9ac', '#52f667', '#38eb85', '#1ddfa3', '#20c5be', '#23abd8', '#388dda', '#4c6edb', '#5d57c3', '#6e40aa']

// const lensColorProbA = ['#fff5f0', '#fee3d6', '#fdc9b4', '#fcaa8e', '#fc8a6b', '#f9694c', '#ef4533', '#d92723', '#bb151a', '#970b13', '#67000d']
const lensColorProbB = ['#f7fbff', '#e3eef9', '#cfe1f2', '#b5d4e9', '#93c3df', '#6daed5', '#4b97c9', '#2f7ebc', '#1864aa', '#0a4a90', '#08306b']

colorsProb.global['A'] = scaleLinear().range([globalColorProbA[0], globalColorProbA[1], globalColorProbA[2], globalColorProbA[3], globalColorProbA[4], globalColorProbA[5], globalColorProbA[6], globalColorProbA[7], globalColorProbA[8], globalColorProbA[9], globalColorProbA[10]])
colorsProb.global['B'] = scaleLinear().range([globalColorProbB[0], globalColorProbB[1], globalColorProbB[2], globalColorProbB[3], globalColorProbB[4], globalColorProbB[5], globalColorProbB[6], globalColorProbB[7], globalColorProbB[8], globalColorProbB[9], globalColorProbB[10]])

colorsProb.lens['A'] = scaleLinear().range([lensColorProbA[0], lensColorProbA[1], lensColorProbA[2], lensColorProbA[3], lensColorProbA[4], lensColorProbA[5], lensColorProbA[6], lensColorProbA[7], lensColorProbA[8], lensColorProbA[9], lensColorProbA[10]])
colorsProb.lens['B'] = scaleLinear().range([lensColorProbB[0], lensColorProbB[1], lensColorProbB[2], lensColorProbB[3], lensColorProbB[4], lensColorProbB[5], lensColorProbB[6], lensColorProbB[7], lensColorProbB[8], lensColorProbB[9], lensColorProbB[10]])


offsetProb.global['A'] = [
	{offset: "0%",   color: globalColorProbA[0]},
	{offset: "10%",  color: globalColorProbA[1]},
	{offset: "20%",  color: globalColorProbA[2]},
	{offset: "30%",  color: globalColorProbA[3]},
	{offset: "40%",  color: globalColorProbA[4]},
	{offset: "50%",  color: globalColorProbA[5]},
	{offset: "60%",  color: globalColorProbA[6]},
	{offset: "70%",  color: globalColorProbA[7]},
	{offset: "80%",  color: globalColorProbA[8]},
	{offset: "90%",  color: globalColorProbA[9]},
	{offset: "100%", color: globalColorProbA[10]}
]

offsetProb.global['B'] = [
	{offset: "0%",   color: globalColorProbB[0]},
	{offset: "10%",  color: globalColorProbB[1]},
	{offset: "20%",  color: globalColorProbB[2]},
	{offset: "30%",  color: globalColorProbB[3]},
	{offset: "40%",  color: globalColorProbB[4]},
	{offset: "50%",  color: globalColorProbB[5]},
	{offset: "60%",  color: globalColorProbB[6]},
	{offset: "70%",  color: globalColorProbB[7]},
	{offset: "80%",  color: globalColorProbB[8]},
	{offset: "90%",  color: globalColorProbB[9]},
	{offset: "100%", color: globalColorProbB[10]}
]

offsetProb.lens['A'] = [
	{offset: "0%",   color: lensColorProbA[0]},
	{offset: "10%",  color: lensColorProbA[1]},
	{offset: "20%",  color: lensColorProbA[2]},
	{offset: "30%",  color: lensColorProbA[3]},
	{offset: "40%",  color: lensColorProbA[4]},
	{offset: "50%",  color: lensColorProbA[5]},
	{offset: "60%",  color: lensColorProbA[6]},
	{offset: "70%",  color: lensColorProbA[7]},
	{offset: "80%",  color: lensColorProbA[8]},
	{offset: "90%",  color: lensColorProbA[9]},
	{offset: "100%", color: lensColorProbA[10]}
]

offsetProb.lens['B'] = [
	{offset: "0%",   color: lensColorProbB[0]},
	{offset: "10%",  color: lensColorProbB[1]},
	{offset: "20%",  color: lensColorProbB[2]},
	{offset: "30%",  color: lensColorProbB[3]},
	{offset: "40%",  color: lensColorProbB[4]},
	{offset: "50%",  color: lensColorProbB[5]},
	{offset: "60%",  color: lensColorProbB[6]},
	{offset: "70%",  color: lensColorProbB[7]},
	{offset: "80%",  color: lensColorProbB[8]},
	{offset: "90%",  color: lensColorProbB[9]},
	{offset: "100%", color: lensColorProbB[10]}
]

const globalColorDifProb = ['#7f3b08', '#9f6433', '#be8c5e', '#deb588', '#fdddb3', '#f3eeea', '#d7d7e9', '#ada1c2', '#826c9a', '#583673', '#2d004b']
const lensColorDifProb = ['#8e0152', '#c0267e', '#dd72ad', '#f0b3d6', '#fadded', '#f5f3ef', '#e1f2ca', '#b6de87', '#80bb47', '#4f9125', '#276419']

colorsDifProb.global = scaleLinear().range([globalColorDifProb[0], globalColorDifProb[1], globalColorDifProb[2], globalColorDifProb[3], globalColorDifProb[4], globalColorDifProb[5], globalColorDifProb[6], globalColorDifProb[7], globalColorDifProb[8], globalColorDifProb[9], globalColorDifProb[10]])
colorsDifProb.lens = scaleLinear().range([lensColorDifProb[0], lensColorDifProb[1], lensColorDifProb[2], lensColorDifProb[3], lensColorDifProb[4], lensColorDifProb[5], lensColorDifProb[6], lensColorDifProb[7], lensColorDifProb[8], lensColorDifProb[9], lensColorDifProb[10]])

offsetDifProb.global = [
	{offset: "0%",   color: globalColorDifProb[0]},
	{offset: "10%",  color: globalColorDifProb[1]},
	{offset: "20%",  color: globalColorDifProb[2]},
	{offset: "30%",  color: globalColorDifProb[3]},
	{offset: "40%",  color: globalColorDifProb[4]},
	{offset: "50%",  color: globalColorDifProb[5]},
	{offset: "60%",  color: globalColorDifProb[6]},
	{offset: "70%",  color: globalColorDifProb[7]},
	{offset: "80%",  color: globalColorDifProb[8]},
	{offset: "90%",  color: globalColorDifProb[9]},
	{offset: "100%", color: globalColorDifProb[10]}
]

offsetDifProb.lens = [
	{offset: "0%",   color: lensColorDifProb[0]},
	{offset: "10%",  color: lensColorDifProb[1]},
	{offset: "20%",  color: lensColorDifProb[2]},
	{offset: "30%",  color: lensColorDifProb[3]},
	{offset: "40%",  color: lensColorDifProb[4]},
	{offset: "50%",  color: lensColorDifProb[5]},
	{offset: "60%",  color: lensColorDifProb[6]},
	{offset: "70%",  color: lensColorDifProb[7]},
	{offset: "80%",  color: lensColorDifProb[8]},
	{offset: "90%",  color: lensColorDifProb[9]},
	{offset: "100%", color: lensColorDifProb[10]}
]

module.exports = {
    colors,
	colorsDif,
	offset,
    offsetDif,
    colorsProb,
	colorsDifProb,
	offsetProb,
	offsetDifProb
}