const Property = require("../models/Property");
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const property = new Property({ ...req.body, agentId: req.user.id });
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(400);
      throw new Error("Property not found");
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(400);
      throw new Error("Property not found");
    }

    if (property.agentId.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "User don't have permission to update other user's property"
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(400);
      throw new Error("Property not found");
    }

    if (property.agentId.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "User don't have permission to update other user's property"
      );
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleLike = async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(400);
    throw new Error("Property not found");
  }

  const userAlredayLiked = property.likes.some(
    (like) => like.userId.toString() === req.user.id
  );

  if (userAlredayLiked) {
    property.likes = property.likes.filter(
      (like) => like.userId.toString() !== req.user.id
    );
  } else {
    property.likes.push({ userId: req.user.id });
  }

  await property.save();
  res.status(200).json(property);
};

module.exports = {
  getProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  toggleLike,
};
