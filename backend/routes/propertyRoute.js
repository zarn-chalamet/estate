const express = require("express");
const {
  getProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  toggleLike,
  addComment,
} = require("../controllers/propertyController");
const router = express.Router();
const validateToken = require("../middleware/validateToken");

//get properties (GET)
router.get("/", getProperties);

//create property (POST)
router.post("/", validateToken, createProperty);

//get property by id (GET)
router.get("/:id", getProperty);

//update property (PUT)
router.put("/:id", validateToken, updateProperty);

//delete property (DELETE)
router.delete("/:id", validateToken, deleteProperty);

//like property
router.post("/:id/like", validateToken, toggleLike);

//add comment to the property
router.post("/:id/comment", validateToken, addComment);

module.exports = router;
