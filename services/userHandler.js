var mongoose = require('mongoose'),
	passport = require('passport'),
	User = require('../models/user'),
	dayEntity = require('../services/dayHandler');



module.exports = {

	registerUser : function(username , password, authenticateAfterRegister){
		User.register(new User({
			username : username
			}), password , function(err , user){
			if(err){
				console.log("Failed to register new user!");
			}
			else{
				console.log('Successfully registered the new user on db');
				authenticateAfterRegister();
			}
		});
	},


	findUser : function(data){
		var findUserPromise = new Promise(function(userFoundedSucessfully, reject){
			User.findById(data.userId , function(err , foundUser){
			if(err){
				console.log('Error finding the user!');
				console.log(err);
			}
			else{
				data.user = foundUser
				userFoundedSucessfully();
				
			}
			});
		});

		findUserPromise.then(
			function(){
				dayEntity.findDay(data);
			}
		);		

	},


}