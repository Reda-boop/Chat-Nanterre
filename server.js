const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const webServer = express();

webServer.use(express.static('ressources'));

webServer.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

webServer.get('/index.html', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

webServer.get('/connect.html', (req, res) => {
	res.sendFile(__dirname + '/connect.html');
});

webServer.get('/newuser.html', (req, res) => {
	res.sendFile(__dirname + '/newuser.html');
});

console.log('Serveur lancé');

webServer.listen(8080);

const api = express();
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.post('/addUser', (req, res) => {
	let userName = req.body.pseudo.toLowerCase();
	fs.writeFileSync('./users/' + userName + '.json', JSON.stringify(req.body));
	res.redirect('back'); // 'http://localhost:8080/newuser.html'
});

console.log('API lancé');

api.listen(3000);