const ExpressError = require("./expressError");
const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static allItems() {
    return items;
  }

  static findItem(name) {
    const item = items.find(function (searched) {
      return searched.name === name;
    });
    if (item === undefined) {
      throw new ExpressError("item not Found", 404);
    }
    return item;
  }

  static updateItem(name, item) {
    let found = this.findItem(name);
    found.name = item.name;
    found.price = item.price;

    return found;
  }

  static deleteItem(name) {
    const item = items.findIndex(function (searched) {
      return searched.name === name;
    });
    if (item === -1) {
      throw new ExpressError("item not Found", 404);
    }
    items.splice(item, 1);
  }
}

module.exports = Item;
