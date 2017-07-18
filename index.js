//import the express module
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var User = require('./models/account')

mongoose.connect('mongodb:@cluster0-shard-00-00-yng8g.mongodb.net:27017,cluster0-shard-00-01-yng8g.mongodb.net:27017,cluster0-shard-00-02-yng8g.mongodb.net:27017/vendorCollection?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

const Vendor = require('./models/vendor.js')

const vendorRouter = require('./routes/vendor.js')
const adminRouter = require('./routes/adminDashboard.js')
//create an Express application.
//app will become an object that will contai all the scafolding for our server
let app = express();


//app.use(express.static('public'))



app.get('/', function( req, res ){
	res.render('registration')
})

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

passport.use( new LocalStrategy(User.authenticate() ))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.listen(3000, ()=>{
  console.log("Server Listening");
})
