const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://op1999namdeo:Omprakash@cluster0.qet9xzd.mongodb.net/paytm-test')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account', accountSchema);
module.exports = {
    User,
    Account,
};