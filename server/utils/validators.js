module.exports.validateRegisterInput=(
    kullaniciAd,
    email,
    parola,
    parolaKontrol
)=> {
    const hatalar = {};

    if(kullaniciAd.trim() === ''){
        hatalar.kullaniciAd='Kullanıcı adı boş geçilemez'
    }
    if(email.trim() === ''){
        hatalar.email='Email boş geçilemez'
    }
    if(parola.trim() === ''){
        hatalar.parola='Parola boş geçilemez'
    }else if(parola !== parolaKontrol){
        hatalar.parolaKontrol='Parola ile Parola Tekrarı aynı değil'
    }

    return {
        hatalar,
        valid:Object.keys(hatalar).length < 1
    }
}

module.exports.validateLoginInput = (kullaniciAd,parola)=> {
    const loginHatalar={};

    if(kullaniciAd.trim() === ''){
        loginHatalar.kullaniciAd='Kullanıcı adı boş geçilemez'
    }
    if(parola.trim() === ''){
        loginHatalar.parola='Email boş geçilemez'
    }

    return {
        loginHatalar,
        valid:Object.keys(loginHatalar).length < 1
    }
}