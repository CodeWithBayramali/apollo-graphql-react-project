const User=require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}= require('../../config');

const {UserInputError} = require('apollo-server-express')
const {validateRegisterInput,validateLoginInput} = require('../../utils/validators')

module.exports={
    Mutation:{
        async register(_,{registerInput:{kullaniciAd,email,parola,parolaKontrol}}){

            //TODO: validation control 
            const {hatalar,valid} = validateRegisterInput(kullaniciAd,email,parola,parolaKontrol);

            if(!valid){
                throw new UserInputError('Errors',{hatalar})
            }

            //TODO: user control

            const user = await User.findOne({kullaniciAd})
            if (user) {
                throw new UserInputError('Kullanıcı zaten kayıtlı',{hatalar:{kullaniciAd:'Kullanıcı zaten kayıtlı'}})
            }

            //TODO: email control

            const mailCheck = await User.findOne({email})
            if (mailCheck) {
                throw new UserInputError('Kullanıcı zaten kayıtlı',{hatalar:{email:'Kullanıcı zaten kayıtlı'}})
            }


            //TODO: create new user
            parola=await bcrypt.hash(parola,12);
            const yeniKullanici = new User({
                email,
                kullaniciAd,
                parola,
                olusturulmaTarihi:new Date().toISOString()
            });
            const res = await yeniKullanici.save();
            const token = jwt.sign({
                id:res.id,
                email:res.email,
                kullaniciAd:res.kullaniciAd
            },SECRET_KEY,{expiresIn:'1h'})

            return {
                ...res._doc,
                id:res._id,
                token
            }
        },

        async login(_,{kullaniciAd,parola}){
            const {loginHatalar,valid} = validateLoginInput(kullaniciAd,parola);
            
            //TODO: validation control login
            if (!valid) {
                throw new UserInputError('Hatalı İşlem',{loginHatalar})
            }

            //TODO: user control
            const user = await User.findOne({kullaniciAd});
            if (!kullaniciAd){
                loginHatalar.genel='Kullanıcı bulunamadı !'
                throw new UserInputError('Hatalı İşlem',{loginHatalar})
            }

            //TODO: password check

            const parolaCheck = await bcrypt.compare(parola,user.parola);
            if (!parolaCheck) {
                loginHatalar.genel='Parola Eşleşmedi !'
                throw new UserInputError('Hatalı İşlem',{loginHatalar})
            }

            const token = jwt.sign({
                id:user.id,
                email:user.email,
                kullaniciAd:user.kullaniciAd
            },SECRET_KEY,{expiresIn:'1h'})
                
            return {
                ...user._doc,
                id:user._id,
                token
            }

        }
    }
}