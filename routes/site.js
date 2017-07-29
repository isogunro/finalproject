/*
Set up the controller for just the site and not the 
sections that need a login
*/
const express = require('express');
const siteController = express.Router();

siteController.get('/', ( req, res )=>{
    res.render('home');
})

siteController.get('/about', ( req, res )=>{
    res.render('about');
})

siteController.get('/contact', ( req, res )=>{
    res.render('contact');
})

module.exports = siteController;