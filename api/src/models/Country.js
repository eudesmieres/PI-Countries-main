const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      /* (3) se limita a tres caracteres */
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,//no puede ser nulo
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgflag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    }
  },
    {
      timestamps: false //para sacar createdAT/updatedAt de la tabla
    }
  );
};
