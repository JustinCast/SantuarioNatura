const db = require("../config/config");

function getCommentsToConfirm(req, res, next) {
  db.any("SELECT * FROM select_comments_to_confirm()")
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

function acceptComment(req, res) {
  db.any("SELECT accept_comment($1)", req.body.id)
    .then(success => {
      res.status(200).json({
        status: success,
        message: "Comentario aceptado con éxito"
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: "Internal server error", message: `Error: ${error}` });
      console.log("ERROR:", error); // print the error;
    });
}

function deleteComment(req, res, next) {
  let id = req.params.id;
  db.any("SELECT delete_comments($1)", id)
    .then(success => {
      res
        .status(200)
        .json({ status: success, message: "Commentario eliminado con éxito" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: "Internal server error", message: `Error: ${error}` });
      console.log("ERROR:", error); // print the error;
    });
}

function getComments(req, res, next) {
  db.any("SELECT * FROM select_comments()")
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

function createComment(req, res) {
  db.any("SELECT insert_comments(${comment},${name})", {
    name: req.body.name,
    comment: req.body.comment
  })
    .then(success => {
      res
        .status(201)
        .json({ status: success, message: "mensaje creado con éxito" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ status: "Internal server error", message: `Error: ${error}` });
      console.log("ERROR:", error); // print the error;
    });
}

function sendContactEmail(req, res, next) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ||
    "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");
  const msg = {
    to: "info@santuarionatura.com",
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text
  };
  sgMail.send(msg);
  res.status(201).send(true);
}

module.exports = {
  createComment: createComment,
  getComments: getComments,
  deleteComment: deleteComment,
  acceptComment: acceptComment,
  getCommentsToConfirm: getCommentsToConfirm,
  sendContactEmail: sendContactEmail
};
