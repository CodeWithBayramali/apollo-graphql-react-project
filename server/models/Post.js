const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    body:String,
    kullaniciAd:String,
    olusturulmaTarihi:String,
    yorumlar:[
        {
            body:String,
            kullaniciAd:String,
            olusturulmaTarihi:String
        }
    ],
    begenenler:[
        {
            kullaniciAd:String,
            olusturulmaTarihi:String
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    }
})


const Post = mongoose.model('Post',postSchema);

module.exports = Post;