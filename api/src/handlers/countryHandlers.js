const { getCountries, getCountryByName, countryControllers } = require('../controllers/countryControllers');


//Viene de Handlers y va a Controllers
const getCountryHandlers = async (req, res) => {
    //asi se busca la Query /countries?name=venezuela
    const { name } = req.query;
    if (!name) {
        try {
            const allCountries = await getCountries();
            res.status(200).json(allCountries);

        } catch (error) {
            res.status(400).json({ error: 'No search results were found for the specified country' });
        }
    } else {
        try {
            const oneCountry = await getCountryByName(name);
            res.status(200).json(oneCountry);

        } catch (error) {
            res.status(400).json({ error: 'Country not found' });
        }
    }
};


const getCountryIdHandlers = async (req, res) => {
    const { id } = req.params;
    try {
        const countId = await countryControllers(id);
        res.status(200).json(countId);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCountryHandlers, getCountryIdHandlers };