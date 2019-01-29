const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fablife',
    multipleStatements: true
})

mc.connect();

app.get('/menus', function(req, res) {
	mc.query('SELECT id, name, type FROM menus', function(error, results, fields) {
		res.status(200).send((results));
	}) 
});


app.get('/menu/:id', function(req, res) {
	var menuId = req.params.id;
	mc.query("SELECT id FROM menus WHERE id= '"+menuId+"'", function(error, results, fields) {
		var get_menu_id = results[0].id
		mc.query("SELECT * FROM menus WHERE id= '"+menuId+"'; SELECT id, menu_composition FROM composition WHERE menu_id = '"+get_menu_id+"' ORDER BY id ASC; SELECT id, menu_steps FROM steps WHERE menu_id = '"+get_menu_id+"' ORDER BY id ASC", function(error, results, fields) {
			results = [{
				name : results[0][0].name,
				type : results[0][0].type,
				pieces : results[0][0].pieces,
				steps: results[2],
				time: results[0][0].time,
				composition: results[1]
			}]
			res.status(200).send((results));
		})
	}) 
});

app.post('/menus', function(req, res) {
	var menuCheck = req.body.menu;

	if(menuCheck.type == '' || menuCheck.name == '' || menuCheck.pieces == '' || menuCheck.time =='' || req.body.steps.lenght == 0 || req.body.composition.lenght == 0) {
		console.log('Tous les champs ne sont pas remplis')
	} else if(isNaN(menuCheck.pieces) || isNaN(menuCheck.time)) {
		console.log('Les saisies nombre de portions ou temps de cuisson doivent être numériques')
	} else {
		mc.query("INSERT INTO menus set ?", req.body.menu, function (error, results, fields) {
			if(error) console.log(error);
			else {
		 		res.send(JSON.stringify(results));
		 	}

			for(var i=0; i< req.body.steps.length; i++) {
				mc.query("INSERT INTO steps set ?", {menu_id: results.insertId, menu_steps: req.body.steps[i]})
			}

			for(var i=0; i< req.body.composition.length; i++) {
				mc.query("INSERT INTO composition set ?", {menu_id: results.insertId, menu_composition: req.body.composition[i]})
			}
		});		
	}
})