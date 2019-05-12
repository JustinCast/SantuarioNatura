const db = require("../config/config");
function saveReservation(req, res) {
  db.any(
    "SELECT insert_reservation(${name},${email},${phone},${country},${adults},${children},${activity},${activityDate},${feeding},${transport},${lodging},${lodgingStartDate},${lodingFinishDate},${paymentMethod},${comment});",
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      adults: req.body.adults,
      children: req.body.children,
      activity: req.body.activity,
      activityDate: req.body.activity_date,
      feeding: req.body.feeding,
      transport: req.body.transport,
      lodging: req.body.lodging,
      lodgingStartDate: req.body.lodging_start_date,
      lodingFinishDate: req.body.lodging_finish_date,
      paymentMethod: req.body.payment_method,
      comment: req.body.comment
    }
  )
    .then(success => {
      res
        .status(201)
        .json({ status: success, message: "reservasión creada con éxito" });
    })
    .catch(error => errHandler("CREATE RESERVATION", res, error));
}

function getReservations(req, res) {
  db.any("SELECT * FROM reservation")
    .then(data => res.status(200).send(data))
    .catch(err => errHandler("GET RESERVATIONS", res, err));
}

function deleteReservation(req, res) {
  db.any("SELECT * FROM delete_reservation($1)", [req.params.id])
  .then(() => res.status(200).send(true))
  .catch(error => errHandler("DELETE RESERVATION", res, error));
}

function errHandler(method, res, error) {
  res.status(500).json({
    status: `Internal server error at ${method}`,
    message: `Error: ${error}`
  });
  console.log("ERROR:", error); // print the error;
}

module.exports = {
  saveReservation: saveReservation,
  getReservations: getReservations,
  deleteReservation: deleteReservation
};
