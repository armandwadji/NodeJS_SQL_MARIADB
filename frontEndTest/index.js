const heroku = document.querySelector(".heroku");
const userInfos = document.querySelector(".token");
const pokemons = document.querySelector(".pokemons");

// Step 1: "Hellp, Heroku 👋!"
fetch("https://blooming-castle-71869.herokuapp.com/")
  .then((res) => res.json())
  .then(
    (res) =>
      (heroku.innerHTML = `
                                <h3>Page d'acceuil</h3>
                                <p>${res} 👋</p>
                            `)
  );

// Step 2: "Get JWT token 🔒 !"
fetch("https://blooming-castle-71869.herokuapp.com/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "armand", password: "armand" }),
  headers: { "content-type": "application/json" }, //Entête http qui précise le format de nos données
})
  .then((res) => res.json())
  .then((res) => {
    const {
      data: { username, password, id },
      token,
    } = res;
    userInfos.innerHTML = ` 
                            <h3>JSON WEB TOKEN</h3>
                            <ul>
                                <li><b> id :</b> ${id}</li>
                                <li><b>UserName :</b> ${username}</li>
                                <li><b>password Hashed :</b> ${password}</li>
                                <li><b>TOKEN :</b> ${token} 🔒</li>
                            </ul>
                        `;
    return token;
  })
  .then((token) => fetchPokemonList(token));

// Step 3: "Get Pokémon list ! 📃"
const fetchPokemonList = (token) => {
  fetch("https://blooming-castle-71869.herokuapp.com/api/pokemons", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((res) => {
      const { data } = res;
      const pokemonsData = data
        .map(({ picture, name, hp, cp, types }) => {
          return `
        <li>
            <h4>Name : ${name}</h4>
            <img src=${picture} alt="photo de ${name}"/>
            <p>Point de vie : ${hp} </p>
            <p>Point de dégats : ${cp} </p>
            <p>type de pokémons : ${types
              .map((type) => {
                return `<span>${type}</span>`;
              })
              .join("/")}</p>
        </li>
            `;
        })
        .join();

      //   console.log(data);
      pokemons.innerHTML = `
        <h3>Liste des pokemons : 📃</h3>
      <ul>${pokemonsData}</ul>
      `;
    });
};
