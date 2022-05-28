//Tableau des types valides de notre model de pokémon
const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

/****CREATION DU MODEL : Pokemon******/
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // <- permet d'indiquer l'unicité de l'id dans la BDD
        autoIncrement: true, // <- permet d'indiqué que l'id doit s'incrémenté seul dans la BDD
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //Permet d'indiqué que les propriétiés ne sont pas facultuatives et pas de null
        //Contrainte d'unicité
        unique: {
          //<- Unicité du nom dess pokémons
          msg: "Le nom est déja pris.",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom est une propriété requise." },
          len: {
            args: [1, 25],
            msg: "Le nom doit comprendre entre 1 et 25 caractères.",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          //On crée un validateur pour vérifier la bonne conformité des données lors des requêtes create et update.Cela nous évite d'effectuer une requête inutile avant de décélé une erreur.
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0.",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieur ou égal à 999.",
          },
          notNull: { msg: "Les points de vie sont une propriété requise." },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les champ des dégâts.",
          },
          min: {
            args: [0],
            msg: "Les points de dégats doivent être supérieurs ou égales à 0.",
          },
          max: {
            args: [99],
            msg: "Les points de dégats doivent être inférieur ou égal à 99.",
          },
          notNull: { msg: "Les points de dégats sont une propriété requise." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilsez uniquement une URL valide pour l'image." },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        //On utilise un getter pour accédé à la data sous forme de tableau
        get() {
          return this.getDataValue("types").split(",");
        },
        //On utilise un setter pour stocker la data sous forme de chaîne de caractères.
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            //On teste si les types renvoyé en chaine de caractères n'est pas vide
            if (!value) {
              throw new Error("Un pokémon doit avoir au moins un type.");
            }

            //On teste si on a plus de trois types
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne peux avoir plus de trois types.");
            }

            //On teste la validité de chaque type
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste liste suivante : [${validTypes}]`
                );
              }
            });
          },
          //On teste la validité de l'unicité de chaque type d'un pokémon
          isUniqueType(value) {
            const types = value.split(",");
            let unique = false;
            let uniqueValue;
            for (let i = 0; i < types.length; i++) {
              uniqueValue = types[i];
              for (let j = i + 1; j < types.length; j++) {
                if (uniqueValue === types[j]) {
                  unique = true;
                }
              }
            }
            if (unique) {
              throw new Error(
                "Chaque type d'un pokémon ne peut être mentonner plus d'une fois"
              );
            }
          },
        },
      },
    },
    {
      timestamps: true, // Indique que l'on souhaite modifié le comportement par defaut de sequelize
      createdAt: "created", //Date de création de l'instance
      updatedAt: false, //Date de modification de l'instance
    }
  );
};
