const scales = {}
const scalesDif = {}

scales.rain = {}
scales.rain.vector = {}
scales.rain.unit = 'mm'

scales.rain.vector['10']=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
scales.rain.vector['20']=[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
scales.rain.vector['30']=[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
scales.rain.vector['40']=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
scales.rain.vector['50']=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
scales.rain.vector['60']=[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60]
scales.rain.vector['70']=[0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70]
scales.rain.vector['80']=[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80]
scales.rain.vector['90']=[0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90]
scales.rain.vector['100']=[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

scales.rain.options = Object.keys(scales.rain.vector)

scalesDif.rain = {}
scalesDif.rain.vector = {}

scalesDif.rain.vector['10']=[-10, -8,  -6,   -4,  -2, 0, 2, 4, 6, 8, 10]
scalesDif.rain.vector['20']=[-20, -16, -12,  -8,  -4, 0,  4,  8, 12, 16, 20]
scalesDif.rain.vector['30']=[-30, -24, -18, -12,  -6, 0,  6, 12, 18, 24, 30]
scalesDif.rain.vector['40']=[-40, -32, -24, -16,  -8, 0,  8, 16, 24, 32, 40]
scalesDif.rain.vector['50']=[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]
scalesDif.rain.vector['60']=[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60]
scalesDif.rain.vector['70']=[-70, -56, -42, -28, -14, 0, 14, 28, 42, 56, 70]
scalesDif.rain.vector['80']=[-80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80]
scalesDif.rain.vector['90']=[-90, -72, -54, -36, -18, 0, 18, 36, 54, 72, 90]
scalesDif.rain.vector['100']=[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]

scales.temp = {}
scales.temp.vector = {}

scales.temp.vector['20']=[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
scales.temp.vector['25']=[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25]
scales.temp.vector['30']=[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
scales.temp.vector['35']=[0, 3.5, 7, 10.5, 14, 17.5, 21, 24.5, 28, 31.5, 35]
scales.temp.vector['40']=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]

scales.temp.options = Object.keys(scales.temp.vector)

scalesDif.temp = {}
scalesDif.temp.vector = {}

scalesDif.temp.vector['20']=[-20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20]
scalesDif.temp.vector['25']=[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25]
scalesDif.temp.vector['30']=[-30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30]
scalesDif.temp.vector['35']=[-35, -28, -21, -14, -7, 0, 7, 14, 21, 28, 35]
scalesDif.temp.vector['40']=[-40, -32, -24, -16, -8, 0, 8, 16, 24, 32, 40]

scales.kIndex = {}
scales.kIndex.vector = {}

scales.kIndex.vector['30']=[20, 21, 22, 23 ,24, 25, 26, 27, 28, 29, 30]
scales.kIndex.vector['40']=[20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40]
scales.kIndex.vector['50']=[20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]


scales.kIndex.options = Object.keys(scales.kIndex.vector)

scalesDif.kIndex = {}
scalesDif.kIndex.vector = {}

scalesDif.kIndex.vector['30']=[-30, -24, -18, -12, -6, 0, 6, 12, 18, 24, 30]
scalesDif.kIndex.vector['40']=[-40, -32, -24, -16, -8, 0, 8, 16, 24, 32, 40]
scalesDif.kIndex.vector['50']=[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

scales.omega = {}
scales.omega.vector = {}

scales.omega.vector['0.2']=[0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2]
scales.omega.vector['0.5']=[0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
scales.omega.vector['1.0']=[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
scales.omega.vector['1.5']=[0, 0.15, 0.3, 0.45, 0.55, 0.75, 0.9, 1.05, 1.2, 1.35, 1.5]

scales.omega.options = Object.keys(scales.omega.vector)

scalesDif.omega = {}
scalesDif.omega.vector = {}

scalesDif.omega.vector['0.2']=[-0.2, -0.16, -0.12, -0.08, -0.04, 0, 0.04, 0.08, 0.12, 0.16, 0.2]
scalesDif.omega.vector['0.5']=[-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5]
scalesDif.omega.vector['1.0']=[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]
scalesDif.omega.vector['1.5']=[-1.5, -1.2, -0.9, -0.55, -0.3, 0, 0.3, 0.55, 0.9, 1.2, 1.5]

scales.moist = {}
scales.moist.vector = {}

scales.moist.vector['60']=[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60]
scales.moist.vector['80']=[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80]
scales.moist.vector['100']=[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

scales.moist.options = Object.keys(scales.moist.vector)

scalesDif.moist = {}
scalesDif.moist.vector = {}

scalesDif.moist.vector['60']=[-60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60]
scalesDif.moist.vector['80']=[-80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80]
scalesDif.moist.vector['100']=[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]

scales.hdiv300 = {}
scales.hdiv300.vector = {}

scales.hdiv300.vector['10']=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
scales.hdiv300.vector['20']=[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
scales.hdiv300.vector['30']=[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
scales.hdiv300.vector['40']=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
scales.hdiv300.vector['50']=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

scales.hdiv300.options = Object.keys(scales.hdiv300.vector)

scalesDif.hdiv300 = {}
scalesDif.hdiv300.vector = {}

scalesDif.hdiv300.vector['10']=[-10, -8,  -6,   -4,  -2, 0, 2, 4, 6, 8, 10]
scalesDif.hdiv300.vector['20']=[-20, -16, -12,  -8,  -4, 0,  4,  8, 12, 16, 20]
scalesDif.hdiv300.vector['30']=[-30, -24, -18, -12,  -6, 0,  6, 12, 18, 24, 30]
scalesDif.hdiv300.vector['40']=[-40, -32, -24, -16,  -8, 0,  8, 16, 24, 32, 40]
scalesDif.hdiv300.vector['50']=[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

// scales.hdiv500 = {}
// scales.hdiv500.vector = {}

// scales.hdiv500.vector['10']=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// scales.hdiv500.vector['20']=[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
// scales.hdiv500.vector['30']=[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
// scales.hdiv500.vector['40']=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
// scales.hdiv500.vector['50']=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

// scales.hdiv500.options = Object.keys(scales.hdiv500.vector)

// scalesDif.hdiv500 = {}
// scalesDif.hdiv500.vector = {}

// scalesDif.hdiv500.vector['10']=[-10, -8,  -6,   -4,  -2, 0, 2, 4, 6, 8, 10]
// scalesDif.hdiv500.vector['20']=[-20, -16, -12,  -8,  -4, 0,  4,  8, 12, 16, 20]
// scalesDif.hdiv500.vector['30']=[-30, -24, -18, -12,  -6, 0,  6, 12, 18, 24, 30]
// scalesDif.hdiv500.vector['40']=[-40, -32, -24, -16,  -8, 0,  8, 16, 24, 32, 40]
// scalesDif.hdiv500.vector['50']=[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]

scales.hdiv850 = {}
scales.hdiv850.vector = {}

scales.hdiv850.vector['10']=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
scales.hdiv850.vector['20']=[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
scales.hdiv850.vector['30']=[0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
scales.hdiv850.vector['40']=[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40]
scales.hdiv850.vector['50']=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
scales.hdiv850.vector['100']=[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

scales.hdiv850.options = Object.keys(scales.hdiv850.vector)

scalesDif.hdiv850 = {}
scalesDif.hdiv850.vector = {}

scalesDif.hdiv850.vector['10']=[-10, -8,  -6,   -4,  -2, 0, 2, 4, 6, 8, 10]
scalesDif.hdiv850.vector['20']=[-20, -16, -12,  -8,  -4, 0,  4,  8, 12, 16, 20]
scalesDif.hdiv850.vector['30']=[-30, -24, -18, -12,  -6, 0,  6, 12, 18, 24, 30]
scalesDif.hdiv850.vector['40']=[-40, -32, -24, -16,  -8, 0,  8, 16, 24, 32, 40]
scalesDif.hdiv850.vector['50']=[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]
scalesDif.hdiv850.vector['100']=[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]




module.exports = {
    scales,
	scalesDif,
}