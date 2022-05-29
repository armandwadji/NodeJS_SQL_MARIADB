const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization; //On récupère l'entête http nommé authorization

  //On vérifie que le token à bien été fournis.
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  //On récupère le jeton et on le stocke dans la constante token.
  //La syntaxe :
  //authorization : (Bearer jdE98zDdefze82XZDZZD).split(" ") == ["Bearer", "jdE98zDdefze82XZDZZD"]
  const token = authorizationHeader.split(" ")[1];

  //On vérifie que le jeton est valide grâce à verify
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    //On vérifie si le token est  valide
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
      return res.status(401).json({ message, data: error });
    }

    //On vérifie que le token correspond bien au bon utilisateur (même id)
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      res.status(401).json({ message });
    } else {
      next(); //Next permet de laissé l'accès a la suite de la requête
    }
  });
};
