var express = require('express'),
	mongoose = require('mongoose'),
	User = require('../models/user'),
	Day = require('../models/day'),
	Task = require('../models/task'),
	taskEntity = require('../entities/taskEntity'),
	dayEntity = require('../entities/dayEntity'),
	userEntity = require('../entities/userEntity');


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

			}
		)

	}
}