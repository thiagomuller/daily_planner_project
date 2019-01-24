var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new mongoose.Schema({
	username : 'String',
	password : 'String',
	day : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Day'
		}
	]
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
