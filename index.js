//https://www.youtube.com/watch?v=iX8UhDOmkPE (Authentication Video)
//import the express module
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var User = require('./models/account')

mongoose.connect('mongodb://fleaVendors:rtmslib45#@ds163672.mlab.com:63672/projects')
const Vendor = require('./models/vendor.js')

//Set up Routers
const siteRouter = require('./routes/site.js')
const vendorRouter = require('./routes/vendor.js')
const adminRouter = require('./routes/adminDashboard.js')

//create an Express application.
//app will become an object that will contai all the scafolding for our server
let app = express();


app.use(express.static('./public'))

app.engine('handlebars', hbs({
		defaultLayout: 'main',
		helpers: {
			equal: function(lvalue, rvalue, options){
				if (arguments.length < 3)
					throw new Error("Handlebars Helper equal needs 2 parameters")
				if (lvalue!=rvalue){
					return options.inverse(this)
				} else {
					return options.fn(this)
				}
			}
		}}))

app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
//Persists data in memory inside of application
app.use(require('express-session')({
    secret: 'vendorSecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Allows you to use static files
app.use(express.static('public'))

app.use('/vendor', vendorRouter)
app.use('/admin', adminRouter)
app.use('/', siteRouter)


app.listen(3000, ()=>{
  console.log("Server Listening");
})
