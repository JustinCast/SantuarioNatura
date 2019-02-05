const db = require("../config/config");

function getAllActivities(req, res, next) {
  let db = require("../config/config");
  db.any("SELECT * FROM get_all_activities()")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => errHandler("GET ALL ACTIVITIES", res, error));
}

function saveActivity(req, res, next) {
  let db = require("../config/config");
  console.log(req.body);
  db.any(
    "INSERT INTO activity (name, description, difficulty, includes, duration, bring, location, access, visits, in_offer) VALUES(${name}, ${description}, ${difficulty}, ${includes}, ${duration}, ${bring}, ${location}, ${access}, ${visits}, ${in_offer})",
    {
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      includes: req.body.includes,
      duration: req.body.duration,
      bring: req.body.bring,
      location: Object(req.body.location),
      access: req.body.access,
      visits: req.body.visits,
      in_offer: req.body.in_offer
    }
  )
    .then(() => {
      db.any("SELECT id FROM activity WHERE name = ${name}", {
        name: req.body.name
      })
        .then(result => {
          res.status(200).json(result[0]);
        })
        .catch(error => {
          res.status(500).json({
            status: "Internal server error",
            message: `Error: ${error}`
          });
          console.log("ERROR:", error); // print the error;
        });
    })
    .catch(error => errHandler("SAVE ACTIVITY", res, error));
}

function getBestFourActivities(req, res, next) {
  db.any("SELECT * FROM select_best_four_activities()")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: "Internal server error", message: `Error: ${error}` });
      console.log("ERROR:", error); // print the error;
    });
}

function updateActivity(req, res) {
  console.log(req.body);
  db.none(
    "UPDATE activity SET name = ${name}," +
      "description = ${description}," +
      "difficulty = ${difficulty}," +
      "includes = ${includes}," +
      "duration = ${duration}," +
      "bring = ${bring}," +
      "location = ${location}," +
      "access = ${access}," +
      "visits = ${visits}," +
      "in_offer = ${in_offer} " +
      "WHERE id = ${id};",
    {
      name: req.body.name,
      description: req.body.description,
      difficulty: req.body.difficulty,
      includes: req.body.includes,
      duration: req.body.duration,
      bring: req.body.bring,
      location: req.body.location,
      access: req.body.access,
      visits: req.body.visits,
      in_offer: req.body.in_offer,
      id: req.body.id
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Actividad actualizada eliminada con éxito"
      });
    })
    .catch(error => errHandler("UPDATE ACTIVITY", res, error));
}

function deleteActivity(req, res, next) {
  let id = req.params.id;
  db.any("SELECT delete_activity($1)", id)
    .then(success => {
      res.status(200).json({
        status: success,
        message: "Actividad guardada eliminada con éxito"
      });
    })
    .catch(error => errHandler("DELETE ACTIVITY", res, error));
}

function getActivities(req, res, next) {
  db.any("SELECT name FROM activity")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: "Internal server error", message: `Error: ${error}` });
      console.log("ERROR:", error); // print the error;
    });
}

function errHandler(method, res, error) {
  res.status(500).json({
    status: `Internal server error at ${method}`,
    message: `Error: ${error}`
  });
  console.log("ERROR:", error); // print the error;
}

module.exports = {
  getAllActivities: getAllActivities,
  saveActivity: saveActivity,
  updateActivity: updateActivity,
  deleteActivity: deleteActivity,
  getActivities: getActivities,
  getBestFourActivities: getBestFourActivities
};
