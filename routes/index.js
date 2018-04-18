var express = require('express');
const rn=require("random-number");
var option={
	min:1000,
	max:9999,
	integer:true
	};
var router = express.Router();
var Local = require('../models/localhelpline');

/* GET home page. */
// router.get('/index', function(req, res, next) {
//   res.render('index');
// });

router.post('/add',(req,res,next)=>{
	
	console.log(req.body.complaint);
	newcomplaint= new Local({
	registration_number:rn(option),
	complaint:req.body.complaint,
	locality:req.body.locality,
	registration_date:new Date,
	serviced_date:null
  });
  Local.createComplaint(newcomplaint,(err,complaint)=>{
	if(err){
		throw err;
	}
	else{
		res.json({"registration_number":newcomplaint.registration_number});
	}
})
})

router.get('/index',(req,res,next)=>{
	Local.find({},(err,complaint)=>{
		if(err)
		{
			throw err;
		}
		else
		{
			res.render('index',{complaint:complaint});
		}
	})
})

router.get('/update/:registration_number',(req,res,next)=>{
	registration_number=req.params.registration_number
	serviced_date=new Date;
	Local.updateComplaint(registration_number,serviced_date,(err,upd)=>{
		if(err){
			throw err;
		}
		else{
			
			res.redirect('/index')
		}
	})
})
module.exports = router;
