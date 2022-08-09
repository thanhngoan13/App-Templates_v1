const express = require('express');
const router = express.Router();

const  trungtamController = require('../controllers/TrungtamController');

//tro den ham index controller

router.get("/edit/:id", trungtamController.edit);
router.get("/:id", trungtamController.delete);
router.get("/", trungtamController.index);


//router.delete("/:id", trungtamController.show);
//router.delete("/:id", trungtamController.delete);

module.exports =router;
