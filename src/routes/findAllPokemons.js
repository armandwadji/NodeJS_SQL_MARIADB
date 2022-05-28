const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize"); //<- On importe les opérateurs de séquilize

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    //On teste si on à le paramètre de recherche limit
    // let limit;
    // if (req.query.limit) {
    //   limit = parseInt(req.query.limit);
    // } else {
    //   limit = 5;
    // }

    //On teste si on à le paramètre de recherche name
    if (req.query.name) {
      const name = req.query.name; //<- extraction du paramètre de requête
      const limit = parseInt(req.query.limit) || 5; //<- On dynamise le nombre d'élément à retourné

      //On limite l'envoie de la requête à au moins 2 caractères
      if (name.length < 2) {
        const message =
          "Le terme de la recherche doit contenir au minimum 2 caractères.";
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: {
          //name est la propriété du modele pokémon
          name: {
            [Op.like]: `%${name}%`, // 'name' est le critère de la recherche
          },
        },
        order: [["name", "DESC"]], // <- Par dédaut c'est order : ["name"]
        limit: limit, // <- permet de mettre en place une limite de nombre d'éléments fournis dans la réponse
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: [["name", "DESC"]] })
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
    }
  });
};

//La méthode findAll() pour récupérer toute la data lors d'une requete get
