const { Router } = require("express");
const route = Router();
const allUsers = require("../controllers/admin");

route.get("/", allUsers);

module.exports = route;
