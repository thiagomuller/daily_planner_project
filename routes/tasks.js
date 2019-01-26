var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	passportLocalMongoose = require('passport-local-mongoose'),
	Task = require('../models/task'),
	User = require('../models/user'),
	Day = require('../models/day'),
	taskEntity = require('../services/taskHandler'),
	dayEntity = require('../services/dayHandler'),
	dataEmbedder = require('../services/dataEmbedder'),
	userData = [];




mongoose.connect('mongodb://localhost:27017/daily_planner_app' , {useNewUrlParser : true});

function isLoggedIn(req , res , next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}


router.get('/', function(req , res){
	res.redirect('/activities');
});


// INDEX ROUTE
router.get('/activities', function(req, res){
	console.log('Just received a get request on activities page!');
	res.render('index');
		
});


//CREATE ROUTE
//There's no new route because I'm doing it through a modal
router.post('/create', isLoggedIn , function(req , res){
	console.log('Just received a post request on create route!');
	//CREATE NEW Task
	dataEmbedder.embedTaskIntoDay(req.body.taskType , req.body.taskName , req.body.taskDescription , req.user);
	
});


//SHOW ROUTE
router.get('/show/:id', function(req , res){
	console.log('Just received a get request on show route!');
	Task.findById(req.params.id, function(err , foundedTask){
		if(err){
			console.log(err)
		}
		else{
			res.render('show' , {
				Task : foundedTask
			});
		}
	});
});

module.exports = router;