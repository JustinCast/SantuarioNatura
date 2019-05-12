const db = require("../config/config");

function getRates(req, res) {
  db.any("SELECT * FROM get_rates($1)", [req.params.id_activity])
    .then(rates => {
      res.status(200).send(rates)
    })
    .catch(error => errHandler("getRates", res, error));
}

function saveRate(req, res) {
  console.log(req.body);
  db.any("SELECT insert_rate_and_quotas(${_from}, ${_to}, ${_rate}, ${_id_activity});", {
    _from: req.body._from,
    _to: req.body._to,
    _rate: req.body._rate,
    _id_activity: req.body._id_activity
  })
    .then(() => res.status(201).send(true))
    .catch(error => errHandler("saveRate", res, error));
}

function updateRate(req, res) {
  db.none("SELECT update_rate_and_quotas(${_id}, ${_to}, ${_rate}, ${_id_activity});", {
    _id: req.body.id,
    _to: req.body.from,
    _rate: req.body.to,
    _id_activity: req.body.id_activity
})
    .then(() => res.status(200).send(true))
    .catch(error => errHandler("updateRates", res, error));
}

function deleteRate(req, res) {
  db.any("SELECT delete_rate_and_quotas(${id})", {id: req.params.id})
    .then(() => res.status(200).send(true))
    .catch(error => errHandler("deleteRate", res, error));
}

function errHandler(method, res, error) {
  res.status(500).json({
    status: `Internal server error at ${method}`,
    message: `Error: ${error}`
  });
  console.log("ERROR:", error); // print the error;
}

module.exports = {
  getRates: getRates,
  updateRate: updateRate,
  saveRate: saveRate,
  deleteRate: deleteRate
};
