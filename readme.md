Your assignment for next class is to review your notes on deployment and to get started on your final project.
The deliverables for next class are:
- Create a new repository under your own GitHub account for your final project.
- Clone the repository locally (NOT in to an existing repository!) and add a `readme.md` or edit the one created by GitHub
- Add a short description of your project
- Add a short description of your UI and the views of your application
- Draft the technical requirements of your application, specifically the features you'll build out and how each filter will work. 3 features tends to be the sweet spot for final projects.
- Add a link to your final project repository to the file you created in the `final-projects/` folder of the class repository listing your project ideas. Add, Commit, Push, and make a Pull Request. In the comments of the pull request (where you answer the 3 questions) paste the link to your final project again.


Overview

The application I would like to build for my final project is a flea market vendor registration page with an admin dashboard that will be used to manage vendors.  The dashboard will give the admin the ability to do CRUD on the vendor database.  Non-admin personnel will also have access but will not have the ability to Create or delete from the database. Authentication will help determine who should have access to what.


UI Draft

My application will have the following views or pages:

A login page that will allow the admin and non-admin personnel login to the dashboard
A page listing all the vendors that is searchable through dataTables functionality
A drill down page of individual vendors
An edit page
A delete page
A form to add vendors for the admin
A registration form for the new vendor

My application will rely on the following packages:

express
mongo
mongoose
passport
passport-local
passport-local-mongoose
jQuery
dataTables
Handlebars

My application will have the following features:

Authorization

Users will be able to visit the registration page and provide information about themselves and what they sell.  They will add this information through a form that will be submitted to mongo database. Routers will be set up to redirect the users to the appropriate pages that they should have access to.  If the admin is unable to login, they can click on the 'forgot password' link to retrieve their password.

Vendor Search

When the vendor information is rendered from the database into the dataTable, there will be a functionality to search and sort any column.
