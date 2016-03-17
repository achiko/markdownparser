var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var markdownShema = new Schema({
    html: String
});

var markDownModel = mongoose.model('markDown', markdownShema);

module.exports = {
    markDownModel : markDownModel
}