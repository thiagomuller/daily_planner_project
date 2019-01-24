var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	passportLocalMongoose = require('passport-local-mongoose'),
	taskRoutes = require('./routes/tasks'),
	authenticationRoutes = require('./routes/authentication'),
	User = require('./models/user'),
	Task = require('./models/task'),
	Day = require('./models/day');


mongoose.connect('mongodb://localhost:/daily_planner_app', {useNewUrlParser : true});;

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//PASSPORT CONFIGURATION
app.use(session({
	secret : 'Jack is the cutest dog in the entire universe!',
	resave : false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req , res , next){
	res.locals.user = req.user,
	next();
});

app.use(taskRoutes);
app.use(authenticationRoutes);

app.listen(3000, function(req, res){
	console.log('Server is up!!!');
});