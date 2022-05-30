const express = require("express"); //on récupère le paquet express dans notre code.
const favicon = require("serve-favicon"); //sert à affiché l'icone sur le navigateur
const bodyParser = require("body-parser"); //transforme une chaîne de caractère en format JSON.
const sequelize = require("./src/db/sequelize"); //on importe sequelize pour lancer la méthode initDb()
const res = require("express/lib/response");

const app = express(); //On créer une instance d'une application express.
const port = process.env.PORT || 3000; //port prend la valeur 1 en production et 2 en dévéloppement

//Création d'un middleware permettant de logger l'url appelé par l'utilisateur, le favicon et la convertion des donées en JSON.
app
  .use(favicon(__dirname + "/favicon.ico")) //Pour insérer l'icone dans le navigateur
  .use(bodyParser.json()); //pour convertir les fichier en JSON

//On initialise le sequelize
sequelize.initDb();

//Point de terminaison pour accédé à HEROKU
app.get("/", (req, res) => {
  res.json("Hello, Heroku ! ");
});

/**ICI, NOUS PLACERONS NOS FUTURS POINT DE TERMINAISONS.*****/

/****Méthode GET****/
/* const findAllPokemons = require("./src/routes/findAllPokemons"); //On importe notre point de terminé qui est exporté sous forme d'une fonction
   findAllPokemons(app); //On appel notre point de terminaison en lui passant app comme variable*/
require("./src/routes/findAllPokemons")(app); //cela reviens à écrire comme ceci.

/****Méthode GET par ID****/
require("./src/routes/findPokemonByPk")(app);

/****Méthode POST ****/
require("./src/routes/createPokemon")(app);

/****Méthode PUT (Update) ****/
require("./src/routes/updatePokemon")(app);

/****Méthode DELETE (Update) ****/
require("./src/routes/deletePokemon")(app);

/****Méthode POST pour le Login: terminaison de connexion****/
require("./src/routes/login")(app);

/*********************************************************/

/***On ajoute la gestion des erreurs 404 avec la méthode use()***/
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

//Méthode pour affiché un méssage dans le terminal du dévéloppeur
app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
