var promise = require("bluebird");

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
/*const connectionString =
  "postgres://dev@santuarionatura:ikgs0941@santuarionatura.clh2aphgkhvt.us-east-2.rds.amazonaws.com:5432/sn_production?ssl=true";*/
const db = pgp({
  host: 'santuarionatura.clh2aphgkhvt.us-east-2.rds.amazonaws.com',
  user: 'dev',
  password: 'ikgs0941',
  database: 'sn_production',
  port: 5427
});

module.exports = db;