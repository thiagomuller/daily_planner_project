var mongoose = require('mongoose');


var taskSchema = new mongoose.Schema({
	type : 'String',
	name : 'String',
	description : 'String',
});


module.exports = mongoose.model('Task', taskSchema);