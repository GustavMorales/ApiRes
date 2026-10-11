/*const {router}= require ("express")
const router= router()

const {router}= require ("express")
const router =router();
router.get ("/", req, res) => {res.send("welcome to my API")}*/
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to my API");
});

module.exports = router;