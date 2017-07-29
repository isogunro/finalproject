const express = require('express')
const passport = require('passport')

const Account = require('../models/account.js')

const Vendor = require('../models/vendor.js')

const vendorRouter = express.Router()

//define Routers
//url: Localhost:3000/vender/registration
console.log("Vendor Router")

vendorRouter.get('/', (req,res) =>{
  res.render('registration')
})
vendorRouter.post('/thanks', (req, res) => {
  console.log(req.body.description);
  const newVendor = new Vendor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    description: req.body.description,
    businessName: req.body.businessName
  })

	newVendor.save()
	res.redirect('vendorSignup')
})

vendorRouter.get('/vendorSignup', function( req, res ){
  res.render('vendorSignup')
}).post('/vendorSignup', function( req, res ){

    const newUser = new User({ username: req.body.username })
    User.register( newUser, req.body.password, function(err, user) {
      if ( err ) {
        return res.render('registration', {account: user})
    }
      passport.authenticate('local')(req, res, function(){
        res.redirect('/')
    })
  })

})

vendorRouter.get('/thanks', (req,res) =>{
  res.render('thanks')
})

vendorRouter.get('/forgotpassword', (req, res) => {
  res.render('forgotpassword')
})

module.exports = vendorRouter
