const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    kullaniciAd:String,
    parola:String,
    email:String,
    olusturulmaTarihi:String
})


const User = mongoose.model('User',userSchema);

module.exports = User;