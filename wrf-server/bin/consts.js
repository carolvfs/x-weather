class Consts {

  static path  = '../data20110110'; 
  static resultsPath = '../results20110110'
  static accumTime = 3;
  static nsteps = 25;

  // static path  = '../data20200106'; 
  // static resultsPath = '../results20200106'
  // static accumTime = 3;
  // static nsteps = 25;

  static nsimuls = 160;
  static ngridrows = 57;
  static ngridcolumns = 96;

  static ngridpoints = this.ngridrows * this.ngridcolumns; // 5472
  static nsimuldata = this.nsteps * this.ngridpoints; // 169632
  static nensembledata = this.nsimuls * this.nsimuldata; // 27141120


}

module.exports = Consts;
