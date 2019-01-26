var express = require('express'),
	mongoose = require('mongoose'),
	Day = require('../models/day'),
	Task = require('../models/task'),_
	taskEntity = require('../services/taskHandler');






function createDay(data){
	var createDayPromise = new Promise(function(createDayFinished , reject){
		var date = new Date(),
			day = {
				d : date.getDate(),
				m : date.getMonth() + 1,
				y : date.getFullYear()
			};
		Day.create({
			day : day.d,
			month : day.m,
			year : day.y
		}, function(err , day){
			if(err){
				console.log('Error while creating the day on db!');
				console.log(err);
			}
			else{
				console.log('Successfully created the day on db!');
				data.day = day;
				createDayFinished(data);
				
			}
		});
	});
	
	createDayPromise.then(
		function(data){
			taskEntity.createTask(data);
		}	
	)
}


function findDay(data){

	var findDayPromise = new Promise(function(dayFindFinished , reject){
		var date = new Date(),
			day = {
				d : date.getDate(),
				m : date.getMonth() + 1,
				y : date.getFullYear()
			};
		Day.findOne({
		day : day.d,
		month : day.m,
		year : day.y
		}, function(err , foundDay){
			data.today = day;
			if(err){
				console.log('Error when trying to search for day on db!');
				console.log(err);
			}

			if(!foundDay){
				data.callCreateDay = 1;
				dayFindFinished(data);
			}

			if(foundDay){
				data.day = foundDay;
				data.callCreateDay = 0;
				dayFindFinished(data);
			}
		});
	});
	
	findDayPromise.then(
		function(data){
			if(data.callCreateDay === 1){
				createDay(data);
			}
			else{
				taskEntity.createTask(data);
			}
		}
	)

}

module.exports = {
	findDay : findDay,
	createDay : createDay,
}