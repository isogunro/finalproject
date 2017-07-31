/*
Set up the controller for just the site and not the
sections that need a login
*/
const express = require('express');
const siteController = express.Router();

console.log("Site Router");
siteController.get('/', function( req, res ){
	res.render('Home')
})

siteController.get('/about', ( req, res )=>{
    res.render('about');
})

siteController.get('/registration', ( req, res )=>{
  res.render('registration')
})
siteController.get('/contact', ( req, res )=>{
    res.render('contact');
})

module.exports = siteController;
