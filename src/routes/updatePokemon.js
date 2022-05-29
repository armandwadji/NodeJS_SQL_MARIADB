const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize"); //Important de la méthode de validation sequelize
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, { where: { id: id } }) //Update est la méthode qui permet la modification de l'élément correspondant. Cependant elle ne retourne riens d'intéréssant.
      .then(() => {
        //Le return au findByPk nous permet de transmettre l'erreur éventuel au catch
        return Pokemon.findByPk(id) //On utilise cette méthode pour récupéré le pokémon modifié correpondant à notre id et on le retourne au client
          .then((pokemon) => {
            if (pokemon === null) {
              const message =
                "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
              return res.status(404).json({ message }); //Le return ici est fait pour arrété la fonction en cas de condition valide
            }
            const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
          });
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
          "La pokémon n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

//On utilise la méthode Update pour modifier un pokemon
