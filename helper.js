//Méthode permet de renvoie un méssage lors de la requêtes du client.
exports.success = (message, data) => {
  return {
    message,
    data,
  };
};

//Méthode permettant de généré un id unique
exports.getUniqueId = (data) => {
  const pokemonsIds = data.map(({ id }) => id);
  const idMax = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = idMax + 1;
  return uniqueId;
};

/**************Les point de terminaises statiques *****/

/*************METHODE GET **************/
app.get("/", (req, res) => res.send("Hello again, Express !")); //méthode get pour affiché un méssage à l'utilisateur.

/* EXEMPLE : */
app.get("/api/pokemons/", (req, res) => {
  const message = "La liste des pokémon à bien été récupérée. 200";
  res.json(success(message, pokemons));
});

/*REQUETE SELON L'ID */
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id); //Permmet de récupérer les paramètres contenus dans l'url

  const pokemon = pokemons.find((pokemon) => pokemon.id === id); //On stoke les paramètres du pokemon correspondant à l'id passée en requete dans notre variable pokemon.

  const message = "un pokémon à bien été trouvé 200"; //on écrit le méssage de la requette.

  res.json(success(message, pokemon)); //cette méthode nous permet d'affiché la réponse à la requette sous forme d'un fichier JSON.
});

/***********METHODE POST *******************/
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = {
    ...req.body,
    ...{ id: id, created: new Date() },
  };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} à bien été crée.`;
  res.json(success(message, pokemonCreated));
});

/*********METHODE PUT **********************/
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokémon ${pokemonUpdated.name} à bien été modifié`;
  res.json(success(message, pokemonUpdated));
});

/************METHODE DELETE *******************/
app.delete("/api/pokemons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.map((pokemon) => {
    if (pokemon.id !== id) return pokemon;
  });
  const message = `Le pokemonde ${pokemonDeleted.name} à bien été supprimé`;
  res.json(success(message, pokemonDeleted));
});

/*app.get("/api/pokemons/:id/:name", (req, res) => {
    const id = req.params.id; //Permmet de récupérer les paramètre contenus dans l'url
    const name = req.params.name;
    res.send(`Vous avez demander le pokémon n° : ${id} qui est ${name}`);
  });*/

//PATCH : contrairement à PUT où on doit modifié toute une ressource, PATCH nous permet de modifié un élément particulier de cette ressource. Néanmoins, il n'est pas conseiller de l'utilisé pour les API Rest car si deux personnes essaient de modifié le même élément en même temps, il y'aura un gros risque de conflit ce qui fera cracher notre application.

//BACKEND : Serveur (Node JS) + API Rest(Express) + BDD(SQL)
