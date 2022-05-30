/* ETAPE 1: On importe Sequelize*/
const { Sequelize, DataTypes } = require("sequelize"); //Sequélise est un ORM (Object Relationnal Mapping) pour se connnecté à la base de donnée. Il est la boîte noir qui prend en entré des requettes écrit en JS et les traduits en langage SQL. Il faudra aussi installer le driver Mariadb pour se connecter au serveur.
// DataTypes sont les types nécéssaire pour définir le model

const PokemonModel = require("../models/pokemon"); //Importation du model de pokemon
const UserModel = require("../models/user"); //Importation du model de user

const pokemons = require("./mock-pokemon"); //On importe la data de chaque pokemons

const bcrypt = require("bcrypt"); //On importe le module bcrypt qui est une fonction de hash

let sequelize;
//On test si l'api est en mode developpemtn ou production avant d'effectuer les tâches
if (process.env.NODE_ENV === "production") {
  /* ETAPE 2: On crée une instance de Sequelize pour se connecter a la base de donnée et avoir accès à ses méthodes***/
  sequelize = new Sequelize(
    "sw184btgd4mgr8q8", // <- Nom de la base de donnée
    "inic7xjhv4ngj4ep", // <- identifiant permetant d'accéder à la base de donnée : par défaut c'est root
    "j3iytc1ibezgl2bj", // <- mots de passe de la base de donnée : par défaut c'est une chaîne vide
    {
      host: "cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", // <- indique ou se trouve la base de donnée sur notre machine
      dialect: "mariadb", // <- nom du driver utiliser pour permetre a sequelize de se connecter à la base de       donnée.
      dialectOption: {
        timezone: "Etc/GMT-2", // <- Ces deux derniers sont optionnels et permettent d'éviter d'afficher des messages d'avertissements dans la console plus tard.
      },
      logging: true,
    }
  );
} else {
  /* ETAPE 2: On crée une instance de Sequelize pour se connecter a la base de donnée et avoir accès à ses méthodes***/
  sequelize = new Sequelize(
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
}

/* ETAPE 3: On teste si la connection à réussit ou non avec la méthode authenticate*/
sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de donnée à bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données : ${error}`)
  );

const Pokemon = PokemonModel(sequelize, DataTypes); //On instancie notre model Pokemon pour crée sa table associé.ceci dans le but de remplir cette table par des instances de pokemons grâce à la méthode Create()

const User = UserModel(sequelize, DataTypes); //On instancie notre model User pour crée sa table associé.ceci dans le but de remplir cette table par des instances de users grâce à la méthode Create()

let initDb;
if (process.env.NODE_ENV === "production") {
  //On initialise la base de donnée en mode production
  initDb = () => {
    return sequelize
      .sync() //{ force: true } Supprime la table existante pour en créer une nouvelle à chaque redémarage de l'API.
      .then(() => {
        console.log("INIT DB");
        //On crée un pokémon par boucle de mapping (12 au total)
        pokemons.map((pokemon) => {
          const { name, hp, cp, picture, types } = pokemon;
          Pokemon.create({
            name,
            hp,
            cp,
            picture,
            types,
          });
          // .then( ( pokemon ) => console.log( pokemon.toJSON() ) );
        });

        //On appel la méthode hash pour encrypté
        bcrypt.hash("armand", 10).then((hash) => {
          //<- 10 est le temps d'encryptage.plus il est long plus le MDP est crypté et prendra du temp pour être décrypté
          //On crée un user
          User.create({
            username: "armand",
            password: hash, //<- On pousse en BDD le hash du password
          });
          // .then( ( user ) => console.log( user.toJSON() ) );
        });
      });
  };
} else {
  //On initialise la base de donnée en mode dévéloppement
  initDb = () => {
    return sequelize
      .sync({ force: true }) //{ force: true } Supprime la table existante pour en créer une nouvelle à chaque redémarage de l'API.
      .then(() => {
        console.log("INIT DB");
        //On crée un pokémon par boucle de mapping (12 au total)
        pokemons.map((pokemon) => {
          const { name, hp, cp, picture, types } = pokemon;
          Pokemon.create({
            name,
            hp,
            cp,
            picture,
            types,
          });
          // .then( ( pokemon ) => console.log( pokemon.toJSON() ) );
        });

        //On appel la méthode hash pour encrypté
        bcrypt.hash("armand", 10).then((hash) => {
          //<- 10 est le temps d'encryptage.plus il est long plus le MDP est crypté et prendra du temp pour être décrypté
          //On crée un user
          User.create({
            username: "armand",
            password: hash, //<- On pousse en BDD le hash du password
          });
          // .then( ( user ) => console.log( user.toJSON() ) );
        });

        console.log("La base de donnée a bien été initialisée !");
      });
  };
}

module.exports = {
  initDb,
  Pokemon,
  User,
};
