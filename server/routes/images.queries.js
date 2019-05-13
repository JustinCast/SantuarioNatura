function getAllImages(req, res, next) {
  let db = require("../config/config");
  db.any("SELECT * FROM images WHERE id_activity = ${_id_activity}", {
    _id_activity: req.params.id
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => errHandler("GET ALL IMAGES", res, error));
}

function saveImage(req, res, next) {
  let db = require("../config/config");
  db.any(
    "SELECT save_image(${path}, ${filename}, ${id_activity}, ${destination}, ${mimetype}, ${encoding}, ${size})",
    {
      path: req.body.path,
      filename: req.body.filename,
      id_activity: req.body.id_activity,
      destination: req.body.destination,
      mimetype: req.body.mimetype,
      encoding: req.body.encoding,
      size: req.body.size
    }
  )
    .then(success => {
      res
        .status(201)
        .json({ status: success, message: "Imágenes guardadas con éxito" });
    })
    .catch(error => errHandler("SAVE IMAGE", res, error));
}

function deleteImage(req, res, next) {
  let db = require("../config/config");
  let image_id = req.params.image_id;
  console.log(image_id)
  db.any("SELECT delete_image(${image_id})", {
    image_id: image_id
  })
    .then(success => {
      res
        .status(200)
        .json({ status: success, message: "Imagen eliminada con éxito" });
    })
    .catch(error => errHandler("DELETE IMAGE", res, error));
}

function errHandler(method, res, error) {
  res.status(500).json({
    status: `Internal server error at ${method}`,
    message: `Error: ${error}`
  });
  console.log("ERROR:", error); // print the error;
}

module.exports = {
  getAllImages: getAllImages,
  saveImage: saveImage,
  deleteImage: deleteImage
};
