const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id) //On cherhce le pokémon correspondant à l'id renseigner
      .then((data) => {
        if (data === null) {
          const message =
            "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
          return res.status(404).json({ message }); //Le return ici est fait pour arrété la fonction en cas de condition valide
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message, data });
      })
      .catch((error) => {
        const message =
          "La pokémon n'a pas pu être récupéré. Réessayez dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};

//La méthode findByPk (find by primary key) nous permet de cherche de la data selon son id
