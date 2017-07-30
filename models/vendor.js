const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    description: String,
    businessName: String
})

const Account = mongoose.model('Account', vendorSchema);

module.exports = Account;
