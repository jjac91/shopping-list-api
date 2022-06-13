const Item = require("./item");
const express = require("express");
const router = new express.Router();

router.get("/", function (request, response, next) {
  try {
    response.json({ items });
  } catch (error) {
    return next(error);
  }
});

router.post("/", function (request, response, next) {
  try {
    let newItem = new Item(request.body.name, request.body.price);
    return response.json({ added: newItem });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

router.get("/:name", function (request, response, next) {
  try {
    let found = Item.findItem(request.params.name);
    return response.json({ items: found });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:name", function (request, response, next) {
  try {
    let updated = Item.updateItem(request.params.name, request.body);
    return response.json({ items: updated });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:name", function (request, response, next) {
  try {
    Item.deleteItem(request.params.name);
    return response.json({ message: "deleted" });
  } catch (error) {
    return next(error);
  }
});