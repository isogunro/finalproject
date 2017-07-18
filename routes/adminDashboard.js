const express = require('express')
const passport = require('passport')

const Account = require('../models/account')

const Vendor = require('../models/vendor')

const adminRouter = express.Router()

//define Routers
//url: Localhost:3000/vender/registration
console.log("admin Router")

// "localhost:3000/admin/"
adminRouter.get('/', (req,res) =>{
  res.render('adminLogin')
})


// "localhost:3000/admin/vendors"
adminRouter.get('/vendors', (req, res) => {
  res.render('vendorListing')
})

adminRouter.get('/editVendor', (req, res) => {
  res.render('editVendor')
})

adminRouter.get('/addVendor', (req, res) => {
  res.render('addVendor')
})

adminRouter.post('/addVendor', (req, res) => {
  let newVendor = new Vendor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    description: req.body.description,
    businessName: req.body.businessName
  })

  newVendor.save()
	res.redirect('vendorListing')
})

adminRouter.get('/editVendor/:id', ( req, res ) => {
  Vendor.findOne({ '_id': req.params.id }, ( err, Vendor ) => {
    console.log( Vendor )
    res.render('editVendor', Vendor)
  })
})

/*adminRouter.get('/deleteVendor', (req, res) => {
  res.render('deleteVendor')
})*/
adminRouter.post('/editVendor', ( req, res ) => {
  Vendor.findOne({ '_id': req.body.id }, ( err, vendor ) => {
    vendor.firstName = req.body.firstName
    vendor.lastName = req.body.lastName
    vendor.phoneNumber = req.body.phoneNumber
    vendor.email = req.body.email
    vendor.businessName = req.body.businessName
    vendor.description = req.body.description

    vendor.save()

    res.redirect('/admin/vendorListing')
  })
})

adminRouter.get('/', function( req, res ){
  res.render('/')
}).post('/', function( req, res ){

    const newUser = new Account({ username: req.body.username })
    Account.register( newUser, req.body.password, function(err, user) {
      if ( err ) {
        console.log("----------ERROR----------"+user)
        return res.render('adminLogin', {account: user})
    }
      passport.authenticate('local')(req, res, function(){
        res.redirect('/vendorListing')
    })
  })

})

adminRouter.get('/login', function( req, res ){
  res.render('login', { user: req.user })
}).post('/login',
   passport.authenticate('local'),
   function( req, res ){
     res.redirect('/')
   }
 )

adminRouter.get('/logout', function( req, res ){
  req.logout()
  res.redirect('/')
})

adminRouter.get('/vendorListing', (req, res) => {

  Vendor.find({}, ( err, vendors ) => {
    res.render('vendorListing', {vendors: vendors})
  })
})

adminRouter.get('/vendorListing/:id', ( req, res ) => {
  Vendor.findOne({ '_id': req.params.id }, ( err, vendor ) => {
    vendor.remove()
    res.redirect('/admin/vendorListing')
  })
})

adminRouter.get('/forgotpassword', (req, res) => {
  res.render('forgotpassword')
})

module.exports = adminRouter
