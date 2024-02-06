class Features {
    constructor() {
        this.pmfIntervals = {};
        this.pmfIntervals.rain = null;
        this.pmfIntervals.temp = null;
        this.pmfIntervals.moist = null;
        this.pmfIntervals.omega = null;
        this.pmfIntervals.hdiv15 = null;
        this.pmfIntervals.hdiv4 = null;
        this.pmfIntervals.kIndex = null;

        this.loadPmfIntervals();
    }

    loadPmfIntervals() {
        this.pmfIntervals.rain = {'0-5': 5, '5-10': 10, '10-15': 15,'15-20': 20, '20-25': 25, '25-30': 30, '30-pinfinity': 10000}
        this.pmfIntervals.temp = {'ninfinity-10': 10, '10-15': 15,'15-20': 20, '20-25': 25, '25-30': 30, '30-pinfinity': 10000}
        this.pmfIntervals.moist = {'0-50': 50, '50-60': 60, '60-70':70, '70-80':80, '80-90':90, '90-pinfinity': 10000}
        this.pmfIntervals.kIndex = {'ninfinity-20': 20, '20-25': 25, '25-30': 30, '30-35': 35, '35-40': 40,'40-pinfinity': 10000}

        this.pmfIntervals.omega = {'0-0.2': 0.2, '0.2-0.4': 0.4, '0.4-0.6': 0.6, '0.6-0.8': 0.8, '0.8-1.0': 1.0, '1.0-pinfinity': 10000}
        this.pmfIntervals.hdiv300 = {'0-10': 10, '10-20': 20, '20-30': 30,'30-40': 40, '40-50': 50, '50-60': 60, '60-pinfinity': 10000}
        // this.pmfIntervals.hdiv500 = {'0-20': 20, '20-40': 40, '40-60': 60, '60-80': 80, '80-100': 100, '100-200': 200, '200-pinfinity': 10000}
        this.pmfIntervals.hdiv850 = {'0-20': 20, '20-40': 40, '40-60': 60, '60-80': 80, '80-100': 100, '100-200': 200, '200-pinfinity': 10000}
    }
}

module.exports = Features;