var express = require('express');
var router = express.Router();
const path = require('path');

/* GET un digimon / random */
router.get('/:name', async function(req, res) {
    try {
        const response = await fetch("https://digimon-api.vercel.app/api/digimon");

        if (!response.ok) {
            throw new Error("No se pudo obtener data");
        }

        const data = await response.json();
        // seleccionar un digimon al azar
        const randomDigimonName = data[Math.floor(Math.random() * data.length)].name;
        // obtener datos de un digimon especifico
        const digimon = data.find(({ name }) => name === req.params.name);
        // listado de digimons en el mismo nivel (extrayendo el digimon especificado)
        const otros = data.filter(({ name, level }) => level === digimon.level && name != digimon.name);
        // ordenar los resultados alfabeticamente
        otros.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        res.render('digimon', { title: 'Digimon wiki', digimon: digimon, otros: otros, randomDigimonName: randomDigimonName});
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
