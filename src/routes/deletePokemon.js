const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (pokemon === null) {
          const message =
            "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
          return res.status(404).json({ message });
        }

        const pokemonDeleted = pokemon; //On récupère le pokemon correspondant à la l'id dans le but de le retourné au client avant sa suppression définitive

        //Le return au destroy nous permet de transmettre l'erreur éventuel au catch
        return Pokemon.destroy({ where: { id: pokemon.id } }) //On utilise la méthode destroy() pour supprimer l'élément
          .then((_) => {
            const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
            res.json({ message, data: pokemonDeleted }); //on retourne l'élément à l'utilisateur
          });
      })
      .catch((error) => {
        const message =
          "La pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};

//ON utilise la méthode destroy() pour supprimer un pokemon
