//console.log(Math.round(Math.random()*6) + 1);
var sentences = require('./arrays.js');

//console.log(JSON.stringify(sentences, null, 4));

var getRnd = function(arr) {
    return arr[Math.round(Math.random()*(arr.length -1))];
}

var frazes = {};
var generateFrazes = function() {
    frazes = {
        politinis : getRnd(sentences.polIntro) +' '+ 
                    getRnd(sentences.veiksnys) +' '+ 
                    getRnd(sentences.tarinys) +'.'+ 
                    getRnd(sentences.polMid) +' '+ 
                    getRnd(sentences.veiksnys) +' #'+ 
                    getRnd(sentences.veiksnys),
        vesaite : getRnd(sentences.coolIntro) +', '+ 
                  getRnd(sentences.coolMid) +', '+
                  getRnd(sentences.coolOutro) +' '+
                  getRnd(sentences.zenklas) +' #'+
                  getRnd(sentences.hash),
        aparatas :  getRnd(sentences.engIntro) +' '+ 
                    getRnd(sentences.engSomething) +' '+ 
                    getRnd(sentences.engFatality) +' '+ 
                    getRnd(sentences.engOutro),
        sexy :  'Nuo šitos šventės man jau'+ 
                getRnd(sentences.tarinys) +' '+ 
                getRnd(sentences.sexyVeiksnys) +' '+ 
                getRnd(sentences.zenklas) +' #'+ 
                getRnd(sentences.sexyVeiksnys),
        zoidberg :  getRnd(sentences.zoidberg1) +', '+
                    getRnd(sentences.zoidberg2) +' #'+
                    getRnd(sentences.hash)
    }
}

var vesaite = {
    vardas: 'CrazyLikeAF00l',
    adresas: '@staycool',
    paternai: ['politinis', 'vesaite'],
    avataras: 'assets/avatars/bots/cool.png'
}

var aparatas = {
    vardas: 'AparatusInsanis',
    adresas: '@kolukiopraimas',
    paternai: ['politinis', 'aparatas', 'sexy'],
    avataras: 'assets/avatars/bots/aparatas2.png'

}

var zoidberg = {
    vardas: 'drZoidberg',
    adresas: '@realdoctor',
    paternai: ['zoidberg'], 
    avataras: 'assets/avatars/bots/doctor.png'

}

var personazai = [
    vesaite,
    aparatas,aparatas,aparatas,
    zoidberg
];

////////////////////////////////////////////////////

var interval = setInterval(function() {

    generateFrazes();

    var bot = getRnd(personazai);
    var rndPattern = getRnd(bot.paternai);
    bot.message = frazes[rndPattern];

    console.log(bot);
}, 1000)



