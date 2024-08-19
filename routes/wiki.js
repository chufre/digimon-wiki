var express = require('express');
var router = express.Router();
const path = require('path');

/* GET todos los digimons */
router.get('/', async function(req, res) {
    try {
        const response = await fetch("https://digimon-api.vercel.app/api/digimon");

        if (!response.ok) {
            throw new Error("No se pudo obtener data");
        }

        const data = await response.json();
        // ordenar digimons alfabeticamente
        data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        // elegir un digimon al azar
        const randomDigimonName = data[Math.floor(Math.random() * data.length)].name;
        // obtener listado de todos los niveles
        const levels = data.map(digimon => digimon.level).filter((value, index, self) => self.indexOf(value) === index);
        res.render('wiki', { title: 'Digimon wiki', data: data, randomDigimonName: randomDigimonName, levels: levels});
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
