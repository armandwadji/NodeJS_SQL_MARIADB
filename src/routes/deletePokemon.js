const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const pokemonDeleted = pokemon; //On récupère le pokemon correspondant à la l'id dans le but de le retourné au client avant sa suppression définitive
      Pokemon.destroy({ where: { id: pokemon.id } }) //On utilise la méthode destroy() pour supprimer l'élément
        .then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted }); //on retourne l'élément à l'utilisateur
        });
    });
  });
};

//ON utilise la méthode destroy() pour supprimer un pokemon
