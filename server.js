const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/choice21-webapp'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/choice21-webapp/index.html');
})

app.listen(PORT, () => {
    console.log('servidor iniciado em '+ PORT)
})