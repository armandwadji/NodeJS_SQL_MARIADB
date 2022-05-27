/* ETAPE 1: On importe Sequelize*/
const { Sequelize, DataTypes } = require("sequelize"); //Sequélise est un ORM (Object Relationnal Mapping) pour se connnecté à la base de donnée. Il est la boîte noir qui prend en entré des requettes écrit en JS et les traduits en langage SQL. Il faudra aussi installer le driver Mariadb pour se connecter au serveur.
// DataTypes sont les types nécéssaire pour définir le model

const PokemonModel = require("../models/pokemon"); //Importation du model de pokemon

const pokemons = require("./mock-pokemon"); //On importe la data de chaque pokemons

/* ETAPE 2: On crée une instance de Sequelize pour se connecter a la base de donnée et avoir accès à ses méthodes***/
const sequelize = new Sequelize(
  "pokedex", // <- Nom de la base de donnée
  "root", // <- identifiant permetant d'accéder à la base de donnée : par défaut c'est root
  "", // <- mots de passe de la base de donnée : par défaut c'est une chaîne vide
  {
    host: "localhost", // <- indique ou se trouve la base de donnée sur notre machine
    dialect: "mariadb", // <- nom du driver utiliser pour permetre a sequelize de se connecter à la base de       donnée.
    dialectOption: {
      timezone: "Etc/GMT-2", // <- Ces deux derniers sont optionnels et permettent d'éviter d'afficher des messages d'avertissements dans la console plus tard.
    },
    logging: false,
  }
);

/* ETAPE 3: On teste si la connection à réussit ou non avec la méthode authenticate*/
sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de donnée à bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données : ${error}`)
  );

const Pokemon = PokemonModel(sequelize, DataTypes); //On instancie notre model pour crée sa table associé.ceci dans le but de remplir cette table par des instances de pokemons grâce à la méthode Create()

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
