const express = require("express");
const router = express.Router();


const { handleGetData, handlePostRequest } = require("../controller/Get")

router.get("/", handleGetData);
router.post("/", handlePostRequest);


module.exports = router