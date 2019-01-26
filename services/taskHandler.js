var express = require('express'),
	mongoose = require('mongoose'),
	Task = require('../models/task');



module.exports = {

	createTask : function(data){

		var taskCreatePromise = new Promise(function(returnDataToEmbedder , reject){
				Task.create({
				type : data.taskType,
				name : data.taskName,
				description : data.taskDescription
			}, function(err , createdTask){
				if(err){
					console.log('Error while creating the task on db!');
					console.log(err);
				}
				else{
					console.log('Sucessfully created the task on db!');
					data.createdTask = createdTask;
					returnDataToEmbedder(data);
				}
			});
		});

		taskCreatePromise.then(
			function(data){
				data.finishedAllDataOperations(data);
			}
		);
		
	}

}