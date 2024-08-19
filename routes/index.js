var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const response = await fetch("https://digimon-api.vercel.app/api/digimon");

    if (!response.ok) {
        throw new Error("No se pudo obtener data");
    }

    const data = await response.json();
    // ordenar digimons alfabeticamente
    data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    // seleccionar un digimon al azar
    const randomDigimonName = data[Math.floor(Math.random() * data.length)].name;
    res.render('index', { title: 'Digimon wiki', data: data, randomDigimonName: randomDigimonName});
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
