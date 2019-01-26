var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	userEntity = require('../services/userHandler'),
	User = require('../models/user');


router.post('/register' , function(req , res, next){
	console.log('Just received a post request on register route!');


	var promise = new Promise(function(authenticateAfterRegister, reject){
		userEntity.registerUser(req.body.username , req.body.password , authenticateAfterRegister);
	});

	promise.then(
		function(){
			passport.authenticate('local', function(err, user, info) {
			if (err) {
				console.log('Error to call authenticate after registration');
			}
			req.logIn(user, function(err) {
			  if (err) {
			  	console.log('Error to log in the user after registration');
			  }
			  return res.redirect('/');
			});
			})(req, res, next);
		}
	)
});


router.post('/login' , passport.authenticate('local' , {
	failureRedirect  : '/'
}), function(req , res){
	console.log('Just received a post request on login route!');
	res.redirect('/');
});

router.get('/logout', function(req , res){
	console.log('Just received a get request on logout route!');
	req.logout();
	res.redirect('/');
});

module.exports = router;





