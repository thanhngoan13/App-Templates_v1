const express = require('express');
const router = express.Router();

const  sideController = require('../controllers/SideController');

//tro den ham index controller

router.get("/getInfoOLT/:ip", sideController.getInfoOLT);
router.get("/getmacOLT/:slid_ip", sideController.getmacOLT);
router.get("/getInfoOnuOLT/:slid_ip", sideController.getInfoOnuOLT);
router.get("/getVlanNet/:slid_ip", sideController.getVlanNet);
router.get("/getmacOLT/:ip", sideController.getInfoOLT);
router.use("/search", sideController.search);
router.use("/", sideController.index);

module.exports =router;
