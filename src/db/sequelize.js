const { Sequelize, DataTypes } = require("sequelize"); //Sequélise est une forme de router pour se connnecté à la base de donnée. DataTypes sont les types ncéssaire pour définir le model

const PokemonModel = require("../models/pokemon"); //Importation du model de pokemon

const pokemons = require("./mock-pokemon"); //On importe la data de chaque pokemons

/*****On crée une instance de Sequelize pour se connecter a la base de donnée***/
const sequelize = new Sequelize(
  "pokedex", //Nom de la base de donnée
  "root", //identifiant permetant d'accéder à la base de donnée : par défaut c'est root
  "", //mots de passe de la base de donnée : par défaut c'est une chaîne vide
  {
    host: "localhost",
    dialect: "mariadb",
    dialectOption: {
      timezone: "Etc/GMT-2",
    },
    logging: false,
  }
);

/*On teste si la connection à réussit ou non avec la méthode authenticate */
sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de donnée à bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

const Pokemon = PokemonModel(sequelize, DataTypes); //On instancie notre model pour crée la table

//On initialise la base de donnée
const initDb = () => {
  return sequelize
    .sync({ force: true }) //Supprime la table associé à chaque model pour toujours repartir à neuf
    .then(() => {
      pokemons.map((pokemon) => {
        const { name, hp, cp, picture, types } = pokemon;

        //On crée un pokémon par boucle de mapping
        Pokemon.create({
          name,
          hp,
          cp,
          picture,
          types,
        });
        // .then( ( pokemon ) => console.log( pokemon.toJSON() ) );
      });
      console.log("La base de donnée a bien été initialisée !");
    });
};

module.exports = {
  initDb,
  Pokemon,
};
