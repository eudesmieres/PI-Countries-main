const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define("activity", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        dificulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            }
        },
        duration: {
            /* .TIME almacena una hora del día */
            type: DataTypes.TIME,
        },
        season: {
            /*ENUM, limita la entrada y se asegura que los valores
             almacenados en la BD sean uno de estos. */
            type: DataTypes.ENUM(
                "summer",
                "autumn",
                "winter",
                "spring"
            ),
        }

    },
        {
            timestamps: false, //para sacar createdAT/updatedAt de la tabla
            // paranoid: true
        }
    );
}