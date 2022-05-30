const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    //La méthode findOne permet d'aller cherché un élément grâce à un paramètre fournis dans la requête.
    User.findOne({ where: { username: req.body.username } }).then((user) => {
      //Condition pour vérifié si l'utilisateur existe dans la BDD
      if (!user) {
        const message = "L'utilisateur demandé n'existe pas.";
        return res.status(404).json({ message });
      }
      bcrypt
        //Compare renvoi true en cas d'égalité des deux paramètres fournis. le premier c'est le MDP saisis par le user et le second c'est le MDP stocké sous forme de hash dans la BDD.
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          //Condition pour vérifié si le mot de passe est correcte
          if (!isPasswordValid) {
            const message = "Le mot de passe est incorrecte.";
            return res.status(401).json({ message });
          }
          //On crée un JWT avec la méthode sign
          const token = jwt.sign(
            { userId: user.id }, //On va cherché l'id du client correspondant
            privateKey, //On lui affecte la clé
            { expiresIn: "24h" } //On définit le temps d'expiration du token
          );
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token: token });
        })
        .catch((error) => {
          const message =
            "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.";
          return res.json({ message, data: error });
        });
    });
  });
};
