const { getItemById } = require("./items-model");

const checkItemId = async (req, res, next) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) {
      res
        .status(404)
        .json({ message: `item with id ${req.params.id} not found` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkItemPayload = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.location ||
    !req.body.category ||
    !req.body.price
  ) {
    res.status(400).json({ message: "all fields required" });
  } else {
    next();
  }
};

module.exports = { checkItemId, checkItemPayload };
