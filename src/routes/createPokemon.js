const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons/", (req, res) => {
    Pokemon.create(req.body).then((data) => {
      const message = `Le pokémon ${data.name} a bien été crée.`;
      res.json({ message, data });
    });
  });
};

//On utilise la méthode CREATE pour créer un nouveau pokemon
