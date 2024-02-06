// imports
const routes = require('express').Router();
const api = require("./api");

// root entry point
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// data api test
routes.get('/wrf', api.test)
routes.post('/wrf/hmat', api.hmat)
routes.post('/wrf/hmap', api.hmap)
routes.post('/wrf/lens', api.lens)
routes.post('/wrf/tseries', api.tseries)

routes.post('/wrf/hmatProb', api.hmatProb)
routes.post('/wrf/hmapProb', api.hmapProb)
routes.post('/wrf/lensProb', api.lensProb)
routes.post('/wrf/pmf', api.pmf)


// exports
module.exports = routes;