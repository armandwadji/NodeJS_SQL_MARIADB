const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/api/pokemons/", (req, res) => {
    Pokemon.create(req.body)
      .then((data) => {
        const message = `Le pokémon ${data.name} a bien été crée.`;
        res.json({ message, data });
      })
      .catch((error) => {
        const message =
          "La pokémon n'a pas pu être ajouter. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

//On utilise la méthode CREATE pour créer un nouveau pokemon
