const Db = require("../utils/db");
class DepartmentService extends Db {
  constructor(table) {
    super(table);
  }
}
module.exports = new DepartmentService("department");
