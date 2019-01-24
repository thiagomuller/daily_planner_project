var mongoose = require('mongoose');


var daySchema = new mongoose.Schema({
	day : 'Number',
	month : 'Number',
	year : 'Number',
	task : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Activity'
		}
	]
});

module.exports = mongoose.model('Day', daySchema);