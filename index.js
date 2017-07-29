//import the express module
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://fleaVendors:rtmslib45#@ds163672.mlab.com:63672/projects');

//Access to data models
const Vendor = require('./models/vendor.js');

//Give access to all my routes
const siteRouter = require('./routes/site.js');
const vendorRouter = require('./routes/vendor.js');
const adminRouter = require('./routes/adminDashboard.js');

//create an Express application.
//app will become an object that will contai all the scafolding for our server
const app = express();


//app.use(express.static('public'))



app.get('/', function( req, res ){
	res.render('registration');
});

app.engine('handlebars', hbs({
		defaultLayout: 'main',
		helpers: {
			equal: function(lvalue, rvalue, options){
				if (arguments.length < 3)
					throw new Error("Handlebars Helper equal needs 2 parameters");
				if (lvalue!=rvalue){
					return options.inverse(this);
				} else {
					return options.fn(this);
				}
			}
		}}))

app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Allows you to use static files
app.use(express.static('public'));

//All vendor routes will resemble http://...../vendor
app.use('/vendor', vendorRouter);
//All admin routes will resemble http://...../admin
app.use('/admin', adminRouter);
//All routes besides vendor and admin
app.use('/', siteRouter);


app.listen(8000, ()=>{
  console.log("Server Listening");
})
