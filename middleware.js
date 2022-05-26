const express = require("express");
const app = express();

/*MIDDLEWARE D'APPLICATION : */
//On passe un middleware en paramètre de la méthode use() :
app.use((req, res, next) => {
  console.log(`Time : ${Date.now()}`);
  next();
});

/*MIDDLEWARE DU ROUTEUR : */
//On le branche au routeur d'express. Il n'est pas réliè à l'instance d'express comme le middleware use().
//Cependant on le branche plus tôt sur le routeur d'express express.Router()

/*MIDDLEWARE DE TRAITEMENT D'ERREURS : */
//Il prend 4 argument en compte obligatoirement. C'est cela qui le différencie du middleware d'application et nous informe que c'est un middleware de traitement d'erreur.
app.use((err, req, res, next) => {
  console.log(err);
  res.send("ERREUR !");
});

/*MIDDLEWARE INTEGRE : */
//Il se nomme express.static()
//Il à pour responsabilité de servir des documents static(img ou pdf). Il y'en d'autres toujours disponible mais à installer car c'est des dépendances extérieurs.

/*MIDDLEWARE TIERS : */
//Il s'agit de tous les dépendances extérieurs à installer.

/**********************DES MIDDLEWARE DEJA CREER ********************/
/*MORGAN*/
const morgan = require("morgan");
