const express = require("express");
const {
  getAllCards,
  addCard,
  deleteCard,
} = require("./controllers/cardController");

const router = express.Router();

router.get("/", getAllCards);
router.post("/", addCard);
router.delete("/:id", deleteCard);

module.exports = router;
