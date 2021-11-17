const router = require("express").Router();
const Items = require("./items-model");
const { checkItemId, checkItemPayload } = require("./items-middleware");
const restricted = require("../restricted");

router.get("/", restricted, (req, res, next) => {
  Items.getItems()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.get("/:id", restricted, checkItemId, (req, res, next) => {
  Items.getItemById(req.params.id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(next);
});

router.post("/", restricted, checkItemPayload, (req, res, next) => {
  Items.createItem(req.body)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch(next);
});

router.put(
  "/:id",
  restricted,
  checkItemId,
  checkItemPayload,
  (req, res, next) => {
    Items.updateItem(req.params.id, req.body)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch(next);
  }
);

router.delete("/:id", restricted, checkItemId, (req, res, next) => {
  Items.deleteItem(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: `item with id of ${req.params.id} deleted` });
    })
    .catch(next);
});

router.use((err, req, res, next) /*eslint-disable-line*/ => {
  res.status(500).json({
    message: "Something went wrong in the router",
  });
});

module.exports = router;
