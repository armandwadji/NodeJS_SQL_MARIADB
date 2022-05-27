const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll()
      .then((pokemons) => {
        const message = "La liste des pokémons a bien été récupérée.";
        res.json({ message, data: pokemons });
      })
      //On catch l'erreur de la requête pour donner des informations au client
      .catch((error) => {
        const message =
          "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};

//La méthode findAll() pour récupérer toute la data lors d'une requete get
