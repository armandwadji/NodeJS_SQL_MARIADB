const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id) //On cherhce le pokémon correspondant à l'id renseigner
      .then((data) => {
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data });
      });
  });
};

//La méthode findByPk (find by primary key) nous permet de cherche de la data selon son id
