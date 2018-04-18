const mongoose=require('mongoose');
const Schema=mongoose.Schema;
mongoose.Promise=global.Promise;

const LocalSchema = new Schema({
	registration_number: Number,
	complaint:String,
	locality:String,
	registration_date:Date,
	serviced_date:Date
});

const Local=mongoose.model('Local',   LocalSchema);

module.exports=Local;


module.exports.createComplaint=(newComplaint, callback)=>{
	Local.create(newComplaint, callback);
}

module.exports.updateComplaint=(registration_number,serviced_date, callback)=>{
	Local.find({registration_number:registration_number},(err, complaint)=>{
		if(err){
			throw err;
		}
		else{
			id = complaint[0]._id
			Local.findByIdAndUpdate(id, {serviced_date: serviced_date}, callback);
		}
	})
}
