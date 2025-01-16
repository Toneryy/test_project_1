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

    const cards = await Card.findAll({
      attributes: ["number"],
      order: [["number", "ASC"]],
    });
    let newNumber = 1;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].number !== i + 1) {
        newNumber = i + 1;
        break;
      }
      newNumber = cards.length + 1;
    }

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
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
};

module.exports = { getAllCards, addCard, deleteCard };
