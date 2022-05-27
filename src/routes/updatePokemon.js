const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, { where: { id: id } }) //Update est la méthode qui permet la modification de l'élément correspondant. Cependant elle ne retourne riens d'intéréssant.
      .then(() => {
        Pokemon.findByPk(id) //On utilise cette méthode pour récupéré le pokémon modifié correpondant à notre id et on le retourne au client
          .then((pokemon) => {
            const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
          });
      });
  });
};

//On utilise la méthode Update pour modifier un pokemon
