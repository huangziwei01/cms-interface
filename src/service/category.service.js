const Db = require("../utils/db");
class CategoryService extends Db {
  constructor(table) {
    super(table);
  }
}
module.exports = new CategoryService("category");
