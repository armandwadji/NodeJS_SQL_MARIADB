const express = require("express"); //on récupère le paquet express dans notre code.
const morgan = require("morgan"); //Sert à afficher les info de la requete
const favicon = require("serve-favicon"); //sert à affiché l'icone sur le navigateur
const bodyParser = require("body-parser"); //transforme une chaîne de caractère en format JSON.
const sequelize = require("./src/db/sequelize"); //on importe sequelize pour lancer la méthode initDb

const app = express(); //On créer une instance d'une application express.
const port = 3000;

//Création d'un middleware permettant de logger l'url appelé par l'utilisateur. et le favicon.
app
  .use(favicon(__dirname + "/favicon.ico")) //Pour insérer l'icone dans le navigateur
  .use(morgan("dev")) //Pour affiché le méssage dans le terminal lors de la requête
  .use(bodyParser.json()); //pour convertir les fichier en JSON

//On initialise le sequelize
sequelize.initDb();

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

//Méthode pour affiché un méssage dans le terminal du dévéloppeur
app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
