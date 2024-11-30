const express = require("express");
const router = express.Router();
const create = require('../Controllers/create');
const read = require('../Controllers/read');
const remove = require('../Controllers/delete');
const update = require('../Controllers/update');

router.post("/create", create);

router.get("/users", read.allUsers);

router.get("/user/:id",read.singleUser);

router.put("/update/:id", update);


router.delete("/delete/:id", remove);


module.exports = router;
