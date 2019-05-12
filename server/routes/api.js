var express = require("express");
var api = express.Router();

var activitiesQueries = require("./activities.queries");
var imageQueries = require("./images.queries");
var rateQueries = require("./rate.queries");
var reservationQueries = require("./reservations.queries");
var userQueries = require("./user.queries");
var commentsQueries = require("./comments.queries");

//comment endpoints
api.post("/createComment", commentsQueries.createComment);
api.post("/sendContactEmail", commentsQueries.sendContactEmail);
api.get("/getComments", commentsQueries.getComments);
api.get("/getCommentsToConfirm", commentsQueries.getCommentsToConfirm);
api.put("/acceptComment", commentsQueries.acceptComment);
api.delete("/deleteComment/:id", commentsQueries.deleteComment);


//reservation endpoints
api.post("/createReservation", reservationQueries.saveReservation);
api.get("/getActivities", activitiesQueries.getActivities);
api.get("/getReservations", reservationQueries.getReservations);
api.delete("/deleteReservation/:id", reservationQueries.deleteReservation);

// users endpoints
api.get("/recoveryPassword/:username", userQueries.recoveryPassword);
api.get("/getAllUsers", userQueries.getAllUsers);
api.post("/createUser", userQueries.createUser);
api.post("/login", userQueries.login);
api.put("/updateUser", userQueries.updateUser);
api.put("/updatePassword/:username", userQueries.updatePassword);
api.get("/verifyPassword/:password", userQueries.verifyPassword);
api.delete("/deleteUser/:id", userQueries.deleteUser);

// activityQueries
api.get("/getAllActivities", activitiesQueries.getAllActivities);
api.post("/saveActivity", activitiesQueries.saveActivity);
api.put("/updateActivity", activitiesQueries.updateActivity);
api.delete("/deleteActivity/:id", activitiesQueries.deleteActivity);

// rate queries
api.get("/getRates/:id_activity", rateQueries.getRates);
api.post("/saveRate", rateQueries.saveRate);
api.put("/updateRate", rateQueries.updateRate);
api.delete("/deleteRate/:id", rateQueries.deleteRate)

api.get("/getBestFourActivities", activitiesQueries.getBestFourActivities);

// images queries
api.post("/saveImage", imageQueries.saveImage);
api.get("/getAllImages/:id", imageQueries.getAllImages);
api.get("/deleteImage/:image_id", imageQueries.deleteImage);

module.exports = api;
