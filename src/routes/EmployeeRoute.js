const express = require("express");

const router = express.Router();

const {
  createEmployee,
  getAllEmployee,
  getEmpByName,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/EmployeeController");

router.post("/create", createEmployee);
router.get("/all", getAllEmployee);
router.get("/:getEmployeeByName", getEmpByName);
router.put("/:empId", updateEmployee);
router.delete("/:empId", deleteEmployee);

module.exports = router;
