const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://op1999namdeo:Omprakash@cluster0.qet9xzd.mongodb.net/paytm-test')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

const User = mongoose.model('User',userSchema);

module.exports = {
    User
};