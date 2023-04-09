const { Country, Activity } = require('../db');

const getCountries = (async () => {

    const BddCountry = await Country.findAll({
        attributes: ['id', 'name', 'imgflag', 'continent', 'capital', 'subregion', 'area', 'population'],
        /*'include' para obtener inf sobre las actividades turísticas disponibles en cada país, 'attributes' se desea obtener solo el nombre de la actividad. 'through' se trabaja en tablas de muchos a muchos para indicar no traer inf. adicional a la solicitada*/
        include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: { attributes: [] },
        }
    })
    //console.log("BddCountry", BddCountry[0])
    return BddCountry;
});


const getCountryByName = async (name) => {
    //charAt(0 obtiene el primer caracter)toUpperCase convierte en Mayuscula
    //.slice(1 obtiene el resto del nombre(excluyendo el primero)) toLowerCase convirte en minuscula
    //Where metodo de Sequelize,se usa para especificar condiciones y seleccionar en la BD 
    const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const countryName = await Country.findAll({
        where: { name: upperCaseName }, include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"],
            through: { attributes: [] },
        }
    });
    // console.log("Estas country by name ", countryName)
    return countryName;
}


/* findByPk busca el país correspondiente al ID recibido, toUpperCase lo convierte a mayúsculas */
const countryControllers = async (id) => {
    const idCountry = await Country.findByPk(id.toUpperCase(), {
        include: {
            model: Activity,
            attributes: ["name", "dificulty", "duration", "season"]
        }
    });
    return idCountry;
};


module.exports = {
    getCountries,
    getCountryByName,
    countryControllers
}

