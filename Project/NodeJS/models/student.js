const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    firstName: {type: String},
    lastName: {type: String},
    uniqueNumber: {type: String},
    facNumber: {type: Number},
    birthDate: {type: Date}
});

module.exports = { Student };