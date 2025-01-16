const Card = require("../models/Card");
const { sequelize } = require("../database");

async function getAllCards(req, res) {
  try {
    const cards = await Card.findAll({ order: [["number", "ASC"]] });
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
}

async function addCard(req, res) {
  try {
    const { title, description } = req.body;

    const maxNumber = (await Card.max("number")) || 0;
    const newNumber = maxNumber + 1;

    const card = await Card.create({ title, description, number: newNumber });
    res.json(card);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ error: "Failed to add card" });
  }
}

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    await Card.destroy({ where: { id } });

    const cards = await Card.findAll({ order: [["number", "ASC"]] });
    for (let i = 0; i < cards.length; i++) {
      await cards[i].update({ number: i + 1 });
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
};

module.exports = { getAllCards, addCard, deleteCard };