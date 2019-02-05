const db = require("../config/config");
function getAllUsers(req, res, next) {
  db.any("select * from _user;")
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

function createUser(req, res, next) {
  db.any(
    "SELECT insert_user(${name}, ${username}, crypt(${password}, gen_salt('bf')), ${role},${email});",
    {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email
    }
  )
    .then(success => {
      res
        .status(201)
        .json({ status: success, message: "Usuario creado con éxito" });
    })
    .catch(error => errHandler("CREATE USER", res, error));
}

function updateUser(req, res) {
  db.any(
    `UPDATE _user SET name = $1, username = $2, role = $3 WHERE id = $4`,
    [
      req.body.name,
      req.body.username,
      req.body.role,
      req.body.id
    ]
  )
    .then(() => res.status(200).send(true))
    .catch(error => errHandler("UPDATE USER", res, error));
}

function deleteUser(req, res) {
  let id = req.params.id;
  db.none("SELECT delete_user($1)", id)
    .then(success => {
      res
        .status(200)
        .json({ status: success, message: "Usuario eliminado con éxito" });
    })
    .catch(error => errHandler("DELETE USER", res, error));
}

// related to password

function verifyPassword(req, res) {
  db.any("SELECT password = crypt($1, password) FROM _user", [
    req.params.password
  ])
    .then(state => res.status(200).send(state[0]))
    .catch(error => errHandler("VERIFY PASSWORD", res, error));
}

function recoveryPassword(req, res) {
  db.any("SELECT email FROM _user WHERE username = ${username};", {
    username: req.params.username
  })
    .then(email => {
      sendMail({ to: email, username: req.params.username });
      res.status(200).send(email);
    })
    .catch(error => errHandler("RECOVERY PASSWORD", res, error));
}

function updatePassword(req, res) {
  db.none(`UPDATE _user SET password = crypt($1, gen_salt('bf'))`, [
    req.body.password,
    req.params.username
  ])
    .then(success => res.status(200).send(true))
    .catch(error => errHandler("UPDATE PASSWORD", res, error));
}

function sendMail(body) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    process.env.SENDGRID_API_KEY ||
      "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"
  );
  const msg = {
    to: body.to,
    from: "admin@santuarionatura.com",
    templateId: "d-80b5d85f726f4ee39dd59e0e59d07cc8",
    dynamic_template_data: {
      username: body.username
    }
  };
  sgMail.send(msg);
}

function login(req, res) {
  let password = req.body.password;
  let username = req.body.username;
  db.any(
    "SELECT name from _user WHERE password = crypt(${password}, password);",
    {
      password: password,
      username: username
    }
  )
    .then(success => {
      res.status(200).json({ data: success, login: true });
    })
    .catch(error => errHandler("LOGIN", res, error));
}

function errHandler(method, res, error) {
  res.status(500).json({
    status: `Internal server error at ${method}`,
    message: `Error: ${error}`
  });
  console.log("ERROR:", error); // print the error;
}

module.exports = {
  getAllUsers: getAllUsers,
  login: login,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  recoveryPassword: recoveryPassword,
  updatePassword: updatePassword,
  verifyPassword: verifyPassword
};
