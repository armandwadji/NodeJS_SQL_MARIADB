const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.post("/api/pokemons/", auth, (req, res) => {
    Pokemon.create(req.body)
      .then((data) => {
        const message = `Le pokémon ${data.name} a bien été crée.`;
        res.json({ message, data });
      })
      .catch((error) => {
        //Erreurs de VALIDITES
        if (error instanceof ValidationError) {
          //Ceci nous permet d'écrire le méssage correspondant à celui du  validateur
          return res.status(400).json({ message: error.message, data: error });
        }
        //Erreurs de CONTRAINTES
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "La pokémon n'a pas pu être ajouter. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

//On utilise la méthode CREATE pour créer un nouveau pokemon
