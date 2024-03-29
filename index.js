require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static('public'));


app.use('/api', require('./routes/area'));
app.use('/api', require('./routes/usuario'));
app.use('/api', require('./routes/proyecto'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/acta'));
app.use('/api', require('./routes/usuario-proyecto'));
app.use('/api', require('./routes/acuerdo'));
app.use('/api', require('./routes/mail'));

//Lo útlimo, en caso recargue una ruta que no corresponda, te manda al index
// app.use('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('Conectando al servidor ' + process.env.PORT);
	if (process.send) {
		process.send('ready');
	}
});




