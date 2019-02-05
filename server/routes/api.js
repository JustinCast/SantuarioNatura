var express = require("express");
var router = express.Router();

var activitiesQueries = require("./activities.queries");
var imageQueries = require("./images.queries");
var rateQueries = require("./rate.queries");
var reservationQueries = require("./reservations.queries");
var userQueries = require("./user.queries");
var commentsQueries = require("./comments.queries");

//comment endpoints
router.post("/createComment", commentsQueries.createComment);
router.post("/sendContactEmail", commentsQueries.sendContactEmail);
router.get("/getComments", commentsQueries.getComments);
router.get("/getCommentsToConfirm", commentsQueries.getCommentsToConfirm);
router.put("/acceptComment", commentsQueries.acceptComment);
router.delete("/deleteComment/:id", commentsQueries.deleteComment);


//reservation endpoints
router.post("/createReservation", reservationQueries.saveReservation);
router.get("/getActivities", activitiesQueries.getActivities);
router.get("/getReservations", reservationQueries.getReservations);
router.get("/deleteReservation/:id", reservationQueries.deleteReservation);

// users endpoints
router.get("/recoveryPassword/:username", userQueries.recoveryPassword);
router.get("/getAllUsers", userQueries.getAllUsers);
router.post("/createUser", userQueries.createUser);
router.post("/login", userQueries.login);
router.put("/updateUser", userQueries.updateUser);
router.put("/updatePassword/:username", userQueries.updatePassword);
router.get("/verifyPassword/:password", userQueries.verifyPassword);
router.delete("/deleteUser/:id", userQueries.deleteUser);

// activityQueries
router.get("/getAllActivities", activitiesQueries.getAllActivities);
router.post("/saveActivity", activitiesQueries.saveActivity);
router.put("/updateActivity", activitiesQueries.updateActivity);
router.delete("/deleteActivity/:id", activitiesQueries.deleteActivity);

// rate queries
router.get("/getRates/:id_activity", rateQueries.getRates);
router.post("/saveRate", rateQueries.saveRate);
router.put("/updateRate", rateQueries.updateRate);
router.delete("/deleteRate/:id", rateQueries.deleteRate)

router.get("/getBestFourActivities", activitiesQueries.getBestFourActivities);

// images queries
router.post("/saveImage", imageQueries.saveImage);
router.get("/getAllImages/:id", imageQueries.getAllImages);
router.get("/deleteImage/:image_id", imageQueries.deleteImage);

module.exports = router;
