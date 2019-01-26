var express = require('express'),
	mongoose = require('mongoose'),
	User = require('../models/user'),
	Day = require('../models/day'),
	Task = require('../models/task'),
	taskEntity = require('../services/taskHandler'),
	dayEntity = require('../services/dayHandler'),
	userEntity = require('../services/userHandler');


module.exports = {

	embedTaskIntoDay : function(taskType , taskName , taskDescription, user){
		var embedDataPromise = new Promise(function(finishedAllDataOperations , reject){
			var data = {
				userId : user._id,
				taskType : taskType,
				taskName : taskName,
				taskDescription : taskDescription,
				finishedAllDataOperations : finishedAllDataOperations
			}
			returnedData = userEntity.findUser(data);

		});

		embedDataPromise.then(
			function(data){

				data.day.task.push(data.createdTask);
				data.day.save();

				if(data.user.day.length === 0){
					data.user.day.push(data.day);
					data.user.save();
				}
				
			
				console.log(data.user.day);

			}
		)

	}
}