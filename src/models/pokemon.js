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
        allowNull: false, //Permet d'indiqué que les propriétiés ne sont pas facultuatives
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
    },
    {
      timestamps: true, // Indique que l'on souhaite modifié le comportement par defaut de sequelize
      createdAt: "created", //Date de création de l'instance
      updatedAt: false, //Date de modification de l'instance
    }
  );
};
